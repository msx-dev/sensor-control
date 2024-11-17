import express from "express";
import http from "http";
import { WebSocket, Server as WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);

//Websocket
const wss = new WebSocketServer({ server });

type SensorName = "humidity" | "pressure";

interface SensorData {
  value: number;
  status: "idle" | "measuring" | "on" | "off";
  history: number[];
}

let sensorData: { humidity: SensorData; pressure: SensorData } = {
  humidity: { value: 0, status: "off", history: [] },
  pressure: { value: 0, status: "off", history: [] },
};

const generateRandomData = (sensor: SensorName): number => {
  const randomValue = Math.random() * (sensor === "humidity" ? 100 : 1013);
  return Math.round(randomValue * 100) / 100;
};

const sendSensorState = (ws: WebSocket) => {
  ws.send(
    JSON.stringify({
      type: "sensorData",
      data: sensorData,
    })
  );
};

wss.on("connection", (ws: WebSocket) => {
  console.log("A user connected");

  sendSensorState(ws);

  const stateIntervalId = setInterval(() => {
    sendSensorState(ws);
  }, 1000);

  ws.on("message", (message: string) => {
    if (!message) {
      console.error("Received an empty message");
      return;
    }

    const parsedMessage = JSON.parse(message);
    const { type, sensor } = parsedMessage;

    if (type === "toggleSensor" && sensor && sensorData[sensor as SensorName]) {
      const currentStatus = sensorData[sensor as SensorName].status;
      if (currentStatus === "off") {
        sensorData[sensor as SensorName].status = "on";
      } else {
        sensorData[sensor as SensorName].status = "off";
      }
      sendSensorState(ws);
    }

    //start measuring sensor data
    if (
      type === "startMeasuring" &&
      sensor &&
      sensorData[sensor as SensorName]
    ) {
      if (sensorData[sensor as SensorName].status === "off") {
        console.log(`${sensor} is not turned on. Cannot start measuring.`);
        return;
      }

      if (sensorData[sensor as SensorName].status === "measuring") {
        console.log(`${sensor} is already measuring. Skipping start.`);
        return;
      }

      //change sensor status to measuring
      sensorData[sensor as SensorName].status = "measuring";

      sendSensorState(ws);

      //always clear previous history
      if (sensor === "humidity") {
        sensorData.humidity.history = [];
      } else if (sensor === "pressure") {
        sensorData.pressure.history = [];
      }

      const intervalId = setInterval(() => {
        if (sensorData[sensor as SensorName].status !== "measuring") {
          clearInterval(intervalId);
        } else {
          const newValue = generateRandomData(sensor);
          sensorData[sensor as SensorName].value = newValue;
          //add to history
          if (sensor === "humidity") {
            sensorData.humidity.history.push(newValue);
          } else if (sensor === "pressure") {
            sensorData.pressure.history.push(newValue);
          }

          sendSensorState(ws);
        }
      }, 1000); //send data every second
    }

    //stop measuring sensor data
    if (
      type === "stopMeasuring" &&
      sensor &&
      sensorData[sensor as SensorName]
    ) {
      if (sensorData[sensor as SensorName].status !== "measuring") {
        console.log(`${sensor} is not currently measuring. Skipping stop.`);
        return;
      }
      //set sensor status to idle
      sensorData[sensor as SensorName].status = "idle";
      sendSensorState(ws); //send updated state
    }
  });

  ws.on("close", () => {
    console.log("User disconnected");
    clearInterval(stateIntervalId);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
