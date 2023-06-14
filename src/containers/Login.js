import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const Login = ({ token, setUserToken }) => {
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
    <Navigate to={"/"} />
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
                "https://vinted-app.vercel.app/user/login",
                {
                  email: mail,
                  password: password,
                }
              );
              // Création d'un cookie à la connexion !
              setUserToken(response.data.token, response.data.account.username);
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
