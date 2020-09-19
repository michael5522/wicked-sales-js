import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.setViewCatalogue = this.setViewCatalogue.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParams.productId}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          product: data
        }))
      .catch(err => {
        console.error('There was a problem with fetch GET', err);
      });
  }

  setViewCatalogue() {
    this.props.view('catalog', {});
  }

  render() {
    if (!this.state.product) return null;
    const price = (this.state.product.price / 100).toFixed(2);

    return (
      <div className="container">
        <div className="btn" onClick={this.setViewCatalogue}>&lt; Back to catalog</div>
        <div className="row">
          <div className="col-4">
            <img className="card-img-top" src={this.state.product.image} />
          </div>
          <div className="col-8">
            <h2>{this.state.product.name}</h2>
            <h3 className="text-muted">${price}</h3>
            <p>{this.state.product.shortDescription}</p>
          </div>
        </div>
        <div className="row mt-4">
          <p>{this.state.product.longDescription}</p>
        </div>
      </div>
    );

  }
}

export default ProductDetails;
