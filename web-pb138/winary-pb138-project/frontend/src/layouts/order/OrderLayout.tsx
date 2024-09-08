import { Outlet, useLocation } from "react-router-dom";
import Stepper from "../../components/stepper/Stepper";
import "../../pages/order/orderLayout.css"

const steps = [
    { label: "Customer Details", path: "customer-details" },
    { label: "Order Overview", path: "overview" },
    { label: "Order Confirmation", path: "confirmation" },
];

const getCurrentStep = (pathname: string) => {
    return steps.findIndex(step => pathname.includes(step.path));
};

const OrderLayout = () => {
    const location = useLocation();
    const currentStep = getCurrentStep(location.pathname);

    return (
        <div className="order-layout">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="order-content">
                <Outlet />
            </div>
        </div>
    );
};

export default OrderLayout;
