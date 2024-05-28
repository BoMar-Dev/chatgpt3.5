// Card.js
import PropTypes from 'prop-types';
import '../styles/Card.scss';

const Card = ({ id, icon, isFlipped, isMatched, onClick }) => {
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onClick(id);
        }
    };

    return (
        <div
            className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            <div className="card-inner">
                {(isFlipped || isMatched) ? (
                    <img src={`icons/${icon}.svg`} alt="Card Icon" />
                ) : (
                    <span>?</span>
                )}
            </div>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    isMatched: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Card;