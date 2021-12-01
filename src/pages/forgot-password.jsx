import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { resetPasswordRequest } from '../services/API';
import style from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { EmailInput } from '../components/custom/input/email-input';
import PropTypes from 'prop-types';

const ForgotPasswordPage = () => {
    const [form, setValue] = useState({ email: '' });
    const history = useHistory();
    const location = useLocation();
    const [isReset, setIsReset] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const isAuthenticated = useSelector(store => store.profile.isAuthenticated);

    const onChange = e => {
        setValue({ email: e.target.value });
    };

    const resetPassword = useCallback(
        async (e) => {
            e.preventDefault();
            const data = await resetPasswordRequest(form);

            if (data.success === true) {

                setIsReset(true);
                history.push({ pathname: '/reset-password' })
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
            <div className={`${style.wrapper}`} onSubmit={resetPassword}>
                <h1 className={`text text_type_main-medium mb-6 ${style.title}`}>Восстановление пароля</h1>
                {hasError && <span className={`mt-4 mb-4 text text_type_main-default ${style.error}`}>{error}</span>}
                <form action="" className={`${style.form}`}>
                    <div className="mb-6">
                        <EmailInput onChange={onChange} value={form.email} name={'email'} />
                    </div>
                    <div className="mb-20">
                        <Button className={`${style.button}`} type="primary" size="medium" >Восстановить</Button>
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

ForgotPasswordPage.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default ForgotPasswordPage;