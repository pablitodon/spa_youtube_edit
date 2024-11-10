/* eslint-disable no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Input } from 'antd';
import { useAppDispatch } from '../../redux/store';
import styles from './styles.module.css'
import { fetchUserLoginPost } from '../../redux/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Ilogin } from '../../interfaces';
// if (data) {
//     if (!localStorage.getItem(`${data.email}`)) {
//         localStorage.setItem(`${data.email}`, JSON.stringify([]));
//     }
//     localStorage.setItem('user', `${data.email}`);
//     const userData = localStorage.getItem(`${data.email}`);
//     dispatch(allStartResponse(JSON.parse(userData || '[]')));
//     dispatch(fetchLoginPost(data));
// }


const validSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
})


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('myToken');

    useEffect(() => {
        if (token) {
            navigate('/main')
        }
    }, [token]);

    const { handleSubmit, control, formState: { errors } } = useForm<Ilogin>({
        resolver: yupResolver(validSchema),
    });

    const onSubmit = (data: Ilogin) => {
        if (data) {
            console.log(data);
            dispatch(fetchUserLoginPost(data));
        }
    };

    return (
        <Card title="Login" className={styles.login__card}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Email"
                            type="email"
                            status={errors.email ? 'error' : ''}
                        />
                    )}
                />
                {errors.email && <p className={styles.error__message}>{errors.email.message}</p>}
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input.Password
                            {...field}
                            placeholder="Password"
                        />
                    )}
                />
                {errors.password && <p className={styles.error__message}>{errors.password.message}</p>}
                <Button type="primary" htmlType="submit" className={styles.login__button}> Login</Button>
            </form>
        </Card >
    );
};

export default Login;

