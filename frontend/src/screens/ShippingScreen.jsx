import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const submitHandler = (e) => {
    e.preventDefault();

    // Validate address so tha it doesn't contain only numbers
    if (/^\d+$/.test(address)) {
      alert('Address must contain letters or alphanumeric characters.');
    } else {
      dispatch(saveShippingAddress(address));
      navigate('/payment');
    }
  };

  

  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='shippingAddress'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address} 
            required
            onChange={(e) => setAddress(e.target.value)} 
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Confirm Shipping Address
        </Button>
       
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
