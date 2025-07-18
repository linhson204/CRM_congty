import { useState, ChangeEvent, FormEvent } from 'react';

export function useForm() {
    const [formFields, setFormFields] = useState<any>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    return {
        formFields,
        handleChange,
        setFormFields,
    };
}
