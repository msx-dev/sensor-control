import { Link, useLocation } from "react-router-dom";
import styles from "./SidebarLink.module.scss";

interface SidebarLinkProps {
  isOpen: boolean;
  icon?: React.ReactNode;
  to: string;
  routeName: string;
}

const SidebarLink = ({ isOpen, icon, to, routeName }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = (route: string) => location.pathname === route;
  return (
    <Link
      to={to}
      className={`${styles.link} ${isActive(to) ? styles.active : ""}`}
    >
      {icon}
      {isOpen && routeName}
    </Link>
  );
};

export default SidebarLink;
