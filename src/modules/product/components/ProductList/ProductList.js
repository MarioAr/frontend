import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import isEmpty from 'lodash/isEmpty';

import { products as productsCrud } from 'modules/redux/actions/';
// import { Grid } from 'components/grid';
// import { Table } from 'components/table'; 
// import { Checkbox } from 'components/input';
// import { Button } from 'components/button';
// import ProductItem from './ProductItem';
import { Pagination } from '../pagination/';
import  ProductListView from './ProductListView';

class ProductList extends Component {
	state = {
		page: 0,
		maxItems: 3,
		products: [{
		id: '',
		name: '',
		stock: '',
		price: '',
		promotionalPrice: '',
		images: []
		}]
	}
	
	getProducts = () => {
		
		let { products, maxItems, page } = this.props;
		return Array.isArray(products) ? products.slice(page, maxItems) : [];
	}
	componentDidMount() {
		
		this.props.dispatch(productsCrud.getProducts());
	}

	onDelete = (id) => {
		
		this.props.dispatch(productsCrud.deleteProduct(id));
		
	}

	render() {
		let { products, productsPagination } = this.props;
		
		return (
			<div>
				<ProductListView products={productsPagination} onDelete={this.onDelete} />
				{products.length > 0 && <Pagination items={8} />}
			</div>
		)
	}
}

export default connect(
  state => state.products
)(ProductList);