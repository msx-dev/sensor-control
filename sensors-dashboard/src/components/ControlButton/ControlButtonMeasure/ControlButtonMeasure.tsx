import useSensorData from "../../../hooks/useSensorData";
import shared from "../ControlButton.module.scss";
import styles from "./ControlButtonMeasure.module.scss";

interface ControlButtonMeasureProps {
  type: "humidity" | "pressure";
}

const ControlButtonMeasure = ({ type }: ControlButtonMeasureProps) => {
  const { startMeasuring, stopMeasuring, sensorData } = useSensorData();
  const sensor =
    type === "humidity" ? sensorData?.humidity : sensorData?.pressure;

  const text =
    sensor?.status === "measuring" ? "Stop Measuring" : "Start Measuring";

  const handleClick = () => {
    if (sensor?.status !== "off")
      if (sensor?.status === "measuring") {
        stopMeasuring(type);
      } else {
        startMeasuring(type);
      }
  };
  const textClass = `${styles.text} ${
    sensor?.status === "measuring" ? styles.iconOff : ""
  } ${sensor?.status === "measuring" ? styles.iconDisabled : ""}`;

  return (
    <button
      className={`${shared.button} ${styles.button} ${
        sensor?.status === "off" ? styles.disabled : ""
      }`}
      onClick={() => handleClick()}
      disabled={sensor?.status === "off"}
    >
      <p className={textClass}>{text}</p>
    </button>
  );
};

export default ControlButtonMeasure;
