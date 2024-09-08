import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../buttons/Button';
import { Winery, WineryEdit } from '../../../models/winery';
import { useWineryDelete, useWineryEdit } from '../../../hooks/useWineries';
import { createEditWinerySchema } from '../../../validation-schemas/winery/schemas';
import "../formStyles.css";
import { useState } from 'react';
import { regions } from '../../../data/data';
import SelectInput from '../../selectInput/SelectInput';
import TextInput from '../../textInput/TextInput';

interface EditWineryFormProps {
    winery: Winery;
    label: string;
}

const EditWineryForm = ({winery, label}: EditWineryFormProps) => {
    const { handleSubmit, register, formState: { errors } } = useForm<WineryEdit>({
		defaultValues: winery,
        resolver: zodResolver(createEditWinerySchema)
    });
    const { mutateAsync: editWinery } = useWineryEdit(winery.id);
    const { mutateAsync: deleteWinery } = useWineryDelete(winery.id);

    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const handleDelete = async () => {
        try {
            deleteWinery.mutate();
            closeForm();
        } catch (e) {
            console.error(e);
        }
    }

    const submitHandler: SubmitHandler<WineryEdit> = async (values: WineryEdit) => {
        try {
            editWinery.mutate(values);
            closeForm();
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <div className="form-wrapper">
					<Button onClick={openForm}>{label}</Button>
					{showForm && (
						<>
							<div className="overlay" onClick={closeForm}></div>
							<div className="form-container">
								<h1 className="form-container__header">Edit Winery</h1>  
								<form className="form-content" onSubmit={handleSubmit(submitHandler)}>
									<TextInput name='name' label='Name' register={register} errorMessage={errors.name?.message}/>
									<TextInput name='ownerId' label='Owner ID' register={register} errorMessage={errors.ownerId?.message}/>
									<TextInput name='address' label='Address' register={register} errorMessage={errors.address?.message}/>
									<TextInput name='ico' label='IČO' register={register} errorMessage={errors.ico?.message}/>
									<TextInput name='phone' label='Winery phone' register={register} errorMessage={errors.phone?.message}/>
									<TextInput name='email' label='Winery email' register={register} errorMessage={errors.email?.message}/>
									<SelectInput label="Location" name="location" register={register} errorMessage={errors.location?.message} options={regions} />
									<TextInput name='openingTime' label='Opening time' register={register} errorMessage={errors.openingTime?.message}/>
									<TextInput name='closingTime' label='Closing time' register={register} errorMessage={errors.closingTime?.message}/>
									<div className="form-input-container">
										<label>Description</label>
										<textarea className="form-input-container__input" {...register('description')} />
										<span className="form-input-container__error">{errors.description?.message}</span>
									</div>
									<div className='form-btns'>
										<Button type="button" onClick={closeForm}>Back</Button>
										<Button type="button" onClick={handleDelete}>Delete</Button>
										<Button type="submit">Edit</Button>
									</div>
								</form>
							</div>
						</>
					)}
        </div>
    );
};

export default EditWineryForm;