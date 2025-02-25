// src/services/api.js
import axios from 'axios';

// 設定後端 API 基底 URL（請根據實際修改）
const API_BASE_URL = "http://your-backend-domain/api";

// 取得歷史數據（假設後端提供 /historical-data 端點）
export const getHistoricalData = () => {
  return axios.get(`${API_BASE_URL}/historical-data`);
};
