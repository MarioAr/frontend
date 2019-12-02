import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { products } from 'modules/redux/actions/';
import { generateId } from '../../helper';
import { Redirect} from 'react-router-dom'
import ProductFormView from './ProductFormView';

class ProductForm extends Component {

    componentDidMount() {
        const { params } = this.props.match;
        // const { state } = this.props.location;
        const id = params.id;
        

        if (id) {
            this.props.dispatch(products.getProduct(id))
            
            // this.setState((state, props) => ({
            //     ...props.edit
            // }));
        }

    }

    componentWillUnmount() {
         this.props.dispatch(products.reset())

    }

    backToListing = () => {
        this.props.history.push('/products')
    }

    save = (prod) => {
        
        prod.id = generateId();

        this.props.dispatch(products.setProduct(prod));
    }

    update = prod => {
        
        this.props.dispatch(products.updateProduct(prod));
        
    }

    onDelete = id => {
        
        this.props.dispatch(products.deleteProduct(id));

        this.props.history.push('/products');
    }
    render() {
        const { params } = this.props.match;
        const { edit, edited, error } = this.props;

        if (edited) {
            return <Redirect to="/products" />
        }

        if (error) {
            alert("Error!");
            this.props.dispatch(products.reset());

        }
        
        return (
            <div>
                <ProductFormView {...this.props} edit={edit} 
                    update={params.id}
                    backToListing={this.backToListing}
                    onUpdate={this.update}
                    onSave={this.save}
                    onDelete={this.onDelete}
                />
            </div>
        )
    }
}

// function mapStateToProps(state) {
//   return { products: state.products }
// }
export default connect(
    state => state.products
)(ProductForm);