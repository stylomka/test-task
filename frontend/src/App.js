import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3000'; // Замените на ваш URL сервера Node.js

function App() {
  const [repositories, setRepositories] = useState([]);
  const [syncMessage, setSyncMessage] = useState('');

  // Функция для загрузки репозиториев с сервера
  const fetchRepositories = () => {
    axios.get(`${apiUrl}/repositories`)
      .then(response => {
        setRepositories(response.data);
      })
      .catch(error => {
        console.error('Error fetching repositories:', error);
      });
  };

  // Функция для начала синхронизации с GitHub
  const startSync = () => {
    axios.post(`${apiUrl}/sync`)
      .then(response => {
        setSyncMessage(response.data.message);
        fetchRepositories(); // После синхронизации обновляем список репозиториев
      })
      .catch(error => {
        console.error('Error starting sync:', error);
      });
  };

  // Загрузка репозиториев при загрузке компонента
  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div className="App">
      <h1>Trending Repositories</h1>
      <button onClick={startSync}>Start Sync</button>
      <p>{syncMessage}</p>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name} ({repo.stars} stars)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
