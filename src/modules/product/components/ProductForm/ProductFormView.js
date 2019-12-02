import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Grid } from 'components/grid';
import { Dropzone } from 'components/dropzone';
import { InputGroup, Editor, InputGroupCurrencyIcon } from 'components/input';
import { Button } from 'components/button';

class ProductForm extends Component {
    
    state = {
        inputValidation: {
            name: false,
            description: false,
            price: false,
            stock: false
        },
        images: [],
        name: '',
        description: '',
        promotionalPrice: '',
        price: '',
        stock: ''
    };

    
    inputChange = e => {
        const { value, name } = e.target;
        this.onChange(name, value);
    }

    onChange = (name, value) => {
        const state = this.state;
        state[name] = value;
        this.setState(state);
        // this.validateForm();
    }

    backToListing = () => {

        this.props.backToListing()
    }

    validateForm() {
        const state = this.state;
        let validate = true;

        for (var key in state.inputValidation) {
            if (state.inputValidation.hasOwnProperty(key)) {
                const invalid = (isEmpty(state[key]) || state[key] === '<p></p>');

                state.inputValidation[key] = invalid;

                if (invalid) {
                    validate = false
                }
            }
        }

        this.setState(state);
        return validate;
    }

    onSave = () => {
        
        if (!this.validateForm()) {
            return alert("Invalid form!")
        }
        let prod = { ...this.state }

        delete prod.inputValidation;
        this.props.onSave(prod)
    }

    onDelete = id => {
        // console.log('delete', id)
        this.props.onDelete(id);
    }

    onUpdate = () => {
        // console.log('update', this.state)
        let prod = { ...this.state }

        delete prod.inputValidation;
        
        this.props.onUpdate(prod)
    }
    get renderActionButtons() {
        const { id } = this.state;
        const CancelBtn = () => <Button size="small" onClick={this.backToListing} className="ml--lg" outline>CANCEL</Button>;
        const AcceptBtn = props => <Button size="small" onClick={props.onClick}>{props.label}</Button>

        if (id) {
            return (
                <React.Fragment>
                    {/* <Button size="small">SAVE UPDATES</Button> */}
                    <AcceptBtn label="SAVE UPDATES" onClick={this.onUpdate} />
                    <Button size="small" type="danger" className="ml--lg" onClick={() => { this.onDelete(id) }}>REMOVE</Button>
                    {/* <Button size="small" onClick={this.backToListing} className="ml--lg" outline>CANCEL</Button> */}
                    <CancelBtn />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {/* <Button size="small">SAVE PRODUCT</Button> */}
                    <AcceptBtn label="SAVE PRODUCT" onClick={this.onSave}  />

                    {/* <Button size="small" className="ml--lg" outline>CANCEL</Button> */}
                    <CancelBtn />
                </React.Fragment>
            )
        }
    }

    componentDidMount() {
        
        const { update } = this.props;
        
        if (update) {
            this.setState((state, props) => ({
                ...props.edit
            }));	  
        }
    }

    dropImage = e => {
        
        let file = e[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => this.setState({ images: [...this.state.images, reader.result] });
        reader.onerror = error => console.log(error);
    }

    render() {
        const { description, name, price, stock, promotionalPrice, images, inputValidation } = this.state;

        return (
            <div>
                <Grid transparent className='image--selection'>
                    <label>Fotos dos seus produtos</label>
                    <div className='col-1-4'>
                        <Dropzone value={images[0]} index={0} onDrop={this.dropImage} />
                    </div>
                    <div className='col-1-4'>
                        <Dropzone value={images[1]} index={1} onDrop={this.dropImage} />
                    </div>
                    <div className='col-1-4'>
                        <Dropzone value={images[2]} index={2} onDrop={this.dropImage} />
                    </div>
                    <div className='col-1-4'>
                        <Dropzone value={images[3]} index={3} onDrop={this.dropImage} />
                    </div>
                </Grid>

                <Grid block>
                    <div>
                        <InputGroup value={name} validate={inputValidation} onChange={this.inputChange} label="Name" name="name" placeholder="Ex: Chaveiro de plástico de Budha" />
                        <Editor value={description} validate={inputValidation} onChange={this.onChange} label="Description" name="description" />
                    </div>

                </Grid>


                <Grid block>
                    <div className="col-1-4">
                        <InputGroupCurrencyIcon validate={inputValidation} value={price} onChange={this.inputChange} name="price" label="Original Price" icon="$" placeholder="0,00" />
                    </div>

                    <div className="col-1-4">
                        <InputGroupCurrencyIcon validate={inputValidation} value={promotionalPrice} onChange={this.inputChange} name="promotionalPrice" label="Promocional Price" icon="$" placeholder="0,00" />
                    </div>

                    <div className="col-1-4">
                        <InputGroup validate={inputValidation} value={stock} onChange={this.inputChange} type="number" name="stock" label="Stock" />
                    </div>
                </Grid>

                <Grid transparent nopadding className="mt--lg">
                    {this.renderActionButtons}
                </Grid>
            </div>
        )
    }
}

ProductForm.propTypes = {
    // inputValidation: {
    //         name: PropTypes.boolean,
    //         description: PropTypes.boolean,
    //         price: PropTypes.boolean,
    //         stock: PropTypes.boolean
    //     },
        images: PropTypes.array,
        name: PropTypes.string,
        description: PropTypes.string,
        promotionalPrice: PropTypes.string,
        price: PropTypes.string,
        stock: PropTypes.string,
        backToListing: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
}

export default ProductForm;