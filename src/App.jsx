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
import { useState } from "react";

import "./App.css";

function App() {
  /* Uso lo use state per settare l'input  */
  const [formData, setformData] = useState("");
  const [formPost, setFormPost] = useState({});

  /* Blocco l'invio del form con l'handler */
  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      title: formData,
      image: formData,
      description: formData,
      status: false,
    };
    setFormPost((formPost) => ({
      ...formPost,
      [e.target.title]: e.target.value,
      [e.target.image]: e.target.value,
      [e.target.description]: e.target.value,
    }));
    setFormPost(newItem);
  };

  /* Funzione per cancellare l'elemento */
  const removeData = (id) => {
    const deleteData = formData.filter((item, index) => {
      return index !== id;
    });
    setformData(deleteData);
  };

  return (
    <>
      <div className="container">
        <h1>My blog</h1>
        <form onSubmit={handleSubmit} className="row d-flex">
          <div className="col-3 form-control">
            {/* Titolo */}
            <label className="form-label" htmlFor="text-form">
              Titolo
            </label>
            <input
              id="text-form"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setformData(e.target.value);
              }}
            />
            <button className="btn btn-primary mx-2">Invia</button>
          </div>
          <div className="col-3 form-control">
            {/* Immagine */}
            <label className="form-label" htmlFor="image-form">
              Immagine
            </label>
            <input
              id="image-form"
              type="text"
              value={formData.image}
              onChange={(e) => {
                setformData(e.target.value);
              }}
            />
            <button className="btn btn-primary mx-2">Invia</button>
          </div>
          <div className="col-3 form-control">
            {/* Descrizione */}
            <label className="form-label" htmlFor="description-form">
              Descrizione
            </label>
            <input
              id="description-form"
              type="text"
              value={formData.description}
              onChange={(e) => {
                setformData(e.target.value);
              }}
            />
            <button className="btn btn-primary mx-2">Invia</button>
          </div>
          <div className="col-3 form-control">
            {/* Categoria */}
            <select className="form-select mb-3">
              <option selected>Open this select menu</option>
              <option defaultValue="1">One</option>
              <option defaultValue="2">Two</option>
              <option defaultValue="3">Three</option>
            </select>

            <button className="btn btn-primary mx-2">Invia</button>
          </div>
        </form>
        <hr />
        {/* Creo una copia con il map e aggiunngo l'elemento al DOM */}*
        <div className="row">
          <div className="form-control d-flex" key={index}>
            <div className="card">
              <div>{image}</div>
              <div className="card-body">
                <h2>{title}</h2>
                <p>{description}</p>
                <button
                  onClick={() => removeData(id)}
                  className="btn btn-danger mx-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
