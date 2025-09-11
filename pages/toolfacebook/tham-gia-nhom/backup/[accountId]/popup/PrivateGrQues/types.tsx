export interface Question {
    id: number;
    type: 'textarea' | 'radio' | 'checkbox';
    question: string;
    required: boolean;
    maxLength?: number;
    options?: string[];
}