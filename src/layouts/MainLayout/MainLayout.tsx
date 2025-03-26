import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <div id="root">
      <div className={styles.container}>
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
