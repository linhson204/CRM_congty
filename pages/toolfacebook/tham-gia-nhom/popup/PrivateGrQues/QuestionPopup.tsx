import React, { useState } from 'react';
import style from '../../styles.module.css';
import QuestionRenderer from './QuesRenderer';
import { Question } from './types'; // Định nghĩa interface Question nếu cần

interface QuestionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    questions: Question[];
    initialAnswers?: Record<number, any>;
    onSubmit?: (answers: Record<number, any>) => void;
}

const QuestionPopup: React.FC<QuestionPopupProps> = ({
    isOpen,
    onClose,
    questions,
    initialAnswers = {},
    onSubmit
    }) => {
        const [answers, setAnswers] = useState<Record<number, any>>(initialAnswers);

        const handleAnswerChange = (questionId: number, value: any) => {
            setAnswers(prev => ({ ...prev, [questionId]: value }));
        };

        const handleClose = () => {
            setAnswers(initialAnswers);
            onClose();
        };

        const handleSubmit = () => {
            onSubmit(answers);
            handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className={style.modalOverLay}>
            <div className={style.modalContent}>
                <div className={style.modalHeader}>
                <h2>Vui lòng trả lời các câu hỏi</h2>
                <button className={style.closeButton} onClick={handleClose}>
                    &times;
                </button>
                </div>
                
                <div className={style.modalBody}>
                {questions.map(q => (
                    <QuestionRenderer
                    key={q.id}
                    question={q}
                    value={answers[q.id] ?? (q.type === 'checkbox' ? [] : '')}
                    onChange={handleAnswerChange}
                    />
                ))}
                </div>
                
                <div className={style.modalFooter}>
                <button className={style.cancelButton} onClick={handleClose}>
                    Hủy
                </button>
                <button className={style.submitButton} onClick={handleSubmit}>
                    Gửi
                </button>
                </div>
            </div>
        </div>
    );
    };

export default QuestionPopup;