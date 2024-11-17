import { useState } from "react";
import ChartCard from "../../components/ChartCard/ChartCard";
import Notes from "../../components/Notes/Notes";
import SensorControl from "../../components/SensorControl/SensorControl";
import useSensorData from "../../hooks/useSensorData";
import styles from "../SensorShared.module.scss";

const Sensor1 = () => {
  const { humidityHistory } = useSensorData();
  const [humidityeNotes, setHumidityNotes] = useState("");

  //We could save the notes to DB, but I left out this functionality
  const handleSaveNotes = (note: string) => {
    setHumidityNotes(note);
  };
  //We could delete the notes from DB, but I left out this functionality
  const handleDeleteNotes = () => {
    setHumidityNotes("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <SensorControl type="humidity" name="Humidity" unit="%" />
        <Notes
          onSave={(save) => handleSaveNotes(save)}
          onDelete={() => handleDeleteNotes()}
        />
      </div>
      <ChartCard
        data={humidityHistory}
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
        title="Humidity live measurement"
        emptyTitle="No data yet."
        emptyDescription="Start measuring."
      />
    </div>
  );
};

export default Sensor1;
