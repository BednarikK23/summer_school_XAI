import { SubmitHandler, useForm } from "react-hook-form";
import useOrderData from "../../hooks/useOrderData";
import { useNavigate } from "react-router-dom";
import { CustomerInfo } from "../../models/order";
import "./orderForm.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerInfoSchema } from "../../validation-schemas/order/schemas";
import Button from "../../components/buttons/Button";

const OrderCustomerDetails = () => {
    const { orderData, updateOrderData } = useOrderData();
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerInfo>({
        defaultValues: orderData,
        resolver: zodResolver(customerInfoSchema)
    });
    const navigate = useNavigate();

    const submitHandler: SubmitHandler<CustomerInfo> = (values: CustomerInfo) => {
        updateOrderData({ ...orderData, ...values });
        navigate('../overview', { relative: 'path' });
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)} className="order-form">
                <div className="form-group">
                    <label className="form-group__label">Name and surname</label>
                    <input className="form-group__input" {...register('fullName')} />
                    <span className="form-group__error">{errors.fullName?.message}</span>
                </div>
                <div className="form-group">
                    <label className="form-group__label">Phone number</label>
                    <input className="form-group__input" {...register('phoneNumber')} />
                    <span className="form-group__error">{errors.phoneNumber?.message}</span>
                </div>
                <div className="form-group">
                    <label className="form-group__label">Email</label>
                    <input className="form-group__input" {...register('email')} />
                    <span className="form-group__error">{errors.email?.message}</span>
                </div>
                <div className="form-buttons">
                    <Button type="button" onClick={() => navigate('/basket')}>Back</Button>
                    <Button type="submit">Advance</Button>
                </div>
            </form>
        </>
    );
};

export default OrderCustomerDetails;
