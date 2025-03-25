import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import { Button } from "../../components/Button";
import LogoUni from "../../assets/LogoUni.png";
import { SassColor } from "sass";

type FormData = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const onSubmit = async (data: FormData) => {
        try {
            // Simulando uma requisição POST para o backend
            // const response = await axios.post("https://seu-backend.com/api/login", data);

            const fakeToken = "fake-jwt-token-123"; // Token fictício para testar a navegação
            
            // Pegando o token JWT da resposta
            // const { token } = response.data;
            
            // Salvando no localStorage (ou sessionStorage se quiser que expire ao fechar o navegador)
            // localStorage.setItem("jwt_token", token);
            // Para teste de navegacao sem backend
            localStorage.setItem("jwt_token", fakeToken);

            // Redireciona para o painel de coordenadores
            navigate("/dashboard");
        } catch (error: any) {
            setErrorMessage("Email ou senha incorretos.");
        }
    };

    return (
        <div className={styles.login_page}>          
            <img
                src={LogoUni}
                alt="Unievangelica logo"
                className={styles.LogoUni}
                style={{ width: '250px', height: '250px' }} 
            />
            <div className={styles.login_container}>
                <h1>Login</h1>
                <form className={styles.form_Grup} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.email_grup}>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder=" " 
                            {...register("email", { required: "O email é obrigatório" })}
                        />
                        <label htmlFor="email">Email:</label>
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    
                    <div className={styles.password_grup}>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder=" " 
                            {...register("password", { required: "A senha é obrigatória" })}
                        />
                        <label htmlFor="password">Senha:</label>
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    </div>

                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                    <Button text="Logar" type="submit" variant="primary" />

                </form>
            </div>
        </div>
    );
};

export default Login;
