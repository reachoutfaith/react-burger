import React, { useCallback, useState, FC, ChangeEvent } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import style from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../services/actions/user';
import { PasswordInput } from '../components/custom/input/password-input';
import { EmailInput } from '../components/custom/input/email-input';
import { Location } from "history";
import { TInputFormValues } from '../components/utils/types';

type TLoginForm = Omit<TInputFormValues, "name">

const LoginPage: FC = () => {
    const [form, setValue] = useState<TLoginForm>({ email: '', password: '' });
    const history = useHistory();
    const location = useLocation<{ from?: Location<{} | null | undefined> }>();
    const dispatch = useDispatch();
    const hasError = useSelector((store: any) => store.profile.loginUserFailed);
    const error = useSelector((store: any) => store.profile.errorMessage);
    const isAuthenticated = useSelector((store: any) => store.profile.isAuthenticated);


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const register = useCallback(() => {
        history.replace({ pathname: '/register' })
    }, [history]);

    const forgotPassword = useCallback(() => {
        history.replace({ pathname: '/forgot-password' })
    }, [history]);

    const login = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(loginUserThunk(form));
        }, [form, dispatch]
    )


    if (isAuthenticated) {
        return <Redirect to={location.state?.from || '/'} />;
    }


    return (
        <div className={`${style.wrapper}`}>
            <h1 className={`text text_type_main-medium mb-6 ${style.title}`}>Вход</h1>
            {hasError && <span className={`mt-4 mb-4 text text_type_main-default ${style.error}`}>{error}</span>}
            <form action="" className={`${style.form}`} onSubmit={login}>
                <div className="mb-6">
                    <EmailInput onChange={onChange} value={form.email} name={'email'} />
                </div>
                <div className="mb-6">
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} placeholder='Пароль' />
                </div>
                <div className="mb-20">
                    <Button type="primary" size="medium" >Войти</Button>
                </div>
            </form>
            <div className={` ${style.text__wrapper} mb-4`}>
                <span className="text text_type_main-default">Вы - новый пользователь?</span>
                <div className="ml-2">
                    <Button type="secondary" size="medium" onClick={register}>
                        Зарегистрироваться?
                    </Button>
                </div>

            </div>
            <div className={` ${style.text__wrapper}`}>
                <span className="text text_type_main-default">Забыли пароль?</span>
                <div className="ml-2">
                    <Button type="secondary" size="medium" onClick={forgotPassword}>
                        Восстановить пароль
                    </Button>
                </div>

            </div>
        </div >
    )
}


export default LoginPage;