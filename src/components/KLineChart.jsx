// src/components/KLineChart.jsx
import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import stompClient from '../services/websocket';
import { getHistoricalData } from '../services/api';

const KLineChart = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  // 取得歷史數據，作為初始 K 線資料
  useEffect(() => {
    getHistoricalData()
      .then(response => {
        // 假設返回資料格式為 [{ time, open, close, low, high }, ...]
        setChartData(response.data);
      })
      .catch(error => {
        console.error("Failed to load historical data", error);
      });
  }, []);

  // 啟動 WebSocket 連線並訂閱實時更新
  useEffect(() => {
    // 啟動連線
    stompClient.activate();

    // 訂閱後端主題，此處主題依你後端設定調整（例如：/topic/kline）
    const subscription = stompClient.subscribe('/topic/kline', message => {
      const newData = JSON.parse(message.body);
      // 假設 newData 格式為 { time, open, close, low, high }
      setChartData(prevData => {
        // 可根據需求設定資料長度（例如：只保留最新 n 筆數據）
        const updatedData = [...prevData, newData];
        // 如需固定筆數，例如保留最近 100 筆：
        return updatedData.slice(-100);
      });
    });

    // 清理：組件卸載時取消訂閱並關閉連線
    return () => {
      subscription.unsubscribe();
      stompClient.deactivate();
    };
  }, []);

  // 設定 ECharts 選項
  const getOption = () => {
    return {
      title: {
        text: '動態 K 線圖',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.time), // X 軸：時間
      },
      yAxis: {
        scale: true,
        type: 'value',
      },
      series: [
        {
          type: 'candlestick',
          data: chartData.map(item => [item.open, item.close, item.low, item.high]),
          itemStyle: {
            color: '#06B800',      // 上漲顏色
            color0: '#FA0000',     // 下跌顏色
          },
        },
      ],
    };
  };

  return (
    <div>
      <ReactECharts
        option={getOption()}
        ref={chartRef}
        style={{ height: '500px', width: '100%' }}
      />
    </div>
  );
};

export default KLineChart;
