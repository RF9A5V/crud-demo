import { useNavigate } from "react-router-dom";

import OrderForm from "../common/OrderForm";

export default function CreateOrder({ inventory, createOrder }) {
    // We include useNavigate in order to redirect back to the home page
    // once we're able to create an order.
    const navigate = useNavigate();

    // Callback function for when we submit a form to create an order and go back to the homepage
    function onSubmit(orderDetails) {
        createOrder(orderDetails);
        navigate("/");
    }

    return (
        <OrderForm inventory={inventory} orderAction={onSubmit} />
    )
}