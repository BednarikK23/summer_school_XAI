import { SubmitHandler, useForm } from "react-hook-form";
import { useUserDelete, useUserEdit } from "../../../hooks/useUsers";
import { User, UserEdit } from "../../../models/user";
import Button from "../../buttons/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from "jotai";
import { whoAmIAtom } from "../../../state/authAtom";
import { createEditUserSchema } from "../../../validation-schemas/user/schemas";
import { useState } from "react";
import "../formStyles.css";
import TextInput from "../../textInput/TextInput";

type ChangeUserProps = {
    user?: User;
    label: string;
};

const ChangeUserDialog = (props: ChangeUserProps) => {
    const [ loggedUser, setLoggedUser] = useAtom(whoAmIAtom);

    const { mutateAsync: editUser } = useUserEdit(props.user?.id ?? "");
    const { mutateAsync: deleteUser } = useUserDelete(props.user?.id ?? "");

    const { register, handleSubmit, formState: { errors }} = useForm<UserEdit>({
        defaultValues: props.user!,
        resolver: zodResolver(createEditUserSchema)
    });

    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };
    
    const handleDelete = async () => {
        try {
            deleteUser.mutate();
            setLoggedUser(null);
            closeForm();
        } catch (e) {
            console.error(e);
        }
    }

    const handleEdit: SubmitHandler<UserEdit> = (values: UserEdit) => {
        try {
            editUser.mutate(values);
            setLoggedUser(loggedUser);
            closeForm();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="form-wrapper">
            <Button onClick={openForm}>{props.label}</Button>
            {showForm && (
                <>
                    <div className="overlay" onClick={closeForm}></div>
                    <div className="form-container">
                        <h1 className="form-container__header">Edit User</h1>
                        <form className="form-content" onSubmit={handleSubmit(handleEdit)}>
                            <TextInput name='name' label='Name' register={register} errorMessage={errors.name?.message}/>
                            <TextInput name='email' label='Email' register={register} errorMessage={errors.email?.message}/>
                            <TextInput name='password' label='Password' register={register} errorMessage={errors.password?.message}/>
                            {loggedUser?.isAdmin && (
                                <div className="form-input-container">
                                    <label>Is admin</label>
                                    <input className="form-input-container__input--checkbox" type="checkbox" {...register("isAdmin")} />
                                    <span className="form-input-container__error">{errors.isAdmin?.message}</span>
                                </div>
                            )}
                            <div className="form-btns">
                                <Button type="button" onClick={closeForm}>Back</Button>
                                <Button type="button" onClick={handleDelete}>Delete User</Button>
                                <Button type="submit">Edit User</Button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChangeUserDialog;
