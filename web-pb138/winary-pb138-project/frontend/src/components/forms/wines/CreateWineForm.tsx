import { SubmitHandler, useForm } from "react-hook-form";
import { WineCreate } from "../../../models/wine";
import { useWineCreate } from "../../../hooks/useWines";
import Button from "../../buttons/Button.tsx";
import "../formStyles.css";
import { createEditWineSchema } from "../../../validation-schemas/wine/schemas.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import SelectInput from "../../selectInput/SelectInput.tsx";
import { wineType } from "../../../data/data.ts";
import TextInput from "../../textInput/TextInput.tsx";

interface CreateWineFormProps {
  wineryId?: string;
  label: string;
}

const CreateWineForm = ({ wineryId, label }: CreateWineFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WineCreate>({
    resolver: zodResolver(createEditWineSchema),
  });
  const { mutateAsync: createUser } = useWineCreate();
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const createHandler: SubmitHandler<WineCreate> = (values: WineCreate) => {
    try {
      if (wineryId) {
        values.wineryId = wineryId;
      }
      createUser.mutate(values);
      closeForm();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="form-wrapper">
      <Button onClick={openForm}>{label}</Button>
      {showForm && (
        <>
          <div className="overlay" onClick={closeForm}></div>
          <div className="form-container">
            <h1 className="form-container__header">Create Wine</h1> 
            <form
              className="form-content"
              onSubmit={handleSubmit(createHandler)}
            >
              <TextInput name='name' label='Wine Name' register={register} errorMessage={errors.name?.message}/>
              {!wineryId && (
                <TextInput name='wineryId' label='Winery ID' register={register} errorMessage={errors.wineryId?.message}/>
              )}
              <SelectInput label="Type" name="type" register={register} errorMessage={errors.type?.message} options={wineType} />
              <TextInput name='price' label='Price' register={register} errorMessage={errors.price?.message}/>
              <TextInput name='year' label='Year' register={register} errorMessage={errors.year?.message}/>
              <TextInput name='alcoholPercentage' label='Alcohol Percentage' register={register} errorMessage={errors.alcoholPercentage?.message}/>
              <TextInput name='attribution' label='Attribution' register={register} errorMessage={errors.attribution?.message}/>
              <TextInput name='glycerolGramsPerLiter' label='Glycerol Grams Per Liter' register={register} errorMessage={errors.glycerolGramsPerLiter?.message}/>
              <TextInput name='pH' label='pH' register={register} errorMessage={errors.pH?.message}/>
              <TextInput name='sugarGramsPerLiter' label='Sugar Grams Per Liter' register={register} errorMessage={errors.sugarGramsPerLiter?.message}/>
              <TextInput name='totalAcidityGramsPerLiter' label='Total Acidity Grams Per Liter' register={register} errorMessage={errors.totalAcidityGramsPerLiter?.message}/>
              <div className="form-input-container">
                <label>Description</label>
                <textarea className="form-input-container__input" {...register("description")} />
                <span className="form-input-container__error">{errors.description?.message}</span>
              </div>
              <div className="form-btns">
                <Button
                  type={"button"}
                  onClick={closeForm}
                >
                  Back
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateWineForm;
