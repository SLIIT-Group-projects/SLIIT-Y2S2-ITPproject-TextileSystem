  import React, { useEffect, useRef } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
  import { useDispatch, useSelector } from 'react-redux';
  import Message from '../components/Message';
  import CheckoutSteps from '../components/CheckoutSteps';
  import Loader from '../components/Loader';
  import { useCreateOrderMutation } from '../slices/ordersApiSlice';
  import { clearCartItems } from '../slices/cartSlice';
  import {useReactToPrint} from "react-to-print"


  const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
      if (!cart.shippingAddress) {
        navigate('/shipping');
      } else if (!cart.paymentMethod) {
        navigate('/payment');
      }
    }, [cart.paymentMethod, cart.shippingAddress, navigate]);

    const placeOrderHandler = async () => {
      try {
        console.log('Cart:', cart); // Log the cart object to see if it has the required data
        const res = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          totalWeight: cart.totalWeight,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();
        console.log('Order response:', res); // Log the response from the createOrder mutation
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      } catch (err) {
        console.error('Error placing order:', err); // Log any errors that occur
        toast.error(err);
      }
    };
    

    const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: ()=> ComponentsRef.current,
    DocumentTitle:"My Order",
    onafterprint:()=>alert("View your order before confirm")
  })

    return (
      <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                 {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.product_name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.product_name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            Rs. {item.unit_price} x {item.qty}  = 
                            Rs. {(item.qty * (item.unit_price * 100)) / 100}
                          </Col>
                          <Col md={4}>
                            {item.weight}g x {item.qty}  = 
                            {(item.qty * (item.weight * 100)) / 100}g
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup  variant='flush'>
              <div ref={ComponentsRef}>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>Rs. {cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>Rs. {cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>Rs. {cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </div>
                <ListGroup.Item>
                  {error && (
                    <Message variant='danger'>{error.data.message}</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item> 
                <div className='d-flex gap-3'>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                  <Button onClick={handlePrint} type='submit'>
                  Save My Order In My Device
                </Button>
                </div>
                  {isLoading && <Loader />}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  export default PlaceOrderScreen;
