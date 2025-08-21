function SingleSelectQuestion({ question, value, onChange }) {
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
                type="radio"
                name={`q_${question.id}`}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                required={question.required}
                />
                {option}
            </label>
            ))}
        </div>
        </div>
    );
}