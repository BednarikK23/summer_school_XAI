import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { OrderCreate } from "../../../models/order";
import { useOrderCreate } from "../../../hooks/useOrder";
import { useState } from "react";
import Button from "../../buttons/Button";
import "../formStyles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrderSchema } from "../../../validation-schemas/order/schemas";
import SelectInput from "../../selectInput/SelectInput";
import { orderStatus } from "../../../data/data";
import TextInput from "../../textInput/TextInput";

interface CreateOrderFormProps {
  label: string;
}

const CreateOrderForm = ({ label }: CreateOrderFormProps) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<OrderCreate>({
    resolver: zodResolver(createOrderSchema)
  });
  const { mutateAsync: createOrder } = useOrderCreate();
  const { append, remove, fields } = useFieldArray({ control, name: "items" });

  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const createHandler: SubmitHandler<OrderCreate> = (values: OrderCreate) => {
    let totalPrice = 0;
    values.items.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    try {
      const order = {
        ...values,
        totalAmount: totalPrice,
      };
      createOrder.mutate(order);
      closeForm();
    } catch (e) {
      // console.error(e);
    }
  };

  const handleAdd = () => {
    append({ wineId: "Wine ID", quantity: 0, price: 100 });
  };

  const handledelete = (index: number) => {
    remove(index);
  };

  return (
    <div className="form-wrapper">
      <Button onClick={openForm}>{label}</Button>
      {showForm && (
        <>
          {errors.items?.message}
          <div className="overlay" onClick={closeForm}></div>
          <div className="form-container">
            <h1 className="form-container__header">Create Tour</h1>
            <form className="form-content" onSubmit={handleSubmit(createHandler)}>
              <TextInput name='vinaryId' label='Winery ID' register={register} errorMessage={errors.vinaryId?.message}/>
              <TextInput name='fullName' label='Full name' register={register} errorMessage={errors.fullName?.message}/>
              <TextInput name='email' label='Email' register={register} errorMessage={errors.email?.message}/>
              <TextInput name='phoneNumber' label='Phone Number' register={register} errorMessage={errors.phoneNumber?.message}/>
              <TextInput name='totalAmount' label='Total Amount' register={register} errorMessage={errors.totalAmount?.message}/>
              <TextInput name='pickupDateFrom' label='Pickup Date From' type="date" register={register} errorMessage={errors.pickupDateFrom?.message}/>
              <TextInput name='pickupDateTo' label='Pickup Date To' type="date" register={register} errorMessage={errors.pickupDateTo?.message}/>
              <div className="form-input-container">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="form-input-container"
                  >
                    <input
                      className="form-input-container__input"
                      {...register(`items.${index}.wineId`)}
                    />
                    {errors.items?.[index]?.wineId && (
                      <span className="form-input-container__error">{errors.items[index]!.wineId?.message}</span>
                    )}
                    <input
                      className="form-input-container__input"
                      {...register(`items.${index}.quantity`)}
                    />
                    {errors.items?.[index]?.wineId && (
                      <span className="form-input-container__error">{errors.items[index]!.wineId?.message}</span>
                    )}
                    <input
                      className="form-input-container__input"
                      {...register(`items.${index}.price`)}
                    />
                    {errors.items?.[index]?.wineId?.message && (
                      <span className="form-input-container__error">{errors.items[index]!.wineId?.message}</span>
                    )}
                    <Button onClick={() => handledelete(index)} type="button">Delete</Button>
                  </div>
                ))}
                <Button onClick={handleAdd} type="button">Add</Button>
              </div>
              <SelectInput label="Status" name="status" register={register} errorMessage={errors.status?.message} options={orderStatus} />
              <div className="form-btns">
                <Button type="button" onClick={closeForm}>Back</Button>
                <Button type="submit">Create Tour</Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateOrderForm;
