import { MdSensors } from "react-icons/md";
import { SensorData } from "../../types/sensor";
import styles from "./SensorState.module.scss";

interface SensorStateProps {
  sensorData?: SensorData;
  name: string;
}

const SensorState = ({ sensorData, name }: SensorStateProps) => {
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "on":
        return { color: "#02d37d" };
      case "off":
        return { color: "#cd5c5c" };
      case "idle":
        return { color: "#02d37d" };
      case "measuring":
        return { color: "#0096ff" };
      default:
        return {};
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.sensorName}>
        <div className={styles.name}>{name}</div>
        <MdSensors className={styles.icon} />
      </div>
      <div className={styles.status} style={getStatusStyle(sensorData?.status)}>
        {sensorData?.status}
      </div>
    </div>
  );
};

export default SensorState;
