import React, { Component } from 'react';

// import { Grid } from 'components/grid';
// import { Dropzone } from 'components/dropzone';
// import { InputGroup, Editor, InputGroupCurrencyIcon } from 'components/input';
import { Button } from 'components/button';
import PropTypes from 'prop-types';

class PaginationBtns extends Component {
    
    render() {
        const numPages = this.props.maxPages;
        const pages = [];
        const { page, changePage } = this.props;
        
        for (let i = 0; i <= numPages; i++ ) {
                
                pages.push(<Button outline={page === i} onClick={() => changePage(i)} className="mr--md" key={i}>{i + 1}</Button>);
            }
        return (
                pages
            )
    }
}

 PaginationBtns.propTypes = {
     maxPages: PropTypes.number,
     page: PropTypes.number,
     changePage: PropTypes.func.isRequired
 }

 export default PaginationBtns;