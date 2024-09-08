import { SubmitHandler, useForm } from "react-hook-form";
import { useTourDelete, useTourEdit } from "../../../hooks/useTours";
import { Tour, TourEdit } from "../../../models/tours";
import Button from "../../buttons/Button";
import { useState } from "react";
import "../formStyles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEditTourSchema } from "../../../validation-schemas/tour/schemas";
import SelectRegion from "../../selectInput/SelectInput";
import { orderStatus, regions } from "../../../data/data";
import SelectInput from "../../selectInput/SelectInput";
import TextInput from "../../textInput/TextInput";

type ChangeTourProps = {
    tour: Tour;
    label: string;
};

const AdminChangeTourForm = ({ tour, label }: ChangeTourProps) => {
    const { mutateAsync: editTour } = useTourEdit(tour.id);
    const { mutateAsync: deleteTour } = useTourDelete(tour.id);

    const [showForm, setShowForm] = useState(false);

    const openForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<TourEdit>({
        defaultValues: tour,
        resolver: zodResolver(createEditTourSchema)
    });
    
    const handleDelete = () => {
        try {
            deleteTour.mutate();
            closeForm();
        } catch (e) {
            console.error(e);
        }
    }

    const handleEdit: SubmitHandler<TourEdit> = (values: TourEdit) => {
        try {
            editTour.mutate({...values});
            closeForm();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="form-wrapper">
            <Button onClick={openForm}>{label}</Button>
            {showForm && (
                <>
                    <div className="overlay" onClick={closeForm}></div>
                    <div className="form-container">
                        <h1 className="form-container__header">Edit Tour</h1>
                        <form className="form-content" onSubmit={handleSubmit(handleEdit)}>
                            <TextInput name='name' label='Edit Tour name' register={register} errorMessage={errors.name?.message}/>
                            <SelectInput label="Edit Tour Location" name="location" register={register} errorMessage={errors.location?.message} options={regions} />
                            <TextInput name='address' label='Edit Tour Address' register={register} errorMessage={errors.address?.message}/>
                            <TextInput name='time' label='Edit Tour Time' register={register} errorMessage={errors.time?.message} type="date"/>
                            <SelectInput label="Edit Tour Status" name="status" register={register} errorMessage={errors.status?.message} options={orderStatus} />
                            <div className="form-input-container">
                                <label>Edit Tour Description</label>
                                <textarea className="form-input-container__input" {...register("description")} />
                                <span className="form-input-container__error">{errors.description?.message}</span>
                            </div>
                            <div className="form-btns">
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

export default AdminChangeTourForm;