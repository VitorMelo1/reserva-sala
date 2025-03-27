import React from "react";
import styles from "./Sidebar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  DashboardIcon,
  ReservasIcon,
  RelatoriosIcon,
  ExitIcon,
  IconUni,
  LogoUni,
} from "../../assets/icons/icons";
import { UserMenu, Button } from "../../components";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const { logout } = useAuth();

  return (
    <div className={`${styles.Sidebar} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.SidebarContainer_Icons}>
        <ul>
          <li className={styles.menu_button_container}>
            <Button
              text="☰"
              padding="10px 10px"
              width="60px"
              variant="Side-menu"
              onClick={() => setIsExpanded((prev) => !prev)}
            />
          </li>
          <li className={styles.LogoContainer}>
            {isExpanded ? (
              <img
                className={styles.FullLogo}
                src={LogoUni}
                alt="Unievangelica Logo Expandida"
              />
            ) : (
              <img
                className={styles.IconUni}
                src={IconUni}
                alt="Unievangelica Icon"
              />
            )}
          </li>
        </ul>

        <ul>
          <li className={styles.DirectionContainer}>
            <Link to="/dashboard">
              <img src={DashboardIcon} alt="Dashboard icon" />
              {isExpanded && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={styles.DirectionContainer}>
            <Link to="/reservas">
              <img src={ReservasIcon} alt="Reservas icon" />
              {isExpanded && <span>Reservas</span>}
            </Link>
          </li>
          <li className={styles.DirectionContainer}>
            <Link to="/relatorios">
              <img src={RelatoriosIcon} alt="Relatórios icon" />
              {isExpanded && <span>Relatórios</span>}
            </Link>
          </li>
        </ul>

        <ul>
          <li className={styles.UserMenuContainer}>
            <UserMenu />
          </li>
          <li className={`${styles.DirectionContainer} ${styles.ExitContainer}`}>
            <Link
              to="/login"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <img
                className={styles.exitIcone}
                src={ExitIcon}
                alt="Exit icon"
              />
              {isExpanded && <span>Sair</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
