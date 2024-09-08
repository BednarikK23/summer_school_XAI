import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './registerForm.css';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../../hooks/useAuth';
import { registerUser } from '../../../models/user';
import Button from '../../buttons/Button';
import { userRegistrationSchema } from '../../../validation-schemas/user/schemas';

const RegisterForm: FC = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<registerUser>({
        resolver: zodResolver(userRegistrationSchema)
    });
    const { mutateAsync: registerUser } = useRegister();
    const navigate = useNavigate();
    const [ invalidRegistration, setInvalidRegistration ] = useState(false);

    const submitHandler: SubmitHandler<registerUser> = async (values: registerUser) => {
        try {
            await registerUser.mutateAsync(values);
            setInvalidRegistration(false);
            navigate('/auth/login');

        } catch (e) {
            setInvalidRegistration(true);
            // console.log(e);
        }
    };

    return (
        <div className="register-container">
            <form className="userRegistrationForm" onSubmit={handleSubmit(submitHandler)}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" {...register('username')} />
                    <span>{errors.username?.message}</span>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" {...register('email')} />
                    <span>{errors.email?.message}</span>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="*********" {...register('password')} />
                    <span>{errors.password?.message}</span>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="*********" {...register('confirmPassword')} />
                    <span>{errors.confirmPassword?.message}</span>
                </div>
                {invalidRegistration && <span>Registration failed.</span>}
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
};

export default RegisterForm;
