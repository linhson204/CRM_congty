import style from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/popup.module.css";
import React from 'react';
import { Question } from './types';

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (questionId: number, value: any) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, value, onChange }) => {
  const handleChange = (newValue: any) => {
    onChange(question.id, newValue);
  };

  switch(question.type) {
    case 'textarea':
      return <TextQuestion question={question} value={value} onChange={handleChange} />;
    case 'radio':
      return <SingleSelectQuestion question={question} value={value} onChange={handleChange} />;
    case 'checkbox':
      return <MultiSelectQuestion question={question} value={value} onChange={handleChange} />;
    default:
      return <div>Unsupported question type</div>;
  }
};

const TextQuestion = ({ question, value, onChange }) => (
  <div className={style.question}>
    <label className={style.quesHeader}>
      {question.question}
      {question.required && <span className={style.required}>*</span>}
    </label>
    <textarea
      style={{resize: 'none'}}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={question.maxLength || 250}
      required={question.required}
    />
    <div className={style.charCounter}>
      {value.length}/{question.maxLength || 250}
    </div>
  </div>
);

const SingleSelectQuestion = ({ question, value, onChange }) => (
  <div className={style.question}>
    <label className={style.quesHeader}>
      {question.question}
      {question.required && <span className="required"></span>}
    </label>
    <div className={style.BlockColumn}>
      {question.options?.map(option => (
        <label key={option} className={style.radioOption}>
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

const MultiSelectQuestion = ({ question, value = [], onChange }) => {
  const handleCheckboxChange = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className="question">
      <label className={style.quesHeader}>
        {question.question}
        {question.required && <span className="required">*</span>}
      </label>
      <div className={style.BlockColumn}>
        {question.options?.map(option => (
          <label key={option} className={style.checkboxOption}>
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
};

export default QuestionRenderer;