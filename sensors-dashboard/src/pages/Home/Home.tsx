import { useState } from "react";
import ChartCard from "../../components/ChartCard/ChartCard";
import Notes from "../../components/Notes/Notes";
import SensorState from "../../components/SensorState/SensorState";
import { useSensorDataContext } from "../../context/SensorDataContext";
import useSensorData from "../../hooks/useSensorData";
import styles from "./Home.module.scss";

const Home = () => {
  const { lastHumidityHistory, lastPressureHistory } = useSensorDataContext();
  const { sensorData } = useSensorData();
  const [pressureNotes, setPressureNotes] = useState("");
  const [humidityeNotes, setHumidityNotes] = useState("");

  //We could save the notes to DB, but I left out this functionality
  const handleSaveNotes = (sensor: "humidity" | "pressure", note: string) => {
    if (sensor === "humidity") {
      setHumidityNotes(note);
    } else {
      setPressureNotes(note);
    }
  };

  //We could delete the notes from DB, but I left out this functionality
  const handleDeleteNotes = (sensor: "humidity" | "pressure") => {
    if (sensor === "humidity") {
      setHumidityNotes("");
    } else {
      setPressureNotes("");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.sensorGroup}>
        <div className={styles.statusAndNotes}>
          <h1 className={styles.title}>Humidity</h1>
          <SensorState
            sensorData={sensorData?.humidity}
            name="Humidity Sensor"
          />
          <Notes
            onSave={(save) => handleSaveNotes("humidity", save)}
            onDelete={() => handleDeleteNotes("humidity")}
          />
        </div>
        <ChartCard
          data={lastHumidityHistory}
          dataKey="value"
          label={{
            x: { value: "Time (s)", position: "right" },
            y: {
              value: "Humidity (%)",
              angle: -90,
              position: "insideLeft",
            },
          }}
          stroke="#4caf50"
          title="Last measured humidity data"
          emptyTitle="No data yet."
          emptyDescription="Complete a measuring sequence first."
        />
      </div>
      <div className={styles.sensorGroup}>
        <div className={styles.statusAndNotes}>
          <h1 className={styles.title}>Pressure</h1>
          <SensorState
            sensorData={sensorData?.pressure}
            name="Pressure Sensor"
          />
          <Notes
            onSave={(save) => handleSaveNotes("humidity", save)}
            onDelete={() => handleDeleteNotes("humidity")}
          />
        </div>
        <ChartCard
          data={lastPressureHistory}
          dataKey="value"
          label={{
            x: { value: "Time (s)", position: "right" },
            y: {
              value: "Humidity (%)",
              angle: -90,
              position: "insideLeft",
            },
          }}
          stroke="#f44336"
          title="Last measured data"
          emptyTitle="No data yet."
          emptyDescription="Complete a measuring sequence first."
        />
      </div>
    </div>
  );
};

export default Home;
