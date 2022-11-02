import { Link, useNavigate } from "react-router-dom";

export default function Home({ orders }) {
  const navigate = useNavigate();
  const ordersByStatus = orders.reduce((tracker, order) => {
    if (tracker[order.status]) {
      tracker[order.status].push(order);
    } else {
      tracker[order.status] = [order];
    }
    return tracker;
  }, {});

  function makeNewOrder(e) {
    e.preventDefault();
    navigate("/orders/new");
  }

  return (
    <div>
      <div className="section-container">
        <div className="section">
          <h5>Open Orders</h5>
          <ul>
            {(ordersByStatus["pending"] || []).map((order) => {
              return (
                <li>
                  <Link to={`/orders/${order.id}`}>
                    <span>#{order.id} - {order.customer}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="section">
          <h5>Completed Orders</h5>
          <ul>
            {(ordersByStatus["complete"] || []).map((order) => {
              return (
                <li>
                  <Link to={`/orders/${order.id}`}>
                    <span>#{order.id} - {order.customer}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="section">
          <h5>Staff Section</h5>
          <button onClick={makeNewOrder}>Create an Order</button>
          <div>
            <Link to="/staff/fulfill">Fulfill Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
