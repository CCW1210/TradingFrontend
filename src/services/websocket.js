// src/services/websocket.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 後端 WebSocket 端點（請依實際情況修改 URL）
const SOCKET_URL = "http://your-backend-domain/ws";

// 初始化 STOMP 客戶端
const stompClient = new Client({
  // 使用 sockjs 建立連線
  webSocketFactory: () => new SockJS(SOCKET_URL),
  reconnectDelay: 5000, // 連線斷開後嘗試重連間隔（毫秒）
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  onConnect: () => {
    console.log("Connected to WebSocket");
  },
  onStompError: (frame) => {
    console.error("Broker reported error: " + frame.headers['message']);
    console.error("Additional details: " + frame.body);
  },
});

// 輸出 stompClient，方便其他模組調用
export default stompClient;
