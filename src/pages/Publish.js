import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  return !token ? (
    <Navigate to="/login" />
  ) : (
    <div className="container">Page de publication d'une offre</div>
  );
};

export default Publish;
