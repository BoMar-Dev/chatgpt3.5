// GameBoard.js
import  { useState, useEffect } from 'react';
import Card from '../components/Card';
import DifficultySelector from '../components/DifficultySelector';
import '../styles/GameBoard.scss';

const GameBoard = ({ onReturnToMainMenu }) => {
    const [difficulty, setDifficulty] = useState('easy');
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [playerTurn, setPlayerTurn] = useState(1); // Player turn
    const [triesLeft, setTriesLeft] = useState(2); // Number of tries left for current player
    const [matchedPairsPlayer1, setMatchedPairsPlayer1] = useState(0); // Number of matched pairs for player 1
    const [matchedPairsPlayer2, setMatchedPairsPlayer2] = useState(0); // Number of matched pairs for player 2
    const [gameOver, setGameOver] = useState(false); // Game over flag
    const [winner, setWinner] = useState(''); // Winner of the game
    const [scorePlayer1, setScorePlayer1] = useState(0); // Player 1's score
    const [scorePlayer2, setScorePlayer2] = useState(0); // Player 2's score

    // Define card icons based on difficulty
    const cardIcons = {
        easy: ['circle', 'square', 'triangle'],
        medium: ['circle', 'square', 'triangle', 'star', 'heart', 'flower'],
        hard: ['circle', 'square', 'triangle', 'star', 'heart', 'flower', 'sun', 'moon']
    };

    const handleDifficultyChange = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
    };

    const handleClick = (clickedId) => {
        if (flippedCards.length < 2 && triesLeft > 0 && !gameOver) {
            const updatedCards = cards.map(card => {
                if (card.id === clickedId && !card.isFlipped && !card.isMatched) {
                    return { ...card, isFlipped: true };
                }
                return card;
            });
            setCards(updatedCards);
            setFlippedCards(prev => [...prev, clickedId]);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            const firstIndex = cards.findIndex(card => card.id === firstCard);
            const secondIndex = cards.findIndex(card => card.id === secondCard);

            if (cards[firstIndex].icon !== cards[secondIndex].icon) {
                setTimeout(() => {
                    const resetCards = cards.map(card => {
                        if (card.id === firstCard || card.id === secondCard) {
                            return { ...card, isFlipped: false };
                        }
                        return card;
                    });
                    setCards(resetCards);
                    setPlayerTurn((prevPlayerTurn) => (prevPlayerTurn === 1 ? 2 : 1)); // Switch player turn
                    setTriesLeft(2); // Reset number of tries
                }, 1000);
            } else {
                const matchedCards = cards.map(card => {
                    if (card.id === firstCard || card.id === secondCard) {
                        return { ...card, isMatched: true };
                    }
                    return card;
                });
                setCards(matchedCards);

                // Update number of matched pairs for current player
                if (playerTurn === 1) {
                    setMatchedPairsPlayer1(prev => prev + 1);
                    setScorePlayer1(prev => prev + 1); // Increment player 1's score
                } else {
                    setMatchedPairsPlayer2(prev => prev + 1);
                    setScorePlayer2(prev => prev + 1); // Increment player 2's score
                }

                // Check if game is over
                if (matchedPairsPlayer1 + matchedPairsPlayer2 === cards.length / 2) {
                    setGameOver(true);
                    if (matchedPairsPlayer1 > matchedPairsPlayer2) {
                        setWinner('Player 1');
                    } else if (matchedPairsPlayer1 < matchedPairsPlayer2) {
                        setWinner('Player 2');
                    } else {
                        setWinner('Both players');
                    }
                }
            }
            setFlippedCards([]);
        }
    }, [flippedCards, cards, playerTurn, matchedPairsPlayer1, matchedPairsPlayer2]);

    useEffect(() => {
        const selectedIcons = cardIcons[difficulty];
        const shuffledIcons = shuffleArray([...selectedIcons, ...selectedIcons]);
        const newCards = shuffledIcons.map((icon, index) => ({
            id: index + 1,
            icon,
            isFlipped: false,
            isMatched: false
        }));
        setCards(newCards);
    }, [difficulty]);

    const shuffleArray = (array) => {
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleReturnToMainMenu = () => {
        onReturnToMainMenu();
    };

    return (
        <div className="game-board">
            <DifficultySelector onChange={handleDifficultyChange} />
            <button onClick={handleReturnToMainMenu}>Return to Main Menu</button>
            <div>Player 1 Score: {scorePlayer1}</div>
            <div>Player 2 Score: {scorePlayer2}</div>
            {cards.map(card => (
                <Card
                    key={card.id}
                    id={card.id}
                    icon={card.icon}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={!card.isMatched ? handleClick : undefined}
                />
            ))}
            {gameOver && <div className="winner-message">Congratulations {winner}!</div>}
        </div>
    );
};

export default GameBoard;