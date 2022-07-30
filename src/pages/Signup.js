import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Signup = ({ token, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [newsletter, setNewsletter] = useState(false);

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
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
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
              setUser(response.data);
              // Création d'un cookie à la création donc à la connexion !
              Cookies.set("token", response.data.token, { expires: 3 });
            } catch (error) {
              console.log(error.response);
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
