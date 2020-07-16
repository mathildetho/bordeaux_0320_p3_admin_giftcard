import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Table, Container, Col, Row } from 'react-bootstrap';

// import components
import OrdersList from './OrdersList';
// import AddOrder from './AddOrder';
// import data

// import style
import '../styles.css';
import './orders.css';

function Orders() {
  const { history } = useHistory();
  // CRUD

  // GET all customers
  const [orders, setOrders] = useState([]);
  // const [allOrdersByCustomer, setAllOrdersByCustomer] = useState([]);

  const getAllOrders = () => {
    Axios({
      method: 'get',
      // url: 'http://givyoo.fr/api/clients',
      url: 'http://localhost:5000/api/orders',
    }).then((response) => setOrders(response.data));
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  // POST an order

  // PUT an order
  const updateOrder = (id) => {
    Axios.put(`http://localhost:5000/api/orders/${id}`, orders).then(
      (response) => response.status === 200 && history.push('/admin/orders')
    );
  };
  // DELETE an order
  const deleteOrder = (id) => {
    Axios.delete(`http://localhost:5000/api/orders/${id}`, orders)
      .then((response) => response.status === 200 && orders)
      .finally(() => {
        getAllOrders();
      });
  };
  return (
    <Container>
      <Row>
        {/* <Col><AddOrder /></Col> */}
        <Col>
          <Table responsive="sm">
            <OrdersList
              orders={orders}
              deleteOrder={deleteOrder}
              updateOrder={updateOrder}
            />
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;
