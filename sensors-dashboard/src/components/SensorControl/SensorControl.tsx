import useSensorData from "../../hooks/useSensorData";
import ControlButtonMeasure from "../ControlButton/ControlButtonMeasure/ControlButtonMeasure";
import ControlButtonPower from "../ControlButton/ControlButtonPower/ControlButtonPower";
import styles from "./SensorControl.module.scss";

interface SensorControlProps {
  name: string;
  unit: string;
  type: "humidity" | "pressure";
}

const SensorControl = ({ name, unit, type }: SensorControlProps) => {
  const { sensorData } = useSensorData();
  const sensor =
    type === "humidity" ? sensorData?.humidity : sensorData?.pressure;

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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.nameStatus}>
          <p className={styles.name}>{name}</p>
          <p className={styles.status} style={getStatusStyle(sensor?.status)}>
            {sensor?.status}
          </p>
        </div>
        <ControlButtonPower type={type} />
      </div>
      <div className={styles.measure}>
        <ControlButtonMeasure type={type} />
        <div className={styles.measurement}>
          <p className={styles.current}>
            {sensor?.status === "measuring" ? sensor.value : "/"}
          </p>
          <p className={styles.current}>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default SensorControl;
