import React, { useRef, useState, FC, FocusEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { IInputProps } from '../../utils/types';

interface IPasswordInputProps extends IInputProps {
    placeholder?: string
}

export const PasswordInput: FC<IPasswordInputProps> = ({ value, onChange, name, placeholder, size = 'default' }) => {
    const [fieldDisabled, setDisabled] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setDisabled(false);
        setVisible(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const validateField = (value: string) => {
        setError(value.length < 6);
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            validateField(e.target.value);
        } else {
            setError(false);
        }
        setDisabled(true);
        setVisible(false);
    };

    return (
        <Input
            type={visible ? 'text' : 'password'}
            placeholder={placeholder}
            onChange={onChange}
            icon={visible ? 'CloseIcon' : 'EditIcon'}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            error={error}
            onIconClick={onIconClick}
            errorText={'Некорректный пароль'}
            size={size}
            disabled={fieldDisabled}
        />
    );
};