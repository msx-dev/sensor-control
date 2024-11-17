import { useEffect, useState } from "react";
import { useSensorDataContext } from "../context/SensorDataContext";
import { SensorDataResponse } from "../types/sensor";

const useSensorData = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [sensorData, setSensorData] = useState<SensorDataResponse | null>(null);
  const [humidityHistory, setHumidityHistory] = useState<number[]>([]);
  const [pressureHistory, setPressureHistory] = useState<number[]>([]);
  const { setLastPressureHistory, setLastHumidityHistory } =
    useSensorDataContext();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    setWs(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data) {
        const updatedData: SensorDataResponse = data.data;
        setHumidityHistory(updatedData.humidity.history);
        setPressureHistory(updatedData.pressure.history);
        setSensorData(updatedData);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const startMeasuring = (sensor: string) => {
    if (ws) {
      ws.send(JSON.stringify({ type: "startMeasuring", sensor }));
    }
  };

  const stopMeasuring = (sensor: string) => {
    if (ws) {
      ws.send(JSON.stringify({ type: "stopMeasuring", sensor }));
      if (sensor === "pressure") {
        setLastPressureHistory(pressureHistory);
      } else {
        setLastHumidityHistory(humidityHistory);
      }
    }
  };

  const toggleSensor = (sensor: string, state: "on" | "off") => {
    if (ws) {
      ws.send(JSON.stringify({ type: "toggleSensor", sensor, state }));
      if (state === "off") {
        setLastHumidityHistory(humidityHistory);
        setLastPressureHistory(pressureHistory);
      }
    }
  };

  return {
    startMeasuring,
    stopMeasuring,
    toggleSensor,
    humidityHistory,
    pressureHistory,
    sensorData,
  };
};

export default useSensorData;
