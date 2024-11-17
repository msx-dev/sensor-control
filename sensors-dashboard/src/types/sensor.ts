export interface SensorData {
  value: number;
  status: "idle" | "measuring" | "on" | "off";
  history: number[];
}

export interface SensorDataResponse {
  humidity: SensorData;
  pressure: SensorData;
}
