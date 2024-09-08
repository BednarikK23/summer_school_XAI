import { SubmitHandler, useForm } from "react-hook-form";
import { TourCreate } from "../../../models/tours";
import { useTourCreate } from "../../../hooks/useTours";
import Button from "../../buttons/Button";
import { useState } from "react";
import "../formStyles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEditTourSchema } from "../../../validation-schemas/tour/schemas";
import SelectRegion from "../../selectInput/SelectInput";
import SelectInput from "../../selectInput/SelectInput";
import { regions, tourStatus } from "../../../data/data";
import TextInput from "../../textInput/TextInput";

interface CreateTourFormProps {
    label: string;
  }

const AdminCreateTourForm = ({ label }: CreateTourFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TourCreate>({
        resolver: zodResolver(createEditTourSchema)
    });
    const { mutateAsync: createTour } = useTourCreate();
    const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

    const createHandler: SubmitHandler<TourCreate> = (values: TourCreate) => {
        try {
            createTour.mutate({...values})
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
                        <h1 className="form-container__header">Create Tour</h1>
                        <form onSubmit={handleSubmit(createHandler)} className="form-content">
                            <TextInput name='name' label='Tour Name' register={register} errorMessage={errors.name?.message}/>
                            <SelectInput label="location" name="location" register={register} errorMessage={errors.location?.message} options={regions} />
                            <TextInput name='address' label='Address' register={register} errorMessage={errors.address?.message}/>
                            <SelectInput label="Status" name="status" register={register} errorMessage={errors.status?.message} options={tourStatus} />
                            <TextInput name='time' label='Time' type="date" register={register} errorMessage={errors.time?.message}/>
                            <div className="form-input-container">
                                <label>Description</label>
                                <textarea className="form-input-container__input" {...register("description")}/>
                                <span className="form-input-container__error">{errors.description?.message}</span>
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

export default AdminCreateTourForm;