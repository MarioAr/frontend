import React, { Component } from 'react'
import { ButtonIcon } from 'components/button';
import { Image } from 'components/image';
import { Link } from 'react-router-dom';



class ProductItem extends Component {


    render() {
        
        const {index, item, image, onDelete} = this.props;
        
        return (
            <tr >
                <td>
                    <label htmlFor={`select-product-${index}`} className='check--container'>
                        <input type="checkbox" id={`select-product-${index}`} />
                        <span className="check" />
                    </label>
                </td>
                <td>
                    <div className="product--detail">
                        <Image bg={image} />
                        <Link to={{pathname: `/products/edit/${item.id}`, state: {...item}}}>{item.name}</Link>
                    </div>
                </td>
                <td>{item.stock}</td>
                <td>$ {item.price}</td>
                <td>$ {item.promotionalPrice}</td>
                <td>{item.price}</td>
                <td>
                    <Link to={{pathname: `/products/edit/${item.id}`, state: {...item}}} params={item}>
                        <ButtonIcon size="small" transparent icon='edit'>Edit</ButtonIcon>
                    </Link>
                    <button className='button button--sm' onClick={() => { onDelete(item.id)}}>
                    {/* <Link className="underline" to={`/products/edit/${item.id}`}>
                        <div className='text'>Remove</div>                    
                    </Link> */}
                        <div className='text'>Remove</div>

                    </button>
                </td>
            </tr>
        )
    }
}



export default ProductItem;