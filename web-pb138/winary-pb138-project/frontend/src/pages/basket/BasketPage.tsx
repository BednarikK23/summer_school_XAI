import { useState, useEffect } from 'react';
import BasketItem from '../../components/basketItem/basketItem.tsx';
import OrderSummary from '../../components/orderSummary/orderSummary.tsx';
import Button from '../../components/buttons/Button.tsx';
import useBasketItems from '../../hooks/useOrderData.ts';
import { useNavigate } from 'react-router-dom';
import './basketPage.css';

const BasketPage = () => {
    const { orderData, updateOrderData, resetData } = useBasketItems();
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const updateTotal = () => {
            const total = orderData.products?.reduce((acc, item) => acc + (parseInt(item.wine.price) * item.quantity), 0);
            setTotal(total ?? 0);
        };

        updateTotal();
    }, [orderData.products]);

    const handleIncrease = (id: string) => {
        const index = orderData.products?.findIndex(item => item.wine.id === id);
        const products = [...orderData?.products || []];
        products[index!].quantity += 1;
        updateOrderData({ ...orderData, products: products });
    };

    const handleDecrease = (id: string) => {
        const index = orderData.products?.findIndex(item => item.wine.id === id);
        const products = [...orderData?.products || []];
        products[index!].quantity -= 1;
        if (products[index!].quantity === 0) {
            handleRemove(id);
            return;
        }
        updateOrderData({ ...orderData, products: products });
    };

    const handleRemove = (id: string) => {
        const products = [...orderData?.products || []];
        const newProducts = products.filter(item => item.wine.id !== id);
        updateOrderData({ ...orderData, products: newProducts });
    };

    const handleCreateOrder = () => {
        let totalAmount = 0;
        orderData.products?.forEach(item => {
            totalAmount += item.quantity;
        })
        updateOrderData({ ...orderData, totalAmount: totalAmount })
        navigate("/order")
    };

    return (
        <>
            {(orderData.products.length > 0) && (<div className="basket-page">
                {orderData.products?.map(item => (
                    <BasketItem
                        key={item.wine.id}
                        name={item.wine.name}
                        description={item.wine.description}
                        imageUrl={"../../../public/wineDefault.webp"}
                        price={parseInt(item.wine.price)}
                        quantity={item.quantity}
                        onIncrease={() => handleIncrease(item.wine.id)}
                        onDecrease={() => handleDecrease(item.wine.id)}
                        onRemove={() => handleRemove(item.wine.id)}
                    />
                ))}
                <OrderSummary itemsTotal={total} deliveryCharge={20} />
                <div className="actions">
                    <Button type="button" onClick={() => resetData()}>Empty basket</Button>
                    <Button type="button" onClick={() => navigate('/wines')}>Continue Shopping</Button>
                    <Button type="button" onClick={() => handleCreateOrder()}>Proceed to Checkout</Button>
                </div>
            </div>)}

            {(orderData.products.length == 0) &&
                <div className="basket-page">
                    <p>Košík je zatím prázdný. </p>
                    <Button type="button" onClick={() => navigate('/wines')}>Continue Shopping</Button>
                </div >}


        </>
    );
};

export default BasketPage;
