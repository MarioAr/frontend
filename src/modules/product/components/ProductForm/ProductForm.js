import React, { Component } from 'react';
import  { connect } from 'react-redux';
import ProductFormView from './ProductFormView';

class ProductForm extends Component {
    render() {
        return (
            <div>
                <ProductFormView {...this.props} />
            </div>
        )
    }
}


export default connect(
    state => state.products
)(ProductForm);