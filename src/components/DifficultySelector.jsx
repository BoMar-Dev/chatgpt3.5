
const DifficultySelector = ({ onChange }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="difficulty-selector">
            <label htmlFor="difficulty">Välj svårighetsgrad:</label>
            <select id="difficulty" onChange={handleChange}>
                <option value="easy">Lätt</option>
                <option value="medium">Medium</option>
                <option value="hard">Svår</option>
            </select>
        </div>
    );
};

export default DifficultySelector;
