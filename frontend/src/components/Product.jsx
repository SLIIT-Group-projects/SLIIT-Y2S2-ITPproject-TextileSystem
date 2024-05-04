import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/shop-product/${product._id}`}>
        <Card.Img 
          src={product.image} 
          variant='top' 
          style={{ width: '200px', height: '200px' }} // Set a fixed height and width
        />
      </Link>
 
      <Card.Body>
        <Link to={`/shop-product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.product_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>Rs. {product.unit_price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
