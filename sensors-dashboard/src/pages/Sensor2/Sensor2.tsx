import { useState } from "react";
import ChartCard from "../../components/ChartCard/ChartCard";
import Notes from "../../components/Notes/Notes";
import SensorControl from "../../components/SensorControl/SensorControl";
import useSensorData from "../../hooks/useSensorData";
import styles from "../SensorShared.module.scss";

const Sensor1 = () => {
  const { pressureHistory } = useSensorData();
  const [pressureNotes, setPressureNotes] = useState("");

  //We could save the notes to DB, but I left out this functionality
  const handleSaveNotes = (note: string) => {
    setPressureNotes(note);
  };

  //We could delete the notes from DB, but I left out this functionality
  const handleDeleteNotes = () => {
    setPressureNotes("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <SensorControl type="pressure" name="Pressure" unit="kPa" />
        <Notes
          onSave={(save) => handleSaveNotes(save)}
          onDelete={() => handleDeleteNotes()}
        />
      </div>
      <ChartCard
        data={pressureHistory}
        dataKey="value"
        label={{
          x: { value: "Time (s)", position: "right" },
          y: {
            value: "kPa",
            angle: -90,
            position: "insideLeft",
          },
        }}
        stroke="#4caf50"
        title="Pressure live measurement"
        emptyTitle="No data yet."
        emptyDescription="Start measuring."
      />
    </div>
  );
};

export default Sensor1;
