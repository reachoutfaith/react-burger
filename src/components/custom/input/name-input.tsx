import React, { useRef, useState, FC } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { IInputProps } from '../../utils/types';

interface INameInputProps extends IInputProps {
    placeholder?: string
}

export const NameInput: FC<INameInputProps> = ({ value, onChange, name, size = 'default', placeholder }) => {
    const [fieldDisabled, setDisabled] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const placeHolder = placeholder || 'Имя';

    const onIconClick = () => {
        setDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = () => {
        setDisabled(true);
    };

    return (
        <Input
            type='text'
            placeholder={placeHolder}
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