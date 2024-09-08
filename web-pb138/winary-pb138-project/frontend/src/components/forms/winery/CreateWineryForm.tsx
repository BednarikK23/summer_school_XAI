import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../buttons/Button';
import { WineryCreate } from '../../../models/winery';
import { useAtom } from 'jotai';
import { whoAmIAtom } from '../../../state/authAtom';
import { useWineryCreate } from '../../../hooks/useWineries';
import { createEditWinerySchema } from '../../../validation-schemas/winery/schemas';
import "../formStyles.css";
import SelectInput from '../../selectInput/SelectInput';
import { regions } from '../../../data/data';
import TextInput from '../../textInput/TextInput';

type CreateWineryFormProps = {
    ownerId?: string;
    label: string;
};

const CreateWineryForm = (props: CreateWineryFormProps) => {
    const { handleSubmit, register, formState: { errors } } = useForm<WineryCreate>({
        resolver: zodResolver(createEditWinerySchema)
    });
    const [loggedUser] = useAtom(whoAmIAtom);
    const { mutateAsync: createWinery } = useWineryCreate();

    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const onSubmit: SubmitHandler<WineryCreate> = async (values: WineryCreate) => {
        try {
            if (props.ownerId) {
                values.ownerId = props.ownerId;
            } else {
                values.ownerId = loggedUser ? loggedUser.id! : '';
            }

            await createWinery.mutateAsync(values);
            closeForm();
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <div className="form-wrapper">
					<Button onClick={openForm}>{props.label}</Button>
					{showForm && (
						<>
							<div className="overlay" onClick={closeForm}></div>
							<div className="form-container">
								<h1 className="form-container__header">Create Winery</h1>  
								<form className="form-content" onSubmit={handleSubmit(onSubmit)}>
									<TextInput name='name' label='Name' register={register} errorMessage={errors.name?.message}/>
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
										<Button type="submit">Create</Button>
									</div>
								</form>
							</div>
						</>
					)}
        </div>
    );
};

export default CreateWineryForm;
