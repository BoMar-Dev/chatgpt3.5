import './styles.scss';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartScreen onStartGame={handleStartGame} />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/game/player" element={<GameBoard />} />
          <Route path="/game/computer" element={<GameBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
