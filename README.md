# Sarah — Personal Portfolio

以 React、Vite 與 Motion 製作的靜態個人作品集，適合部署於 GitHub Pages。主題是 **Logic meets possibility.**，以真實作品畫面呈現遊戲、桌面軟體、網頁與系統整合專案。

## 本機預覽

需要 Node.js 22.12 以上版本。

```powershell
cd personal_webpage.client
npm.cmd install
npm.cmd run dev
```

開啟終端機顯示的網址，通常是 `http://localhost:5173/`。Windows 使用 `npm.cmd` 可避開 PowerShell 的腳本執行政策限制；其他系統使用 `npm` 即可。

## 發布到 GitHub Pages

1. 將**整個專案根目錄**的原始碼推送至 GitHub 儲存庫的 `master`（本專案使用）或 `main` 分支，包含 `.github`、`personal_webpage.client` 與作品素材。
2. 在 GitHub 儲存庫的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
3. `.github/workflows/deploy.yml` 會在推送 `master` 或 `main` 時自動建置及發布。也可以從 **Actions → Deploy portfolio to GitHub Pages → Run workflow** 手動執行。
4. 等待 Actions 完成；發布網址會顯示在部署工作與 Settings → Pages。

儲存庫的預設分支應設為包含網站與 workflow 的 `master` 或 `main`，手動執行 workflow 才能正常使用。這套流程依據 [GitHub Pages 官方自訂 workflow 文件](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 設定。

正式網站網址：<https://allendeere.github.io/personal_webpage/>。

### 使用 npm run deploy

先將要發布的原始碼變更 commit，再執行：

```powershell
cd personal_webpage.client
npm.cmd run deploy
```

指令會自動建置、推送目前分支的 commit、啟動或接續 GitHub Actions，並等待發布結果。它使用 Git 已儲存的 GitHub 登入，不會輸出或儲存 token，也不會自動 commit 尚未確認的修改。若工作目錄還有未提交的變更，會提示先 commit。

此專案使用 GitHub Actions 發布，不需要安裝 `gh-pages`、執行 `gh-pages -d dist`，或將 Pages 切換成 Deploy from a branch。已存在的 `gh-pages` 分支不影響此流程。

網站使用相對資源路徑與 hash 專案連結，可部署到 `username.github.io/repository/` 或自訂網域，重新整理專案詳情不需要伺服器路由設定。不需要執行 ASP.NET Server 專案。

## 建置與驗證

```powershell
cd personal_webpage.client
npm.cmd run build
npm.cmd run lint
npm.cmd run test:e2e
```

建置結果在 `personal_webpage.client/dist/`。Playwright 測試在 Windows 使用已安裝的 Microsoft Edge；Linux/macOS 首次執行前請先執行 `npx playwright install chromium`。測試使用真實靜態伺服器的 `/Personal_webpage/` 子路徑，涵蓋：

- 真實圖片、字體與八件作品的載入。
- 分類篩選、首頁焦點作品切換。
- 專案詳情、相簿方向鍵、下一個專案、Esc 與返回導覽。
- 深淺色模式記憶、Email 複製。
- 320、390、768、1024、1440px 版面及減少動態效果設定。

## 修改內容

| 內容 | 檔案 |
| --- | --- |
| 姓名、Email、手機、作品說明與分類 | `personal_webpage.client/src/data.js` |
| 版面與互動 | `personal_webpage.client/src/App.jsx` |
| 顏色、字體與全域設定 | `personal_webpage.client/src/index.css` |
| 元件與響應式樣式 | `personal_webpage.client/src/App.css` |
| 圖片來源對照 | `personal_webpage.client/src/asset-manifest.json` |
| 作品圖片及影片 | `personal_webpage.client/public/projects/` |
| 網站 S 標誌與生成提示詞 | `personal_webpage.client/public/brand/` |
| GitHub Pages 自動發布 | `.github/workflows/deploy.yml` |

作品資料保留在本機原始碼，沒有後台或資料庫。已填入 Sarah、`c27158495@gmail.com` 與 `0966-377-190`。未提供的履歷、職稱、GitHub 個人連結及量化成效均未虛構。

## 素材

已匯入八個專案共 48 張 WebP 圖片及一支實機影片。企業形象網站的八張截圖已依要求移除頁首兩個品牌的標誌與名稱，其他區域以無損格式完整保留；重新匯入素材也會套用相同處理。磁鐵棋依原始備註使用新版截圖，排除過時的整合海報；語言治療重複圖片也已排除。

若需由原始資料夾重新準備素材：

```powershell
cd personal_webpage.client
node scripts/prepare-assets.mjs 'C:\Users\User\Downloads\作品集'
```

此步驟只在更換素材時需要，GitHub Actions 直接使用已匯入的檔案，不依賴本機 Downloads 路徑。素材來源記錄在 `public/projects/PROVENANCE.md`；字體為自託管 Geist，圖示來自 Phosphor。

設計依據與持續維護規範記錄於 `PRODUCT.md`、`DESIGN.md` 及 `.impeccable/`。
