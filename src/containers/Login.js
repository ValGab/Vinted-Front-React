import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ token, setToken, setUser, setUsername }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeMail = (event) => {
    const value = event.target.value;
    setMail(value);
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="form container">
      <h1>Se connecter</h1>
      <form
        className="form-inputs"
        onSubmit={(event) => {
          event.preventDefault();
          const fetchData = async () => {
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                  email: mail,
                  password: password,
                }
              );
              setUser(response.data);
              // Création d'un cookie à la connexion !
              setToken(
                Cookies.set("token", response.data.token, { expires: 3 })
              );
              setUsername(
                Cookies.set("username", response.data.account.username, {
                  expires: 3,
                })
              );
              navigate("/");
            } catch (error) {
              setError(error.response.data.message);
              setPassword("");
            }
          };
          fetchData();
        }}
      >
        <input
          type="mail"
          placeholder="E-mail"
          value={mail}
          onChange={handleChangeMail}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handleChangePassword}
        />

        <input type="submit" className="button-fill" value="Se connecter" />
        {error && <p className="form error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
