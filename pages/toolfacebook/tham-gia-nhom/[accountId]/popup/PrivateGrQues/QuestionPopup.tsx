import style from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/popup.module.css";
import React, { useState } from 'react';
import QuestionRenderer from './QuesRenderer';
import { Question } from './types'; // Định nghĩa interface Question nếu cần

interface QuestionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    questions: Question[];
    initialAnswers?: Record<number, any>;
    onSubmit?: (answers: Record<number, any>) => void;
    children: React.ReactNode;
}

const QuestionPopup: React.FC<QuestionPopupProps> = ({
    isOpen,
    onClose,
    questions,
    children,
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

        // Validate if at least one question is answered with meaningful content
        const isFormValid = () => {
            return questions.some(question => {
                const answer = answers[question.id];
                
                if (question.type === 'textarea' || question.type === 'radio') {
                    return answer && answer.toString().trim() !== '';
                } else if (question.type === 'checkbox') {
                    return answer && Array.isArray(answer) && answer.length > 0;
                }
                
                // For other types, just check if answer exists and is not empty
                return answer && answer.toString().trim() !== '';
            });
        };    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay}>
            <div className={`${style.modalContent} ${style.BlockColumn}`} onClick={(e) => e.stopPropagation()}>
                <div className={style.BlockRow}>
                    <h1>Trả lời câu hỏi</h1><br /><br />
                    <button className={style.closeButton} onClick={handleClose}>
                        &times;
                    </button>
                </div>
                {children}
                <div className={style.pendingNotification}>
                    <p style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '8px'}}>Yêu cầu của bạn đang chờ phê duyệt</p>
                    <p>Hãy trả lời những câu hỏi sau của quản trị viên nhóm để họ có thể xem xét
                    yêu cầu tham gia của bạn. Câu trả lời của bạn sẽ chỉ hiển thị với quản trị viên 
                    và người kiểm duyệt.</p>
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
                <button className={style.submitButton} onClick={handleSubmit} disabled={!isFormValid()}>
                    Gửi
                </button>
                </div>
            </div>
        </div>
    );
    };

export default QuestionPopup;