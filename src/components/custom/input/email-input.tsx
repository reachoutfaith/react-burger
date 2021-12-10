import React, { useRef, useState, FC } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { IInputProps } from '../../utils/types';

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const EmailInput: FC<IInputProps> = ({ value, onChange, name, size = 'default' }) => {
    const [fieldDisabled, setDisabled] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const validateField = (value: string) => {
        setError(!validateEmail(value));
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = (e: any) => {
        if (e.target.value) {
            validateField(e.target.value);
        } else {
            setError(false);
        }
        setDisabled(true);
    };

    return (
        <Input
            type='email'
            placeholder='Email'
            onChange={onChange}
            icon={!fieldDisabled ? 'CloseIcon' : 'EditIcon'}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            error={error}
            disabled={fieldDisabled}
            onIconClick={onIconClick}
            errorText={'Ой, произошла ошибка!'}
            size={size}
        />
    );
};