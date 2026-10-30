# Sarah — Portfolio Client

React + Vite 靜態作品集。完整啟動、GitHub Pages 部署、素材與內容維護說明，請閱讀[專案根目錄 README](../README.md)。

```powershell
npm.cmd install
npm.cmd run dev
```

建置：`npm.cmd run build`，輸出位於 `dist/`。

驗證：`npm.cmd run lint` 及 `npm.cmd run test:e2e`。

個人資料與作品文案位於 `src/data.js`。圖片及影片已匯入 `public/projects/`，執行網站不需要原始 Downloads 資料夾。

請從專案根目錄推送至 GitHub，以包含 `.github/workflows/deploy.yml`。Windows 以外的環境將 `npm.cmd` 改為 `npm` 即可。
