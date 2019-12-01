import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

// import { products as productsCrud } from 'modules/redux/actions/';
import { Grid } from 'components/grid';
import { Table } from 'components/table'; 
import { Checkbox } from 'components/input';
// import { Button } from 'components/button';
import ProductItem from './ProductItem';
// import { Pagination } from '../pagination/';

class ProductList extends Component {
 
  render() {
    
    const { products, page, maxItems, onDelete } = this.props;
    
    const talbeRows = []
    
    if(isEmpty(products)){
      return (
        <div className="empty-list">
          Você ainda não possui nenhum produto cadastrado, 
          crie um <Link to="/products/new">novo produto</Link> primeiro
        </div>
      );
    }

    for(let i = 0; i < maxItems; i++) {
      const index = (page * maxItems) + i;
      const item = products[index];
      const image = (item && item.images) ? item.images[0] : null;
      
      if(item) {
        const row = (<ProductItem key={index} item={item} image={image} index={index} onDelete={onDelete}  />)
        
  
        talbeRows.push(row);
      }
    }

    
    return (
      <div>
        <Grid nopadding>
          <Table>
            <thead>
              <tr>
                <th width={40} className="all">
                  <Checkbox name="select-all"/>
                </th>
                <th width={300}>Produto</th>
                <th>Stock</th>
                <th>Original price</th>
                <th>Promocional price</th>
                <th>Variations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {talbeRows}
            </tbody>
          </Table>
        </Grid>
      </div>
    )
  }
}

export default connect(
  state => state.products
)(ProductList);