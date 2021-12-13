import React, { useState, useCallback, FC, ChangeEvent } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { resetPasswordRequest } from '../services/API';
import style from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { EmailInput } from '../components/custom/input/email-input';
import { Location } from "history";
import { IFetchResponse } from '../components/utils/types'

type TEmail = {
    email: string
}

const ForgotPasswordPage: FC = () => {
    const [form, setValue] = useState<TEmail>({ email: '' });
    const history = useHistory();
    const location = useLocation<{ from?: Location<{} | null | undefined> }>();
    const [isReset, setIsReset] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const isAuthenticated = useSelector((store: any) => store.profile.isAuthenticated);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ email: e.target.value });
    };

    const resetPassword = useCallback(
        async (e) => {
            e.preventDefault();
            const data: IFetchResponse<JSON> = await resetPasswordRequest(form);

            if (data.success === true) {
                setIsReset(true);
                history.push('/reset-password', { resetPasswordRequest: true })
            } else {
                setIsReset(false);
                setError(data.message);
                setHasError(true);
            }
        }, []
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