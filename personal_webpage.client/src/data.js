import manifest from './asset-manifest.json'

export const asset = (file) => `${import.meta.env.BASE_URL}${file}`
export const profile = { name: 'Sarah', email: 'c27158495@gmail.com', phone: '0966-377-190', phoneHref: 'tel:+886966377190' }
const image = (project, index) => manifest[project][index]
const gallery = (project, cover) => [image(project, cover), ...manifest[project].filter((_, i) => i !== cover)]

export const projects = [
  {
    id: 'nspy', title: 'NSPY', subtitle: '讓工作，回到同一個地方。',
    category: 'desktop', categoryLabel: '桌面軟體', type: 'Productivity application',
    tags: ['工作流整合', 'AI 語音轉錄', '桌面工具'], cover: image('nspy', 5), images: gallery('nspy', 5), tone: 'ink',
    intro: '把行事曆、會議、郵件與日常工具，整合成一個專注的工作空間。',
    context: '日常工作經常需要在不同應用程式間切換，資訊與操作被分散在多個視窗。這個專案從減少工作流碎片出發，讓管理、記錄與啟動工具都能在同一個環境完成。',
    contribution: '設計並開發整合式生產力平台，串接行事曆管理、本機即時語音辨識與音訊分離、多信箱管理、桌面捷徑、例行提醒，以及輕量化瀏覽器。',
    details: ['整合行事曆與例行提醒，集中管理每日安排。', '以本機 STT 搭配音訊分離，支援會議轉錄流程。', '將多信箱、桌面捷徑與輕量瀏覽器收進同一個工作環境。'],
  },
  {
    id: 'magnetic', title: '磁鐵棋', subtitle: '策略之外，還有一起玩的樂趣。',
    category: 'game', categoryLabel: '遊戲製作', type: 'Multiplayer strategy game',
    tags: ['即時多人', '策略對戰', '語音互動'], cover: image('magnetic', 2), images: gallery('magnetic', 2), tone: 'teal', video: 'projects/magnetic/gameplay.mp4',
    intro: '結合房間對戰、角色收藏與即時語音的多人線上策略棋盤遊戲。',
    context: '以策略深度與玩家互動為核心，將競技與社交串在同一個遊戲體驗裡。玩家不只在棋盤上交鋒，也能透過角色收藏與語音建立連結。',
    contribution: '專案整合自訂房間對戰、角色造型與收藏系統，以及即時語音溝通，讓策略選擇與玩家互動彼此連動。',
    details: ['自訂房間與多人對戰流程。', '角色造型、收藏及展示介面。', '即時語音互動，連結競技與社交體驗。'],
  },
  {
    id: 'rhythm', title: '節奏 × 共鬥', subtitle: '每一次出手，都踩在節拍上。',
    category: 'game', categoryLabel: '遊戲製作', type: 'Multiplayer rhythm action',
    tags: ['節奏戰鬥', '即時同步', '音樂編輯器'], cover: image('rhythm', 3), images: gallery('rhythm', 3), tone: 'mauve',
    intro: '讓角色切換、環境機關與多人戰鬥，都跟著音樂一起發生。',
    context: '在多人合作的動作遊戲中加入節奏維度，讓音樂不只是背景，而是支配戰鬥與關卡互動的共同語言。',
    contribution: '設計並實作核心節奏戰鬥系統、即時同步邏輯，以及遊戲內音樂編輯器；將環境危險、Boss 機制與攻擊輸出對齊音樂時序。',
    details: ['以音樂時序協調戰鬥、攻擊與環境機制。', '多人同步與角色切換，支援合作遊玩。', '遊戲內音樂編輯器，串連編輯與遊玩流程。'],
  },
  {
    id: 'corporate', title: '企業形象網站', subtitle: '讓專業，也有清晰的表達。',
    category: 'web', categoryLabel: '網頁製作', type: 'Corporate website',
    tags: ['品牌形象', '資訊架構', '響應式網頁'], cover: image('corporate', 0), images: gallery('corporate', 0), tone: 'silver',
    intro: '以清楚的層級與跨裝置版面，呈現企業的技術、產品與品牌故事。',
    context: '企業網站需要同時容納品牌敘事、技術資訊與產品內容。專案畫面呈現以清楚的資訊層級串起這些不同的閱讀需求。',
    contribution: '作品涵蓋首頁、技術與產品介紹、企業沿革及聯絡資訊，並包含桌面與手機版的頁面呈現。',
    details: ['以首頁與品牌敘事建立閱讀起點。', '技術及產品內容以清楚的層級編排。', '桌面與手機版面皆有對應的內容呈現。'],
  },
  {
    id: 'speech', title: '語言練習的冒險', subtitle: '以 Unity 打造互動式語言練習遊戲。',
    category: 'game', categoryLabel: '遊戲製作', type: 'Unity game development',
    tags: ['Unity', '遊戲開發', '互動實作'], cover: image('speech', 1), images: gallery('speech', 1), tone: 'peach',
    intro: '以 Unity 開發的語言練習遊戲，透過場景、角色與互動任務，讓練習融入遊戲體驗。',
    context: '以遊戲場景承載語言練習，讓抽象的練習流程變成可以探索、回應與記錄的互動任務。',
    contribution: '主要負責 Unity 遊戲開發，將語言練習內容整合為可操作的遊戲場景與互動流程。',
    details: ['Unity 遊戲功能與互動流程開發。', '練習場景與角色互動實作。', '遊戲 UI 介面與操作流程整合。'],
  },
  {
    id: 'rental', title: '小租家', subtitle: '家的下一步，從租開始。',
    category: 'web', categoryLabel: '網頁製作', type: 'Furniture rental platform',
    tags: ['租賃平台', '資料庫設計', '訂單流程'], cover: image('rental', 3), images: gallery('rental', 3), tone: 'sage',
    intro: '支援會員、商品與訂單管理的家具租賃網站。',
    context: '家具租賃需要穩定串連商品資訊、使用者身分與交易資料。專案以可擴充的資料結構，支援租賃服務的日常運作。',
    contribution: '設計並實作後端邏輯、資料庫結構與資料流，支援租賃交易、會員驗證與內容管理，並優化查詢以降低伺服器負擔。',
    details: ['會員驗證、商品資料與租賃訂單的流程整合。', '資料庫結構及後端資料流設計。', '查詢優化，支援後續功能擴充。'],
  },
  {
    id: 'pdf', title: '文件工作台', subtitle: '繁複的文件，清楚地處理。',
    category: 'desktop', categoryLabel: '桌面軟體', type: 'Document workflow tool',
    tags: ['文件工具', '設定管理', '桌面介面'], cover: image('pdf', 0), images: gallery('pdf', 0), tone: 'blue',
    intro: '以集中式介面管理文件處理的設定與操作。',
    context: '文件處理涉及多組設定、資料與操作步驟。專案畫面以統一的工作台介面，讓這些資訊可以在同一處檢視。',
    contribution: '作品呈現文件設定管理、資料列表與操作表單，將處理流程收整為具有明確層級的桌面工作介面。',
    details: ['集中呈現文件處理的設定項目。', '資料列表與表單操作介面。', '以工作台結構整理多步驟的操作流程。'],
  },
  {
    id: 'launcher', title: 'Training Launcher', subtitle: '從啟動，到進入情境。',
    category: 'system', categoryLabel: '系統整合', type: 'Training simulation platform',
    tags: ['API 整合', '權限驗證', '情境編輯'], cover: image('launcher', 1), images: gallery('launcher', 1), tone: 'sand',
    intro: '整合啟動器與情境編輯器的企業職業訓練模擬平台。',
    context: '企業訓練部署需要兼顧安全存取與情境管理。專案透過統一的啟動入口，連接使用者驗證、訓練內容與管理流程。',
    contribution: '實作前端邏輯與系統整合，包含 API 串接、驗證與權限控制、QR Code 掃描整合，以及即時資料同步。',
    details: ['API 串接與前端系統邏輯。', '身分驗證、權限控制與 QR Code 掃描整合。', '即時資料同步，支援訓練部署及管理流程。'],
  },
]
export const categories = [{ id: 'all', label: '全部作品' }, { id: 'game', label: '遊戲製作' }, { id: 'desktop', label: '桌面軟體' }, { id: 'web', label: '網頁製作' }, { id: 'system', label: '系統整合' }]
