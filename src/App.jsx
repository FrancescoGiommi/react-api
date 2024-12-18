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
  const [editPost, setEditPost] = useState();
  const [posts, setPosts] = useState([]);

  /* Blocco l'invio del form con l'handler */
  const handleSubmit = (event) => {
    event.preventDefault();
    setPostList([...postList, formData]);
    setFormData({ ...defaultPost, id: formData.id + 1 });
  };

  /* copio l'oggetto  */
  const handleInputForm = (e) => {
    const newFormFields = {
      ...formData,

      [e.target.name]: e.target.value,
    };
    setFormData(newFormFields);
    console.log(newFormFields);
  };

  /*const handleEditPost = (e) => {
    e.preventDefault();
    const newPost = [...postList];
  };*/

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

  const removePost = (deleteIndex) => {
    const deletedPost = postList.filter((item, index) => {
      return deleteIndex !== index;
    });
    setPostList(deletedPost);
  };

  /* Funzione per cancellare l'elemento */
  const deletePost = (e, id) => {
    e.preventDefault();
    fetch("http://localhost:3000/posts/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
      });
  };

  /* Fetching dei dati */
  const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputForm}
              />
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

        <div className="row d-flex gap-3">
          {posts.map((post) => (
            <div key={post.id} className="card col-3 d-flex">
              <div>
                <img
                  src={`http://localhost:3000${post.image}`}
                  className="card-img-top"
                  alt=""
                />
              </div>
              <div className="card-body ">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                {post.tags.map((tag) => (
                  <span className="badge rounded text-bg-primary me-2">
                    {tag}
                  </span>
                ))}
                <button
                  onClick={(e) => deletePost(e, post.id)}
                  className="btn btn-danger m-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="row d-flex gap-3">
          {postList.map((post) => (
            <div key={post.id} className="card col-3 d-flex">
              <div>
                <img src={post.image} className="card-img-top" alt="" />
              </div>
              <div className="card-body ">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                {post.tags.map((tag) => (
                  <span className="badge rounded text-bg-primary me-2">
                    {tag}
                  </span>
                ))}
                <button
                  onClick={() => removePost(post.id)}
                  className="btn btn-danger m-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
