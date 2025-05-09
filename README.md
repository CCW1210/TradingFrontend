# TradingFrontend

## 專案概述

TradingFrontend 是基於 React 的股票交易視覺化前端，提供金融市場數據的歷史與即時 K 線圖展示。

## 主要功能

* **K 線圖**：使用 ECharts（echarts-for-react）渲染蠟燭圖
* **歷史數據**：透過 Axios 呼叫後端 API 查詢
* **即時更新**：透過 STOMP/SockJS WebSocket 接收市場推送

## 技術

* **前端框架**：React 19.0.0
* **資料視覺化**：ECharts (echarts-for-react)
* **HTTP 請求**：Axios
* **即時通訊**：@stomp/stompjs、SockJS-client
* **建構工具**：Vite 或 Create React App（依專案設定）

## 專案結構

```
TradingFrontend/
├── public/
├── src/
│   ├── components/
│   │   └── KLineChart.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── websocket.js
│   ├── App.js
│   └── index.js
└── package.json
```

## 安裝與執行

1. **前置需求**：Node.js 16+、npm 或 yarn
2. **複製專案**：

   ```powershell
   git clone https://github.com/CCW1210/TradingFrontend.git
   cd TradingFrontend
   ```
3. **安裝套件**：

   ```powershell
   npm install
   ```
4. **啟動開發伺服器**：

   ```powershell
   npm start
   ```
5. **建置生產版本**：

   ```powershell
   npm run build
   ```

## 環境設定

請確認在 `src/services/api.js` 和 `src/services/websocket.js` 中設定：

* 後端 REST API URL
* WebSocket URL
