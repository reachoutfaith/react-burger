import React, { useState, useEffect, useCallback, FC, ChangeEvent } from 'react';
import style from '../../pages/profile.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import {
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    GET_USER_SUCCESS
} from '../../services/constants/user'
import { refreshTokenThunk } from '../../services/actions/user'
import { getUserInfo, updateUser } from '../../services/API';
import { useHistory } from 'react-router-dom';
import { PasswordInput } from '../custom/input/password-input';
import { EmailInput } from '../custom/input/email-input';
import { NameInput } from '../custom/input/name-input';
import { TGetUserInfo, TUpdateUserInfo, TUser } from '../utils/types';

type TProfileForm = {
    name: string;
    email: string;
    password: string
}

const UserSettings: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.profile.user) as TUser;
    const [prevState, setPrevState] = useState<TUpdateUserInfo | {}>({})
    const [form, setForm] = useState<TProfileForm>({ name: user.name, email: user.email, password: 'qazswx' });
    const history = useHistory();
    const hasError = useSelector((store) => store.profile.updateUserSuccess);
    const error = useSelector((store) => store.profile.errorMessage);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    useEffect(() => {
        uploadUserInfo();
        setForm({ name: user.name, email: user.email, password: 'qazswx' })
    }, [user, history])

    const uploadUserInfo = async () => {
        if (!user || Object.keys(user).length <= 0) {
            const getUserRequest: TGetUserInfo = await getUserInfo();

            if (getUserRequest.success === false) {
                dispatch(refreshTokenThunk());
            } else {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: getUserRequest.user
                })

                if (Object.keys(prevState).length <= 0) {
                    setPrevState(getUserRequest.user)
                }
            }
        }
    }


    const updateUserInfo = useCallback(

        async (form, user) => {
            setPrevState({ ...user })


            const updateUserRequest: TGetUserInfo = await updateUser(form);

            if (updateUserRequest.success === true) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: updateUserRequest.user
                });

            } else {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    errorMessage: updateUserRequest.message
                })
            }

        }, [form, user]
    );

    const cancelUserChanges = useCallback(
        async (prevState) => {
            const updateUserRequest: TGetUserInfo = await updateUser(prevState);

            if (updateUserRequest.success === true) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: updateUserRequest.user
                });

            } else {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    errorMessage: updateUserRequest.message
                })
            }

        }, [form]
    );

    return (

        <div className={`ml-15 ${style.window}`}>
            {!hasError && error && <span className={`mt-4 mb-4 text text_type_main-default ${style.error}`}>{error}</span>}
            <div className="mb-6">
                <NameInput placeholder='Имя' onChange={onChange} value={form.name} name={'name'} />
            </div>
            <div className="mb-6">
                <EmailInput onChange={onChange} value={form.email} name={'email'} />
            </div>
            <div className="mb-6">
                <PasswordInput placeholder='Пароль' onChange={onChange} value={form.password} name={'password'} />
            </div>
            <div className={`mt-6 ${style.buttons}`}>
                <div className="ml-2">
                    <Button type="secondary" size="medium" onClick={() => cancelUserChanges(prevState)}>
                        Отмена
                    </Button>
                </div>
                <div className="ml-2">
                    <Button type="primary" size="medium" onClick={() => updateUserInfo(form, user)}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>

    )
}



export default UserSettings;