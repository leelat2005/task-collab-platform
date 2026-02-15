
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/boards')
      .then(res => res.json())
      .then(data => setBoards(data));

    socket.on('boardUpdated', data => setBoards(data));
  }, []);

  const createBoard = () => {
    fetch('http://localhost:5000/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: boardName })
    });
    setBoardName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Collaboration Platform</h2>
      <input value={boardName} onChange={e => setBoardName(e.target.value)} placeholder="Board Name" />
      <button onClick={createBoard}>Create Board</button>
      {boards.map(board => (
        <div key={board.id} style={{ marginTop: 20 }}>
          <h3>{board.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
