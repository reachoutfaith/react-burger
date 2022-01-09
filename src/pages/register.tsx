import React, { useState, useCallback, FC, ChangeEvent } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { createUserThunk } from '../services/actions/user';
import style from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../services/hooks';
import { PasswordInput } from '../components/custom/input/password-input';
import { EmailInput } from '../components/custom/input/email-input';
import { NameInput } from '../components/custom/input/name-input';
import { Location } from "history";
import { TInputFormValues } from '../components/utils/types'

const RegisterPage: FC = () => {
    const [form, setValue] = useState<TInputFormValues>({ email: '', password: '', name: '' });
    const location = useLocation<{ from?: Location<{} | null | undefined> }>();
    const history = useHistory();
    const dispatch = useDispatch();
    const hasError = useSelector((store) => store.profile.createUserFailed);
    const error = useSelector((store) => store.profile.errorMessage);
    const isAuthenticated = useSelector((store) => store.profile.isAuthenticated);


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const login = useCallback(() => {
        history.replace({ pathname: '/login' })
    }, [history]);

    const createUser = useCallback(
        (e) => {
            e.preventDefault();
            console.log('form register ', form)
            dispatch(createUserThunk(form))
        }, [form, dispatch]
    );

    if (isAuthenticated) {
        return <Redirect to={location.state?.from || '/'} />;
    }


    return (
        <div className={`${style.wrapper}`}>
            <h1 className={`text text_type_main-medium mb-6 ${style.title}`}>Регистрация</h1>
            {hasError && <span className={`mt-4 mb-4 text text_type_main-default ${style.error}`}>{error}</span>}
            <form action="" className={`${style.form}`} onSubmit={createUser}>
                <div className="mb-6">
                    <NameInput onChange={onChange} value={form.name} name={'name'} placeholder='Имя' />
                </div>
                <div className="mb-6">
                    <EmailInput onChange={onChange} value={form.email} name={'email'} />
                </div>
                <div className="mb-6">
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} placeholder='Пароль' />
                </div>
                <div className="mb-20">
                    <Button type="primary" size="medium" >Зарегистрироваться</Button>
                </div>
            </form>
            <div className={` ${style.text__wrapper} mb-4`}>
                <span className="text text_type_main-default">Уже зарегистрированы?</span>
                <div className="ml-2">
                    <Button type="secondary" size="medium" onClick={login}>
                        Войти
                    </Button>
                </div>

            </div>
        </div >
    )
}

export default RegisterPage;