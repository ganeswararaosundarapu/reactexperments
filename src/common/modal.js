import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {

  constructor(props){
    super(props);
    this.modalTarget = document.createElement('div');
    this.modalTarget.id = "modal_container";
    document.body.appendChild(this.modalTarget);
    this._renderModal();

  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }



  _renderModal(){
    ReactDOM.render(
      this._modalCommonContent(),
      this.modalTarget
      )
  }

  componentWillMount() {
    this._renderModal();
  }
  componentWillUnmount() {  
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _modalCommonContent(){
    const { children, title, ModalSelector } = this.props;
    return (
      <div className="modal fade" id={ModalSelector}  data-toggle="modal" data-show="true" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <noscript />
    )
  }
}

export default Modal;
