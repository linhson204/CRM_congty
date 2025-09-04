function MultiSelectQuestion({ question, value, onChange }) {
    const handleCheckboxChange = (option) => {
        const newValue = value.includes(option)
        ? value.filter(v => v !== option) // Bỏ chọn
        : [...value, option]; // Thêm chọn
        
        onChange(newValue);
    };

    return (
        <div className="question">
        <label>
            {question.question}
            {question.required && <span className="required">*</span>}
        </label>
        <div className="options">
            {question.options.map(option => (
            <label key={option} className="option">
                <input
                type="checkbox"
                value={option}
                checked={value.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                />
                {option}
            </label>
            ))}
        </div>
        </div>
    );
}