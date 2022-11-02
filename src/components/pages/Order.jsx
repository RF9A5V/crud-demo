import { useParams } from "react-router-dom";

import OrderForm from "../common/OrderForm";

export default function Order({ orders, inventory, updateOrder, deleteOrder }) {
  // Pull the order ID from the URL using useParams, the URL should look like
  // /orders/:id, where we replace :id with the actual ID of the order
  // ex. with an order that has an ID of 2, the URL would look like /orders/2
  const { id } = useParams();

  // We get the order from the list of all orders we have in the props
  // by searching for it by the ID we got from the params
  // Note: we have to make the id a Number because by default, when we get
  // a value from useParams, it's gonna be a string
  const foundOrder = orders.find(order => order.id === Number(id));

  // This is the function we'll call inside of OrderForm once we know that
  // all the inputs in the OrderForm are valid. The OrderForm will give us
  // details for the order (through orderDetails) so we know how to update it.
  // We'll get the order to update using the id from the params.
  function onSubmit(orderDetails) {
    updateOrder(id, orderDetails);
  }

  // If we found the order, then we show the details for the order, and the
  // form to update it.
  if(foundOrder) {
    return (
      <div>
        <p>Order #{ foundOrder.id } - { foundOrder.customer }</p>
        <b>Parts:</b>
        <ul>
          { 
            // Go through each part in our order and show the type and the name
            // for each part. Note that because we save just the ID of the part,
            // we have to go through the inventory to find that part, in order
            // to have access to those details.
            Object.values(foundOrder.parts).map(partId => {
              const foundPart = inventory.find(i => i.id === Number(partId));
              return (
                <li>{ foundPart.type } - { foundPart.name }</li>
              )
            }) 
          }
        </ul>
        <button onClick={() => deleteOrder(id)}>Delete Order</button>
        { /* 
        We show the form to update our order, and give it the props it needs,
        including the defaultValues prop, which contains the details of the order
        that already exists. That way we can see those details in the form, and have
        some validation that we're editing the order rather than making a new one.
        */ }
        <OrderForm orderAction={onSubmit} inventory={inventory} defaultValues={{ customer: foundOrder.customer, status: foundOrder.status, ...foundOrder.parts }} />
      </div>
    )
  }
  else {
    // If we don't find the order, we just say we couldn't find it
    return (
      <div>
        Order Not Found
      </div>
    )
  }
}