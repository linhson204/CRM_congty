function TextQuestion({ question, value, onChange }) {
    return (
        <div className="question">
        <label>
            {question.question}
            {question.required && <span className="required">*</span>}
        </label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={question.maxLength || 250}
            required={question.required}
        />
        <div className="char-counter">
            {value.length}/{question.maxLength || 250}
        </div>
        </div>
    );
}