import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./MainLayout.module.scss";
import { useState } from "react";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expanded : ""}`}>
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
