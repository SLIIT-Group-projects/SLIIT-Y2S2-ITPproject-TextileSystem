import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import '../assets/styles/productCarousel.css'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="product-carousel-container">
      <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <div className="carousel-item-content">
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.product_name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2 className='text-white text-center'>
                    {product.product_name} (Rs. {product.unit_price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
