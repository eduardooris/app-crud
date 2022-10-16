
import React, { useEffect, useState } from 'react';
import { BsTrash, BsFillPeopleFill } from 'react-icons/bs'
import './index.css';
import Loading from '../../components/Loading';

const API = "http://localhost:5000"

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)


  // Carregando todos os usuarios

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true)
      const res = await fetch(API + '/users') 
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))

        setLoading(false)

        setUsers(res)
    }

    loadUser()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault() 

    const user = {
      id: Math.random(),
      name,
      email
    }
    await fetch(API + '/users', {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })


    setUsers((prevState) => [...prevState, user])

    setEmail('')
    setName('')
  }

  const handleDelete = async (id) => {
    await fetch(API + '/users/' + id, {
      method: "delete"
    })

    setUsers((prevState) => prevState.filter((user) => user.id !== id))
  }
  /*const handleEdit = async (user) => {
    const data = await fetch(API + '/users/' + user.id, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "content-type" : "application/json"
      }
    })

  } */


  return (
    <div className="App">
      <h1>Usuários <BsFillPeopleFill /></h1>
      <form onSubmit={handleSubmit} className='formulario'>
        <label htmlFor='name'>Nome: </label>
        <input
          type="text"
          name="name" id="name"
          placeholder='Digite seu nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor='email'>Email: </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit'>Salvar</button>
      </form>
      <div className="usuarios">
        <div className='label'>
          <span>Nome</span>
          <span>Email</span>
          <span>Editar</span>
        </div>
        <hr />
      {loading === true ? (<Loading type='spokes' color='white' height={100} width={59} />) : (users.map((user) => (
        <div className="user" key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span><BsTrash onClick={() => handleDelete(user.id)} /></span>
        </div>
      )))}
      </div>
    </div>
  );
}

export default App;
