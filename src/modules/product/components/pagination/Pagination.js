import React, { Component } from 'react'
import  { connect } from 'react-redux'

import PaginationBtns from './PaginationBtns';
import { products } from 'modules/redux/actions/';
import PropTypes from 'prop-types';

class Pagination extends Component {

    componentDidMount() {
        let { items } = this.props;
                
        this.props.dispatch(products.initPagination(items));
        
    }

    changePage = page => {
        
        this.props.dispatch(products.setPaginationPage(page));
        
    }

    maxPages = () => {
        
        const { products, items } = this.props;
        
        return Math.ceil(products.length / (items)) - 1;
    }   
    render() {
        let { page, maxPages } = this.props;
        
        return (
            <div className="table--pagination">
                <PaginationBtns maxPages={maxPages} page={page} changePage={this.changePage} />
            </div>
        )
    }
}

Pagination.propTypes = {
    items: PropTypes.number
}

Pagination.defaultValues = {
    items: 8
}
export default connect(
    state => state.products
)(Pagination);