import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import parts from "./data/parts.json";

import Home from "./components/pages/Home";
import CreateOrder from './components/pages/CreateOrder';
import Order from "./components/pages/Order";
import { useEffect, useState } from 'react';

function App() {

  const [orders, setOrders] = useState([
    { id: 1, status: "pending", customer: "Bob Jenkins", parts: {} }
  ]);
  const [inventory, setInventory] = useState(parts);
  const [lastOrderId, setOrderId] = useState(2);


  // Callback function to create an order with order details
  function createOrder(order) {
    order.id = lastOrderId;
    order.status = "pending";
    setOrders([...orders, order])
  }

  // Callback function to update an existing order given an ID and order details
  function updateOrder(id, nextDetails) {
    const orderToUpdate = orders.find(order => order.id === Number(id));
    Object.keys(nextDetails).forEach(key => orderToUpdate[key] = nextDetails[key]);
    setOrders([...orders]);
  }

  function deleteOrder(id) {
    const targetIndex = orders.findIndex(order => order.id === Number(id));
    if(targetIndex >= 0) {
      orders.splice(targetIndex, 1);
      setOrders([...orders])
    }
    else {
      alert("We couldn't find this order");
    }
  }

  useEffect(() => {
    if(orders.length >= lastOrderId) {
      setOrderId(lastOrderId + 1);
    }
  }, [orders])

  return (
    <div className="App">
      <h2>The Computah Shop</h2>
      <Router>
        <Routes>
          <Route path="/" element={<Home orders={orders} />} />
          <Route path="/orders/new" element={<CreateOrder inventory={inventory} createOrder={createOrder} />} />
          <Route path="/orders/:id" element={<Order orders={orders} inventory={inventory} updateOrder={updateOrder} deleteOrder={deleteOrder} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
