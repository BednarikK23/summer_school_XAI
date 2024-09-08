import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import './loginForm.css';
import { useState } from 'react';
import { useLogin } from '../../../hooks/useAuth';
import { loginUser } from '../../../models/user';
import Button from '../../buttons/Button';
import { loginSchema } from '../../../validation-schemas/user/schemas';

const LoginForm = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<loginUser>({
        resolver: zodResolver(loginSchema)
    });
    const navigate = useNavigate();
    const { mutateAsync: loginUser } = useLogin();
    const [ invalidLogin, setInvalidLogin ] = useState(false);

    const submitHandler: SubmitHandler<loginUser> = async (values: loginUser) => {
        try {
            await loginUser.mutateAsync(values);
            setInvalidLogin(false);
            navigate('/');
        } catch(e) {
            setInvalidLogin(true);
            // console.log(e);
        }
    };

    return (
        <div className="login-container">
            <form className="loginForm" onSubmit={handleSubmit(submitHandler)}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" {...register('email')}/>
                    <span>{errors.email?.message}</span>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="**********" {...register('password')}/>
                    <span>{errors.password?.message}</span>
                </div>
                {invalidLogin && <span>Email or password does not exist.</span>}
                <Button type="submit">Login</Button>
                <div onClick={() => navigate("/auth/register")}>
                    Don't have an account yet?
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
