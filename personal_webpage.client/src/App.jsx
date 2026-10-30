import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Check, Copy, IconContext, List, Moon, Play, Sun, X } from '@phosphor-icons/react'
import { asset, categories, profile, projects } from './data'
import './App.css'

const ease = [0.22, 1, 0.36, 1]
const featured = [projects[0], projects[1], projects[3]]
const year = new Date().getFullYear()

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('sarah-theme-v2') || 'light' } catch { return 'light' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('sarah-theme-v2', theme) } catch { /* Theme remains usable without storage. */ }
  }, [theme])
  return [theme, () => setTheme(value => value === 'dark' ? 'light' : 'dark')]
}

function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return
    const close = event => { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuOpen])
  return <header className="header shell">
    <a className="wordmark" href="#home" aria-label="Sarah，回到首頁"><img className="brand-mark" src={asset('brand/sarah-mark.png')} width="42" height="42" alt="" /><span>Sarah</span></a>
    <nav className={`navigation ${menuOpen ? 'is-open' : ''}`} id="main-navigation" aria-label="主要導覽">
      <a href="#work" onClick={() => setMenuOpen(false)}>精選作品</a>
      <a href="#about" onClick={() => setMenuOpen(false)}>關於我</a>
      <a href="#contact" onClick={() => setMenuOpen(false)}>聯絡我</a>
    </nav>
    <div className="header-actions">
      <button className="icon-button theme-button" onClick={toggleTheme} aria-label={theme === 'dark' ? '切換為淺色模式' : '切換為深色模式'}>{theme === 'dark' ? <Sun /> : <Moon />}</button>
      <a className="header-contact" href={`mailto:${profile.email}`}>Let's talk <ArrowUpRight /></a>
      <button className="icon-button menu-button" aria-label={menuOpen ? '關閉導覽' : '開啟導覽'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X /> : <List />}</button>
    </div>
  </header>
}

function ProjectStage() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const x = useMotionValue(0), y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), { stiffness: 160, damping: 28 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), { stiffness: 160, damping: 28 })
  const current = featured[active]
  function move(event) {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }
  return <div className="project-stage" onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }}>
    <motion.div className="stage-composition" style={reduce ? {} : { rotateX, rotateY }}>
      <AnimatePresence initial={false} mode="wait"><motion.a className={`stage-main stage-${current.id}`} href={`#project/${current.id}`} key={current.id}
        initial={reduce ? false : { opacity: 0, y: 16, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.24, ease }} aria-label={`探索 ${current.title} 專案`}>
        <img className="stage-image" src={asset(current.cover.file)} width={current.cover.width} height={current.cover.height} alt={`${current.title} 專案介面預覽`} fetchPriority="high" />
        <div className="stage-caption"><span>{current.type}</span><span>查看專案 <ArrowUpRight /></span></div>
      </motion.a></AnimatePresence>
    </motion.div>
    <div className="stage-switcher" role="group" aria-label="切換首頁焦點作品">{featured.map((project, index) => <button key={project.id} className={active === index ? 'active' : ''} aria-pressed={active === index} onClick={() => setActive(index)}>{project.title}</button>)}</div>
  </div>
}

function Hero() {
  const reduce = useReducedMotion()
  return <section className="hero shell" id="home" aria-labelledby="hero-title">
    <div className="hero-main">
      <motion.div className="hero-copy" initial={reduce ? false : { y: 18, opacity: 0.6 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75, ease }}>
        <h1 id="hero-title">Logic meets<br /><span>possibility.</span></h1>
        <p className="hero-intro">嗨，我是 Sarah<span className="intro-line" />把想法寫成程式，<br />把細節做成值得體驗的作品。</p>
        <div className="hero-actions"><a className="button primary-button" href="#work">探索我的作品 <ArrowDown /></a><a className="text-link" href="#about">認識 Sarah <ArrowUpRight /></a></div>
        <p className="hero-discipline">Code with purpose. Create with curiosity.</p>
      </motion.div>
      <motion.div className="hero-visual" initial={reduce ? false : { opacity: 0.6, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12, ease }}><ProjectStage /></motion.div>
    </div>
    <div className="hero-bottom"><p>遊戲的趣味。工具的效率。網站的細節。</p><div><span>Game</span><span>Desktop</span><span>Web</span></div><a href="#work" aria-label="往下瀏覽作品"><span>往下探索</span><ArrowDown /></a></div>
  </section>
}

function ProjectCard({ project, index }) {
  const reduce = useReducedMotion()
  return <motion.article className={`project-card ${index % 4 === 0 || index % 4 === 3 ? 'project-wide' : 'project-narrow'}`} layout="position"
    initial={reduce ? false : { opacity: 0.65, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.38, ease }}>
    <a href={`#project/${project.id}`} className="project-link" aria-label={`查看 ${project.title}：${project.subtitle}`}>
      <div className={`project-artwork tone-${project.tone} artwork-${project.id}`}><span className="project-type">{project.type}</span>
        <div className="project-screen"><img src={asset(project.cover.file)} width={project.cover.width} height={project.cover.height} loading="lazy" decoding="async" alt={`${project.title}：${project.subtitle}`} /></div>
        <span className="project-open" aria-hidden="true"><ArrowUpRight /></span>{project.video && <span className="video-indicator"><Play weight="fill" /> 實機影片</span>}
      </div>
      <div className="project-info"><div><h3>{project.title}</h3><p>{project.subtitle}</p></div><span className="project-category">{project.categoryLabel}<ArrowUpRight /></span></div>
      <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </a>
  </motion.article>
}

function Work() {
  const [filter, setFilter] = useState('all')
  const shown = projects.filter(project => filter === 'all' || project.category === filter)
  return <section className="work-section shell" id="work" aria-labelledby="work-title">
    <div className="section-heading"><h2 id="work-title">Selected work<span className="count">(08)</span></h2><p>不同形式，同一份對細節的在意。<br /><span>A collection of things I've built.</span></p></div>
    <div className="work-toolbar"><div className="filters" role="group" aria-label="作品分類篩選">{categories.map(category => <button key={category.id} aria-pressed={filter === category.id} className={filter === category.id ? 'selected' : ''} onClick={() => setFilter(category.id)}>{filter === category.id && <motion.span className="filter-background" layoutId="active-filter" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}<span>{category.label}</span><small>{category.id === 'all' ? projects.length : projects.filter(project => project.category === category.id).length}</small></button>)}</div><span className="work-total" role="status" aria-live="polite">{String(shown.length).padStart(2, '0')} projects</span></div>
    <motion.div className="project-grid" layout><AnimatePresence mode="popLayout" initial={false}>{shown.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</AnimatePresence></motion.div>
  </section>
}

const capabilities = [
  { name: 'Playful by design.', chinese: '遊戲與互動', description: '從節奏戰鬥到策略對戰，把機制、同步與玩家體驗串在一起。', tags: ['多人遊戲', '互動系統', '遊戲化體驗'] },
  { name: 'Useful by nature.', chinese: '軟體與工具', description: '從真實的工作流程出發，讓分散的功能變成順手的日常。', tags: ['桌面應用', '工作流整合', '系統串接'] },
  { name: 'Details in every pixel.', chinese: '網站與系統', description: '在看得見的介面與背後的資料之間，建立清晰、穩定的連結。', tags: ['響應式網頁', '資料流程', '前後端整合'] },
]
function About() {
  const reduce = useReducedMotion()
  return <section className="about-section" id="about" aria-labelledby="about-title"><div className="shell about-layout">
    <div className="about-introduction"><h2 id="about-title">A curious mind.<br />A builder at heart<span>.</span></h2><img className="about-monogram brand-mark" src={asset('brand/sarah-mark.png')} width="160" height="160" alt="" /><p className="about-signature">Sarah<span>Behind the work</span></p></div>
    <div className="about-content"><p className="about-lead">喜歡拆解問題，<br />也喜歡讓解法有一點驚喜。</p><p className="about-description">我在遊戲、桌面軟體與網站之間探索，把邏輯落實成能操作的體驗。比起停留在想法，更享受把一個個細節接起來，讓作品真正運作的過程。</p>
      <div className="capabilities">{capabilities.map(({ name, chinese, description, tags }, index) => <motion.div className="capability" key={name} initial={reduce ? false : { x: 16, opacity: 0.6 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07, ease }}><div className="capability-heading"><h3>{chinese}<span>{name}</span></h3></div><p>{description}</p><div>{tags.map(tag => <span className="capability-tag" key={tag}>{tag}</span>)}</div></motion.div>)}</div>
    </div>
  </div></section>
}

function Contact() {
  const [copyState, setCopyState] = useState('idle')
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyState('copied') } catch { setCopyState('error') }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('idle'), 2600)
  }
  return <section className="contact-section shell" id="contact" aria-labelledby="contact-title">
    <a className="contact-headline" href={`mailto:${profile.email}`}><h2 id="contact-title">Let's make<br />something <span>good.</span></h2><span className="contact-arrow"><ArrowUpRight /></span></a>
    <div className="contact-top"><p>有個想法，或剛好想打聲招呼？<br /><span>Good things start with a conversation.</span></p></div>
    <div className="contact-details"><div className="email-contact"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="icon-button copy-button" onClick={copyEmail} aria-label={copyState === 'copied' ? 'Email 已複製' : '複製 Email'}>{copyState === 'copied' ? <Check /> : <Copy />}</button><span className="copy-feedback" role="status">{copyState === 'copied' ? '已複製 Email' : copyState === 'error' ? '請直接選取 Email 複製' : ''}</span></div><a className="phone-link" href={profile.phoneHref}>{profile.phone}<ArrowUpRight /></a></div>
    <footer><a className="footer-name" href="#home"><img className="brand-mark" src={asset('brand/sarah-mark.png')} width="30" height="30" alt="" />Sarah</a><p>Made with logic & a little play.<span>© {year} Sarah</span></p><a className="back-top" href="#home">回到頂端 <ArrowUp /></a></footer>
  </section>
}

function ProjectDetail({ project, close }) {
  const dialog = useRef(null)
  useEffect(() => {
    const element = dialog.current
    if (!project) { element.close(); return }
    if (!element.open) element.showModal()
    element.scrollTop = 0
    element.querySelector('.close-detail')?.focus({ preventScroll: true })
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [project])
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="detail-title" onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }}>
    {project && <ProjectContents key={project.id} project={project} close={close} />}
  </dialog>
}

function ProjectContents({ project, close }) {
  const [activeImage, setActiveImage] = useState(0)
  const [failedImage, setFailedImage] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const reduce = useReducedMotion()
  const currentImage = project.images[activeImage]
  function changeImage(index) { setFailedImage(false); setActiveImage((index + project.images.length) % project.images.length) }
  return <motion.div className="detail-panel" initial={reduce ? false : { opacity: 0.65, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease }}>
      <div className="detail-topbar"><span><span>{project.categoryLabel}</span><span className="detail-top-separator" aria-hidden="true" /><span>{project.type}</span></span><button className="icon-button close-detail" onClick={close} aria-label="關閉專案詳情"><X /></button></div>
      <div className="detail-heading"><h2 id="detail-title">{project.title}<span>.</span></h2><p>{project.intro}</p><div className="detail-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      <section className="detail-gallery" aria-label={`${project.title} 作品圖片`}>
        <div className={`gallery-image tone-${project.tone}`} tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); changeImage(activeImage + 1) } if (event.key === 'ArrowLeft') { event.preventDefault(); changeImage(activeImage - 1) } }} aria-label="作品圖片，使用左右方向鍵切換">
          {failedImage ? <div className="image-error"><p>圖片暫時無法載入。</p><button onClick={() => setFailedImage(false)}>重新載入</button></div> : <img key={`${project.id}-${activeImage}`} src={asset(currentImage.file)} width={currentImage.width} height={currentImage.height} alt={`${project.title}，第 ${activeImage + 1} 張作品畫面`} onError={() => setFailedImage(true)} />}
        </div>
        <div className="gallery-controls"><span aria-live="polite">{String(activeImage + 1).padStart(2, '0')} <span>/ {String(project.images.length).padStart(2, '0')}</span></span><a href={asset(currentImage.file)} target="_blank" rel="noreferrer" aria-label="在新分頁開啟完整圖片">開啟完整圖片 <ArrowUpRight /></a><div><button className="icon-button" onClick={() => changeImage(activeImage - 1)} aria-label="上一張圖片"><ArrowLeft /></button><button className="icon-button" onClick={() => changeImage(activeImage + 1)} aria-label="下一張圖片"><ArrowRight /></button></div></div>
        <div className="gallery-thumbnails" aria-label="選擇作品圖片">{project.images.map((img, index) => <button key={img.file} className={index === activeImage ? 'is-active' : ''} onClick={() => changeImage(index)} aria-label={`查看第 ${index + 1} 張圖片`} aria-pressed={index === activeImage}><img src={asset(img.file)} width="100" height="66" loading="lazy" alt="" /></button>)}</div>
      </section>
      <div className="detail-story"><section><h3>專案出發點<span>The context</span></h3><p>{project.context}</p></section><section><h3>實作與內容<span>The approach</span></h3><p>{project.contribution}</p><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul></section></div>
      {project.video && <section className="detail-video"><h3>看看實際遊玩<span>In motion</span></h3><video key={project.id} controls playsInline preload="none" poster={asset(project.images[1].file)} onError={() => setVideoError(true)}><source src={asset(project.video)} type="video/mp4" /><a href={asset(project.video)}>下載實機影片</a></video>{videoError && <p role="status">瀏覽器無法播放此影片。<a href={asset(project.video)} download>下載原始影片</a></p>}</section>}
      <div className="detail-bottom"><button className="text-link" onClick={close}><ArrowLeft /> 回到全部作品</button><a href={`#project/${projects[(projects.indexOf(project) + 1) % projects.length].id}`}>下一個專案 <ArrowRight /></a></div>
  </motion.div>
}

function App() {
  const [theme, toggleTheme] = useTheme()
  const [selected, setSelected] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 })
  useEffect(() => {
    function syncHash() {
      const match = location.hash.match(/^#project\/([a-z-]+)$/)
      const project = match ? projects.find(item => item.id === match[1]) : null
      setSelected(project || null)
      document.title = project ? `${project.title} — Sarah` : 'Sarah — Code, design & a little play.'
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])
  function closeProject() {
    history.replaceState(null, '', `${location.pathname}${location.search}#work`)
    setSelected(null)
    document.title = 'Sarah — Code, design & a little play.'
  }
  return <IconContext.Provider value={{ weight: 'regular' }}><MotionConfig reducedMotion="user" transition={{ ease }}>
    <a className="skip-link" href="#work">跳至作品集</a><motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />
    <Header theme={theme} toggleTheme={toggleTheme} /><main><Hero /><Work /><About /><Contact /></main><ProjectDetail project={selected} close={closeProject} />
  </MotionConfig></IconContext.Provider>
}
export default App
