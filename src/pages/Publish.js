import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [created, setCreated] = useState(false);
  const [offerpreview, setOfferpreview] = useState(null);

  return !token ? (
    <Navigate to="/login" />
  ) : (
    <div className="container">
      {!created ? (
        <form
          className="publish-form"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append("picture", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("price", price);
            formData.append("brand", brand);
            formData.append("city", city);

            try {
              const response = await axios.post(
                "https://vinted-val.herokuapp.com/offer/publish",
                formData,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              setCreated(true);
              setOfferpreview(response.data);
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          <h1>Vends ton article</h1>
          <div className="publish-section">
            <input
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
          </div>
          <div className="publish-section">
            <div>
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                placeholder="ex : Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="description">Décris ton article</label>
              <textarea
                id="description"
                placeholder="ex : porté plusieurs fois, taille correctement"
                cols="30"
                rows="7"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-section">
            <div>
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                placeholder="ex : Adidas"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                id="size"
                placeholder="ex : L / Pointure 38"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                id="color"
                placeholder="ex : Jaune / Rouge"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="condition">État</label>
              <input
                type="text"
                id="condition"
                placeholder="ex : Très bon état"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="city">Lieu</label>
              <input
                type="text"
                id="city"
                placeholder="ex : Toulouse / Nantes"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-section">
            <div>
              <label htmlFor="price">Prix</label>
              <input
                type="number"
                id="price"
                placeholder="ex : 10 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </div>
          <button className="button-fill">Ajouter</button>
        </form>
      ) : (
        <div className="publicated">
          <p>Article publié !</p>
          <div className="offer-preview">
            <p>Titre : {offerpreview.title}</p>
          </div>
          <button
            className="button-fill"
            onClick={() => {
              setCreated(false);
            }}
          >
            Ajouter un autre article
          </button>
        </div>
      )}
    </div>
  );
};

export default Publish;
