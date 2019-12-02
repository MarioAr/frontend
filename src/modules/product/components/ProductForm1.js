import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { products } from 'modules/redux/actions/';
import { generateId } from '../helper';
import { Grid } from 'components/grid';
import { Dropzone } from 'components/dropzone';
import { InputGroup, Editor, InputGroupCurrencyIcon } from 'components/input';
import { Button } from 'components/button';
// import { Pagination } from './pagination/';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.dropImage = this.dropImage.bind(this);
  }

  state = {
    inputValidation: {
      name: !false,
      description: !false,
      price: !false,
      stock: !false
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

  onChange = (name, value )=> {
    const state = this.state;
    state[name] = value;
    this.setState(state);
  }

  backToListing = () => {
    this.props.history.push('/products') 
  }

  validateForm() {
    const state = this.state;
    let validate = true;

    for(var key in state.inputValidation) {
      if(state.inputValidation.hasOwnProperty(key)) {
        const invalid = (isEmpty(state[key]) || state[key] === '<p></p>');
    
        state.inputValidation[key] = invalid;

        if(invalid) {
          validate = false
        }
      }
    }

    this.setState(state);
    return validate;
  }

  get renderActionButtons() {
    const { id } = this.state;
	    
    const CancelBtn =() => <Button size="small" onClick={this.backToListing} className="ml--lg" outline>CANCEL</Button>;
    const AcceptBtn = props => <Button size="small" onClick={props.onClick}>{props.label}</Button>

    if(id) {
      return (
        <React.Fragment>
          {/* <Button size="small">SAVE UPDATES</Button> */}
          <AcceptBtn label="SAVE UPDATES" onClick={this.update} />
          <Button size="small" type="danger" className="ml--lg" onClick={() => {this.onDelete(id)}}>REMOVE</Button>
          <Button size="small" onClick={this.backToListing} className="ml--lg" outline>CANCEL</Button>
          {/* <CancelBtn /> */}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {/* <Button size="small">SAVE PRODUCT</Button> */}
          <AcceptBtn label="SAVE PRODUCT" onClick={this.save} />

          {/* <Button size="small" className="ml--lg" outline>CANCEL</Button> */}
          <CancelBtn />
        </React.Fragment>
      )
    }
  }
  
  save() {
    let prod = {id: generateId(), ...this.state}
    delete prod.inputValidation;
    this.props.dispatch(products.setProduct(prod))
  }

  update() {
    let prod = {...this.state}
    delete prod.inputValidation;

    this.props.dispatch(products.updateProduct(prod))
  }

  onDelete = (id) => {
    console.log(id)
    this.props.dispatch(products.deleteProduct(id));
	  this.props.history.push('/products');
  }
  componentWillUnmount() {
      //  this.props.dispatch(products.reset())
	  
  }
  
  componentDidMount() {
    const { params } = this.props.match;
    // const { state } = this.props.location;
    const id = params.id;
    

    if (id) {
       this.props.dispatch(products.getProduct(id))
	  
	  this.setState((state, props) => ({
		  ...props.edit
	  }));	  
    }
  }

  dropImage(e) {
    
    let file = e[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => this.setState({images: [...this.state.images, reader.result]});
    reader.onerror = error => console.log(error);
  }

  render() {
    const { id, description, name, price, stock, promotionalPrice, images, inputValidation } = this.props;
    
	if (this.props.error) {
		alert("Ops!");
	}
	
	if (this.props.edited) {
		alert('Edited!');
	}
    return (
      <div>
        <Grid transparent className='image--selection'>
          <label>Fotos dos seus produtos</label>
          <div className='col-1-4'>
            <Dropzone value={images[0]} index={0} onDrop={this.dropImage}/>
          </div>
          <div className='col-1-4'>
            <Dropzone value={images[1]} index={1} onDrop={this.dropImage}/>
          </div>
          <div className='col-1-4'>
            <Dropzone value={images[2]} index={2} onDrop={this.dropImage}/>
          </div>
          <div className='col-1-4'>
            <Dropzone value={images[3]} index={3} onDrop={this.dropImage}/>
          </div>
        </Grid>

        <Grid block>
          <div>
            <InputGroup value={name} validate={inputValidation} onChange={this.inputChange} label="Name" name="name" placeholder="Ex: Chaveiro de plástico de Budha"/>
            <Editor value={description} validate={inputValidation} onChange={this.onChange} label="Description" name="description"/> 
          </div>

        </Grid>


        <Grid block>
        <div className="col-1-4">
            <InputGroupCurrencyIcon validate={inputValidation} value={price} onChange={this.inputChange} name="price" label="Original Price" icon="$" placeholder="0,00"/>
          </div>

          <div className="col-1-4">
            <InputGroupCurrencyIcon validate={inputValidation} value={promotionalPrice} onChange={this.inputChange} name="promotionalPrice" label="Promocional Price" icon="$" placeholder="0,00"/>
          </div>
          
          <div className="col-1-4">
            <InputGroup validate={inputValidation} value={stock} onChange={this.inputChange} type="number" name="stock" label="Stock"/>
          </div>
        </Grid>

        <Grid transparent nopadding className="mt--lg">
          {this.renderActionButtons}
        </Grid>
      </div>
    )
  }
}

export default connect(
  state => state.products
)(ProductForm);