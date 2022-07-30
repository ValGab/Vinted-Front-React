import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeMail = (event) => {
    const value = event.target.value;
    setMail(value);
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
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
              navigate("/");
            } catch (error) {
              console.log(error.response);
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

        <input type="submit" className="button-fill" value="S'inscrire" />
      </form>
    </div>
  );
};

export default Login;
