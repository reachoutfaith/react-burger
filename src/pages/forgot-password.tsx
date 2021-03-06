import React, { useState, useCallback, FC, ChangeEvent } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { resetPasswordRequest } from '../services/API';
import style from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmailInput } from '../components/custom/input/email-input';
import { Location } from "history";
import { TFetchResponse, TInputFormValues } from '../components/utils/types';
import { useSelector } from '../services/hooks';

type TEmail = Omit<TInputFormValues, "name" | "password">

const ForgotPasswordPage: FC = () => {
    const [form, setValue] = useState<TEmail>({ email: '' });
    const history = useHistory();
    const location = useLocation<{ from?: Location<{} | null | undefined> }>();
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>('');
    const isAuthenticated = useSelector((store) => store.profile.isAuthenticated);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ email: e.target.value });
    };

    const resetPassword = useCallback(
        async (e) => {
            e.preventDefault();
            const resetPassword: TFetchResponse = await resetPasswordRequest(form);

            if (resetPassword.success === true) {
                history.push('/reset-password', { resetPasswordRequest: true })
            } else {
                setError(resetPassword.message);
                setHasError(true);
            }
        }, [form, history]
    )

    const login = useCallback(() => {
        history.replace({ pathname: '/login' })
    }, [history]);


    if (isAuthenticated) {
        return <Redirect to={location.state?.from || '/'} />;
    }

    return (
        <>
            <div className={`${style.wrapper}`} >
                <h1 className={`text text_type_main-medium mb-6 ${style.title}`}>Восстановление пароля</h1>
                {hasError && <span className={`mt-4 mb-4 text text_type_main-default ${style.error}`}>{error}</span>}
                <form action="" className={`${style.form}`} onSubmit={resetPassword}>
                    <div className="mb-6">
                        <EmailInput onChange={onChange} value={form.email} name={'email'} />
                    </div>
                    <div className="mb-20">
                        <Button type="primary" size="medium" >Восстановить</Button>
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
        </>
    )


}

export default ForgotPasswordPage;