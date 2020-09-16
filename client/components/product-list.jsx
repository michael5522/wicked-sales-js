import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data =>
        this.setState({
          products: data
        })
      )
      .catch(error => {
        console.error('fetch not working in api/product', error);
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (

      <div className="container">
        <div className="row">
          {
            this.state.products.map(product => {
              return <ProductListItem key={product.productId} product={product} />;
            })
          }
        </div>

      </div>
    );
  }

}

export default ProductList;
