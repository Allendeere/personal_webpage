import { execFileSync, spawnSync } from 'node:child_process'

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', windowsHide: true }).trim()
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))
const repositoryUrl = git('remote', 'get-url', 'origin')
const match = repositoryUrl.match(/^(?:https:\/\/github\.com\/|git@github\.com:)([^/]+)\/([^/]+?)(?:\.git)?$/)
if (!match) throw new Error('origin must point to a GitHub repository.')
const repository = `${match[1]}/${match[2]}`
const branch = git('branch', '--show-current')
if (!['master', 'main'].includes(branch)) throw new Error('Switch to master or main before deploying.')
if (git('status', '--porcelain', '--untracked-files=normal')) {
  throw new Error('Commit your source changes before deploying. Run git status, git add <changed files>, and git commit, then npm run deploy again. The build output in dist is already ignored.')
}

// Use the same saved authentication as Git. Never print or persist credentials.
let credential
try {
  const response = execFileSync('git', ['credential', 'fill'], {
    input: `protocol=https\nhost=github.com\npath=${repository}.git\n\n`,
    encoding: 'utf8', windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'Never' },
  })
  credential = Object.fromEntries(response.trim().split(/\r?\n/).map(line => {
    const equals = line.indexOf('=')
    return [line.slice(0, equals), line.slice(equals + 1)]
  }))
} catch { throw new Error('No saved GitHub login found. Sign into GitHub through Git Credential Manager, or push your commit and monitor the Actions tab.') }
if (!credential.password) throw new Error('The saved GitHub login has no API credential. Push the commit and monitor the Actions tab.')

async function api(endpoint, method = 'GET', body) {
  const response = await fetch(`https://api.github.com/repos/${repository}${endpoint}`, {
    method,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${credential.password}`, 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`GitHub ${method} ${endpoint}: ${response.status} ${error.message || response.statusText}`)
  }
  return response.status === 204 ? null : response.json()
}

async function deploy() {
  const metadata = await api('')
  if (metadata.default_branch !== branch) {
    throw new Error(`The GitHub default branch is ${metadata.default_branch}. Set it to ${branch} in repository Settings → General before using workflow dispatch.`)
  }
  const sha = git('rev-parse', 'HEAD')
  console.log(`Pushing committed source to ${repository} (${branch})…`)
  const push = spawnSync('git', ['push', 'origin', branch], { stdio: 'inherit', windowsHide: true })
  if (push.status !== 0) throw new Error('Git push failed. Resolve the error above and run npm run deploy again.')

  // A push may already have started the same deployment. Resume it instead of
  // dispatching a competing run that the workflow concurrency rule would cancel.
  let run
  for (let attempt = 0; attempt < 4; attempt++) {
    const runs = await api(`/actions/workflows/deploy.yml/runs?branch=${encodeURIComponent(branch)}&per_page=10`)
    run = runs.workflow_runs.find(item => item.head_sha === sha && item.status !== 'completed')
    if (run) break
    if (attempt < 3) await sleep(1500)
  }
  if (!run) {
    const started = Date.now() - 5000
    await api('/actions/workflows/deploy.yml/dispatches', 'POST', { ref: branch })
    for (let attempt = 0; attempt < 20; attempt++) {
      await sleep(2000)
      const runs = await api(`/actions/workflows/deploy.yml/runs?branch=${encodeURIComponent(branch)}&event=workflow_dispatch&per_page=10`)
      run = runs.workflow_runs.find(item => item.head_sha === sha && Date.parse(item.created_at) >= started)
      if (run) break
    }
  }
  if (!run) throw new Error(`Workflow was requested but its run has not appeared. Check https://github.com/${repository}/actions`)
  console.log(`Deployment workflow: ${run.html_url}`)
  const deadline = Date.now() + 10 * 60 * 1000
  let lastStatus
  while (Date.now() < deadline) {
    const current = await api(`/actions/runs/${run.id}`)
    if (current.status !== lastStatus) { console.log(`GitHub Actions: ${current.status}`); lastStatus = current.status }
    if (current.status === 'completed') {
      if (current.conclusion !== 'success') throw new Error(`Deployment ${current.conclusion}. See ${current.html_url}`)
      const pages = await api('/pages')
      console.log(`Published successfully: ${pages.html_url}`)
      return
    }
    await sleep(15000)
  }
  throw new Error(`Deployment is still running. Continue monitoring ${run.html_url}; do not start another run.`)
}

deploy().catch(error => { console.error(error.message); process.exitCode = 1 })
