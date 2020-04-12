import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post('repositories', {
        title: `Novo projeto: ${Date.now()}`,
        url: 'Aqui é a url',
        techs: ['Node'],
      })
      .then((response) => {
        const repository = response.data;
        setRepositories([...repositories, repository]);
      });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(() => {
      const repositoryIndex = repositories.findIndex((repository) => {
        return repository.id === id;
      });

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    });
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
