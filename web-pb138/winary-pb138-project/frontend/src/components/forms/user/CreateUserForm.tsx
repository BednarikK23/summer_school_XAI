import { SubmitHandler, useForm } from "react-hook-form";
import { UserCreate } from "../../../models/user";
import { useUserCreate } from "../../../hooks/useUsers";
import Button from "../../buttons/Button";
import { useState } from "react";
import "../formStyles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEditUserSchema } from "../../../validation-schemas/user/schemas";
import TextInput from "../../textInput/TextInput";

interface CreateUserFormProps {
    wineryId?: string;
    label: string;
  }

const CreateUserForm = ({ label }: CreateUserFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserCreate>({
        resolver: zodResolver(createEditUserSchema)
    });
    const { mutateAsync: createUser } = useUserCreate();

    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const createHandler: SubmitHandler<UserCreate> = (values: UserCreate) => {
        try {
            createUser.mutate(values)
            closeForm();
        } catch (e) {
            // console.error(e);
        }
    }

    return (
        <div className="form-wrapper">
        <Button onClick={openForm}>{label}</Button>
        {showForm && (
            <>
                <div className="overlay" onClick={closeForm}></div>
                <div className="form-container">
                    <h1 className="form-container__header">Crete User</h1>
                    <form className="form-content" onSubmit={handleSubmit(createHandler)}>
                        <TextInput name='name' label='User Name' register={register} errorMessage={errors.name?.message}/>
                        <TextInput name='password' label='User Password' register={register} errorMessage={errors.password?.message}/>
                        <TextInput name='email' label='User Email' register={register} errorMessage={errors.email?.message}/>
                        <div className="form-input-container">
                            <label>
                                isAdmin
                                <input type="checkbox" {...register("isAdmin")} />
                            </label>
                        </div>
                        <div className="form-btns">
                            <Button type="button" onClick={closeForm}>Back</Button>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </div>
            </>
        )}
        </div>
    );
};

export default CreateUserForm;