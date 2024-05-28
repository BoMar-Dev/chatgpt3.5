import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
    const navigate = useNavigate();

    const handleStartGame = (gameType) => {
        if (gameType === 'player') {
            navigate('/game/player'); // Navigate to multiplayer game
        } else if (gameType === 'computer') {
            navigate('/game/computer'); // Navigate to singleplayer game against computer
        }
    };

    return (
        <div className="start-screen">
            <h1>Välkommen till Memoryspelet</h1>
            <p>Välj speltyp:</p>
            <button onClick={() => handleStartGame('player')}>Spela mot en annan spelare</button>
            <button onClick={() => handleStartGame('computer')}>Spela mot datorn</button>
        </div>
    );
};

export default StartScreen;
