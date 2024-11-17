import { FaPowerOff } from "react-icons/fa";
import useSensorData from "../../../hooks/useSensorData";
import shared from "../ControlButton.module.scss";
import styles from "./ControlButtonPower.module.scss";

interface ControlButtonPowerProps {
  type: "humidity" | "pressure";
}

const ControlButtonPower = ({ type }: ControlButtonPowerProps) => {
  const { toggleSensor, sensorData } = useSensorData();
  const sensor =
    type === "humidity" ? sensorData?.humidity : sensorData?.pressure;

  const handleClick = () => {
    if (sensor?.status === "on") {
      toggleSensor(type, "off");
    } else {
      toggleSensor(type, "on");
    }
  };
  const iconClass = `${styles.icon} ${
    sensor?.status === "off" ? styles.iconOff : ""
  } ${sensor?.status === "measuring" ? styles.iconDisabled : ""}`;
  return (
    <button
      className={`${shared.button} ${styles.button}`}
      onClick={() => handleClick()}
      disabled={sensor?.status === "measuring"}
    >
      <FaPowerOff className={iconClass} />
    </button>
  );
};

export default ControlButtonPower;
