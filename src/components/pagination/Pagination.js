import React, { Component } from 'react';

class Pagination extends Component {


    changePage = page => {
        this.setState({
            page
        })
    }


    get maxPages() {
        const { products, maxItems } = this.props;
        return Math.ceil(products.length / (maxItems)) - 1;
    }

    componentWillReact() {
        const maxPages = this.maxPages;
        const { products, page, maxItems } = this.state;

        if ((maxPages !== page) && typeof products[page * maxItems] === 'undefined') {
            this.setState({ page: maxPages });
        }
    }


    paginationRender() {
        const numPages = this.maxPages;
        const pages = [];
        const { page } = this.state;

        for (let i = 0; i <= numPages; i++) {
            pages.push(<Button outline={page === i} onClick={() => this.changePage(i)} className="mr--md">{i + 1}</Button>);
        }

        if (pages.length === 1) {
            return null;
        }

        return pages;
    }

    render() {

        return (
            <div className="table--pagination">
                {this.paginationRender()}
            </div>
        );
    }
}


export default Pagination;