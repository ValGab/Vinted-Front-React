import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ token, setUserToken, username, setUsername }) => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleChangeMail = (event) => {
    const value = event.target.value;
    setMail(value);
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return !token ? (
    <div className="form container">
      <h1>S'inscrire</h1>
      <form
        className="form-inputs"
        onSubmit={(event) => {
          event.preventDefault();
          const fetchData = async () => {
            try {
              const response = await axios.post(
                "https://vinted-app.vercel.app/user/signup",
                {
                  email: mail,
                  username: username,
                  password: password,
                  newsletter: newsletter,
                }
              );
              setUsername("");
              setMail("");
              setPassword("");
              setNewsletter(false);
              // Création d'un cookie à la création donc à la connexion !
              setUserToken(response.data.token, response.data.account.username);
              navigate("/");
            } catch (error) {
              setError(error.response.data.message);
              setUsername("");
              setMail("");
              setPassword("");
              setNewsletter(false);
            }
          };
          fetchData();
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleChangeUsername}
        />
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
        <div className="newsletter">
          <input
            type="checkbox"
            checked={newsletter ? true : false}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <label>S'inscrire à la newsletter</label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <input type="submit" className="button-fill" value="S'inscrire" />
        {error && <p className="form error">{error}</p>}
      </form>
      <Link to="/login" className="link-decoration-none">
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  ) : (
    <div className="form">
      <p>Votre compte a été créé !</p>
    </div>
  );
};

export default Signup;
