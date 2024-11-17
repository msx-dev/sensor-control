import { useState } from "react";
import { FaCog, FaHome } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import SidebarLink from "../SidebarLink/SidebarLink";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={toggleSidebar}>
          {isOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
        </button>
      </div>
      <div className={styles.links}>
        <SidebarLink
          isOpen={isOpen}
          routeName="Home"
          to="/"
          icon={<FaHome />}
        />
        <SidebarLink
          isOpen={isOpen}
          routeName="Sensor 1"
          to="/sensor1"
          icon={<FaCog />}
        />
        <SidebarLink
          isOpen={isOpen}
          routeName="Sensor 2"
          to="/sensor2"
          icon={<FaCog />}
        />
      </div>
    </div>
  );
};

export default Sidebar;
