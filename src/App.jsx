//! Giorno 1
/* 
Creare un semplice form con un campo input per il titolo di un articolo del blog.

Al submit del form, mostrare la lista degli articoli inseriti.

Infine dare la possibilità di cancellare ciascun articolo utilizzando un'icona.

BONUS

    Implementare la funzionalità di modifica del titolo di un post.
    Aggiungere più campi al form (ad es. lo stato di un articolo - draft, published - o l’autore) */

//! Giorno 2

/* Ampliare l'esercizio precedente aggiungendo, nel form, i campi per immagine, contenuto,
categoria (select) e uno stato per pubblicare o meno l'articolo. 

Utilizzare un unico oggetto per gestire tutti i dati del form.

BONUS
Aggiungere uno useEffect che mostri un alert quando l’utente clicca sull’apposita checkbox per pubblicare un articolo.
Aggiungere l'associazione con dei possibili tags (lista di checkbox) */

//! Giorno 3

/* E’ arrivato il momento di mettere insieme tutti i concetti appresi :arrossire:

    Partendo dall'esercizio precedente, integriamo le API che abbiamo sviluppato durante il modulo su ExpressJS. 
    Al caricamento dell'applicazione. sfruttando l'hook useEffect, 
    recuperiamo la lista dei post dal backend e la mostriamo nella tabella.
    
    Infine Implementiamo la funzionalità di cancellazione

BONUS:

Durante il submit del form, assicuriamoci che questi dati 
vengano inviati al backend e correttamente salvati.

Suggerimento: 

gli oggetti inviati nel body relle richieste vanno trasformati in stringhe con  JSON.stringify . 

Esempio: 
{
  method: "POST"
  body: JSON.stringify({ username: "example" }),
} */

/* Importo useState  */
import { useEffect, useState } from "react";

import "./App.css";

const defaultPost = {
  id: 1,
  title: "",
  image: "",
  description: "",
  published: false,
  tags: [],
};

const tagsList = ["HTML", "CSS", "JS"];

function App() {
  /* Uso lo use state per settare l'input  */
  const [formData, setFormData] = useState(defaultPost);
  const [postList, setPostList] = useState([]);

  /* Blocco l'invio del form con l'handler */
  const handleSubmit = (event) => {
    event.preventDefault();

    const newFormData = {
      ...formData,
    };
    setPostList([...postList, newFormData]);
    setFormData(defaultPost);
  };

  /* copio l'oggetto  */
  const handleInputForm = (e) => {
    newFormFields = {
      ...formData,

      [e.target.title]: e.target.value,
      [e.target.image]: e.target.value,
      [e.target.description]: e.target.value,
    };
    setFormData(newFormFields);
  };

  const handleFormTagChange = (e) => {
    let newTags;
    if (!e.target.checked) {
      newTags = formData.tags.filter((tag) => tag != e.target.value);
    } else {
      newTags = [...formData.tags, e.target.value];
    }
    const newFormTags = { ...formData, tags: newTags };
    setFormData(newFormTags);
    console.log(newFormTags);
  };

  /* Funzione per cancellare l'elemento */
  const removeData = (id) => {
    const deleteData = postList.filter((item, index) => {
      return id !== id;
    });
    setFormData(deleteData);
  };

  /* Fetching dei dati 
  const fetchPosts = () => {
    fetch("https://localhost:3000/posts")
      .then((res) => res.json())
      .then(data);
    setPostList(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);*/

  return (
    <>
      <div className="container">
        <h1>My blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="row gap-3">
            <div className="col-4">
              {/* Titolo */}
              <label className="form-label" htmlFor="text-form">
                <div className="fs-4">Titolo</div>
              </label>
              <input
                id="text-form"
                name="title"
                value={formData.title}
                onChange={handleInputForm}
              />
            </div>
            <div className="col-4">
              <label className="form-label" htmlFor="image-form">
                <div className="fs-4">Immagine</div>
              </label>
              <input
                id="image-form"
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputForm}
              />
            </div>
            <div className="col-4">
              <label className="form-label" htmlFor="description-form">
                <div className="fs-4">Descrizione</div>
              </label>
              <input
                id="description-form"
                type="text"
                name="image"
                value={formData.description}
                onChange={handleInputForm}
              />
            </div>
            <div className="col-4">
              <label className="form-label" htmlFor="form-selection">
                <div className="fs-4">Seleziona un post</div>
              </label>
              <select className="form-select mb-3" id="form-selection">
                <option value="">Seleziona un post</option>
                {postList.map((post, index) => (
                  <option value={index}>{post.title}</option>
                ))}
              </select>
            </div>
            <div>
              <h4>Tags</h4>
              <div className="col-4 my-3 d-flex gap-3">
                {tagsList.map((tag, index) => (
                  <label
                    className="form-label"
                    htmlFor={`tags-form-${tag}`}
                    key={index}
                  >
                    {tag}
                    <input
                      checked={formData.tags.includes(tag)}
                      id={`tags-form-${tag}`}
                      type="checkbox"
                      name="tags"
                      value={tag}
                      onChange={handleFormTagChange}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-primary col-12 mx-2">Invia</button>
        </form>
        <hr />
        {/* Creo una copia con il map e aggiunngo l'elemento al DOM */}
        <div className="row">
          <div className="form-control d-flex">
            {postList.length ? (
              postList.map((id, title, image, description) => (
                <div className="card" key={id}>
                  <div>
                    <img src={image} alt="" />
                  </div>
                  <div className="card-body">
                    <h2>Titolo: {title}</h2>
                    <p>Descrizione: {description}</p>
                    <button
                      onClick={() => removeData(id)}
                      className="btn btn-danger mx-2"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="card">
                <h3>Nessun post disponibile</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
