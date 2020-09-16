import React from 'react';

class ProductListItem extends React.Component {
  render() {
    const price = (this.props.product.price / 100).toFixed(2);
    return (

      <div className="col-4 d-flex justify-content-center">
        <div className="card mt-2 mb-2" style={{ width: '18rem' }}>
          <img src={this.props.product.image} className="card-img-top"></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.product.name}</h5>
            <p className="card-text">${price}</p>
            <p className="card-text">{this.props.product.shortDescription}</p>
          </div>
        </div>
      </div>

    );
  }
}

export default ProductListItem;
