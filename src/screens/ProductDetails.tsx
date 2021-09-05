import React, { FC, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { ConnectionState } from '../redux/types/ConnectionTypes';
import { Product } from '../redux/types/CatalogueTypes';
import { Typography, Button } from '@material-ui/core';
import '../styles/css/productDetails.scss';

interface StateProps {
  products: Product[];
  connection: ConnectionState;
}

interface Props extends StateProps {
  // extra props you want to add
}

const ProductDetails: FC<Props> = (props: Props) => {
  const { products } = props;
  const history = useHistory();
  const [product, setProduct] = useState<Product | undefined>();
  const productId = window.location.pathname.split('/')[3];

  // Gets product id from the url and with that, gets the product stored in redux
  useEffect(() => {
    if (product?.id !== productId) {
      const filteredProduct = products.find((elem) => {
        return elem.id === productId;
      });
      setProduct(filteredProduct);
    }
  }, [product]);

  // TODO: revisar que la llamada efectivamente haya tomado lugar

  const goToCallScreen = useCallback(() => {
    history.push('/home/call');
  }, []);

  return (
    <div className="main-container">
      <div className="details-container">
        <Typography className="title" variant="h3">
          Device Details
        </Typography>
        <div className="detail">
          <Typography className="detail-label" variant="h5" gutterBottom>
            Name:
          </Typography>
          <Typography className="detail-body" variant="h6" gutterBottom>
            {product?.name}
          </Typography>
        </div>
        <div className="detail">
          <Typography className="detail-label" variant="h5" gutterBottom>
            Brand:
          </Typography>
          <Typography className="detail-body" variant="h6" gutterBottom>
            {product?.brand}
          </Typography>
        </div>
        <div className="detail">
          <Typography className="detail-label" variant="h5" gutterBottom>
            Color:
          </Typography>
          <Typography className="detail-body" variant="h6" gutterBottom>
            {product?.color}
          </Typography>
        </div>
        <div className="detail">
          <Typography className="detail-label" variant="h5" gutterBottom>
            Screen Inches:
          </Typography>
          <Typography className="detail-body" variant="h6" gutterBottom>
            {product?.inches}
          </Typography>
        </div>
        <div className="detail">
          <Typography className="detail-label" variant="h5" gutterBottom>
            Operative System:
          </Typography>
          <Typography className="detail-body" variant="h6" gutterBottom>
            {product?.os}
          </Typography>
        </div>
        <div className="detail">
          <Typography className="detail-label" variant="h5" gutterBottom>
            Price:
          </Typography>
          <Typography className="detail-body" variant="h6" gutterBottom>
            {product?.price} CLP
          </Typography>
        </div>
        <div className="customer-button-container">
          <Button variant="contained" color="primary" onClick={goToCallScreen}>
            Get Assistance
          </Button>
        </div>
      </div>
      <div className="photo-container">
        <img className="image" src={product?.image} alt="Product" />
      </div>
      <div className="btn-bottom-left">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.go(-1);
          }}>
          Back
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    products: state.catalogue.products,
    connection: state.connection,
  };
};

export default connect(mapStateToProps)(ProductDetails);
