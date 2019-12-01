import React, { PureComponent } from 'react';
import classname from 'classname';
import ReactDropzone from 'react-dropzone';
import isEmpty from 'lodash/isEmpty';

class Dropzone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageBase64: props.value
    }

    this.onDropHandler = this.onDropHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      imageBase64: newProps.value
    })
  }

  onDropHandler = (files) => {
    // Refact - need to implement this
    console.log(files);
  }

  render() {
    // Refact - need to implement this
    const { imageBase64 } = this.state;
    const { className, onDrop, style, ...props } = this.props;
    const classComponent = classname('dropzone', className,{
      'dropzone--filled': (isEmpty(imageBase64))
    });    
  
    return (
      <ReactDropzone className={classComponent} style={style} onDrop={onDrop}>
        {
          !isEmpty(imageBase64)
          ? <img src={imageBase64} alt="" />
          : <i className='icon icon-photo' />
        }
      </ReactDropzone>
    );
  }
}

export default Dropzone;