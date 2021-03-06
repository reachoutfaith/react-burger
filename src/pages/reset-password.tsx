import React, { useState, useCallback, FC, ChangeEvent } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { savePasswordThunk } from '../services/actions/user';
import style from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../services/hooks';
import { PasswordInput } from '../components/custom/input/password-input';
import { NameInput } from '../components/custom/input/name-input';
import { Location } from "history";

type TPasswordProps = {
    password: string;
    token: string;
}

interface ILocation {
    resetPasswordRequest?: Location<{} | null | undefined>;
    from?: Location<{} | null | undefined>
}

const ResetPasswordPage: FC = () => {
    const [form, setValue] = useState<TPasswordProps>({ password: '', token: '' });
    const history = useHistory();
    const location = useLocation<ILocation>();
    const dispatch = useDispatch();
    const hasError = useSelector((store) => store.profile.savePasswordFailed);
    const error = useSelector((store) => store.profile.errorMessage);
    const isAuthenticated = useSelector((store) => store.profile.isAuthenticated);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const login = useCallback(() => {
        history.replace({ pathname: '/login' })
    }, [history]);

    const saveNewPassword = useCallback(
        (e) => {
            e.preventDefault();

            dispatch(savePasswordThunk(form));
        }, [dispatch, form]
    )

    if (isAuthenticated) {
        return <Redirect to={location.state?.from || '/'} />;
    }

    if (!location.state?.resetPasswordRequest) {
        return <Redirect to={'/forgot-password'} />
    }

    return (
        <div className={`${style.wrapper}`}>
            <h1 className={`text text_type_main-medium mb-6 ${style.title}`}>Создание нового пароля</h1>
            {hasError && <span className={`mt-4 mb-4 text text_type_main-default ${style.error}`}>{error}</span>}
            <form action="" className={`${style.form}`} onSubmit={saveNewPassword}>
                <div className="mb-6">
                    <PasswordInput placeholder={'Введите новый пароль'} onChange={onChange} value={form.password} name={'password'} />
                </div>
                <div className="mb-6">
                    <NameInput onChange={onChange} value={form.token} name={'token'} placeholder={'Введите код из письма'} />
                </div>
                <div className="mb-20">
                    <Button type="primary" size="medium" >Сохранить</Button>
                </div>
            </form>
            <div className={` ${style.text__wrapper} mb-4`}>
                <span className="text text_type_main-default">Вспомнили пароль?</span>
                <div className="ml-2">
                    <Button type="secondary" size="medium" onClick={login}>
                        Войти
                    </Button>
                </div>
            </div>
        </div >
    )
}


export default ResetPasswordPage;