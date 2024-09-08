import { SubmitHandler, useForm } from "react-hook-form";
import { Order, OrderEdit } from "../../../models/order";
import { useOrderDelete, useOrderEdit } from "../../../hooks/useOrder";
import Button from "../../buttons/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { editOrderSchema } from "../../../validation-schemas/order/schemas";
import { useAtom } from "jotai";
import { whoAmIAtom } from "../../../state/authAtom";
import { useState } from "react";
import "../formStyles.css";
import SelectInput from "../../selectInput/SelectInput";
import { orderStatus } from "../../../data/data";
import TextInput from "../../textInput/TextInput";

type ChangeOrderProps = {
  order: Order;
  label: string;
};

const EditOrderForm = ({ order, label }: ChangeOrderProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderEdit>({
    defaultValues: order,
    resolver: zodResolver(editOrderSchema)
  });
  const [loggedUser] = useAtom(whoAmIAtom);

  const { mutateAsync: editOrder } = useOrderEdit(order.id);
  const { mutateAsync: deleteOrder } = useOrderDelete(order.id);

  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleDelete = async () => {
    try {
      deleteOrder.mutate();
      closeForm();
    } catch (e) {
      // console.error(e);
    }
  };

  const handleEdit: SubmitHandler<OrderEdit> = (values: OrderEdit) => {
    try {
      editOrder.mutate({
        ...values,
      });
      closeForm();
    } catch (e) {
      // console.error(e);
    }
  };

  return (
    <div className="form-wrapper">
      <Button onClick={openForm}>{label}</Button>
      {showForm && (
        <>
          <div className="overlay" onClick={closeForm}></div>
          <div className="form-container">
            <h1 className="form-container__header">Edit Order</h1>  
            <form className="form-content" onSubmit={handleSubmit(handleEdit)}>
              <SelectInput label="Status" name="status" register={register} errorMessage={errors.status?.message} options={orderStatus} />
              <TextInput name='pickupDateFrom' label='Pickup Date From' type="date" register={register} errorMessage={errors.pickupDateFrom?.message}/>
              <TextInput name='pickupDateTo' label='Pickup Date To' type="date" register={register} errorMessage={errors.pickupDateTo?.message}/>
              <div className="form-btns">
                <Button onClick={closeForm}>Back</Button>
                {(loggedUser && loggedUser.isAdmin) && <Button onClick={handleDelete}>Delete Order</Button>}
                <Button type="submit">Edit</Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditOrderForm;
