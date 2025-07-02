// Essa parte aqui atualmente foi feito so pra exibir o email do usuario que logou no sistema ja que nao esta conectado a nenhum banco de dados.
import styles from "./UserMenu.module.scss";

const UserMenu = () => {

  const userEmail = localStorage.getItem("user_email"); 



  return (
    <div className="relative">
      <span className={styles["user-email"]}>{userEmail || "Usuário"}</span>
    </div>
  );
};

export default UserMenu;
