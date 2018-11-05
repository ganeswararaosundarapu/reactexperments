import React, { Component } from 'react';
import { Field, FieldArray,reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchQuestion } from './question_actions';
import Modal from '../common/modal'

 class QuestionForm extends Component {

  constructor(props){
    super(props);
    this.initHandler(); // initilize the form data if the request is edit
  }

  initHandler(){
    const { formData, initialize } = this.props;
    if(formData){
      initialize(formData);
    }
  }

  componentDidMount(){
    const { formData } = this.props;
    // click explicitly to add one option
    if(!formData)
      window.$('#btnOption').click();
  }

  render() {
    const { handleSubmit, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="description" label="Description" component={renderFormField} type="textarea" placeholder="Please enter question"/>
        <FieldArray name="options" component={renderOptions} />
        <Field name="answer" label="Answer" component={renderFormField} type="text" placeholder="Please enter index of correct answer"/>
        <Field name="choiceType" label="choiceType" component={renderFormField} type="text" placeholder="Please enter choiceType"/>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"></label>
           <div className="col-sm-10">
            <button type="submit" className="btn btn-primary" disabled={invalid}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

const renderFormField = ({input, label, type, placeholder, meta: {error, touched, warning, valid}}) => {
  const fieldValidClassName = touched ? (valid ? 'is-valid' : 'is-invalid') : '';
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        {(() => {
          if(type === 'textarea'){
            return <textarea {...input} className={fieldValidClassName+' form-control'} placeholder={placeholder} />
          }else{
            return <input {...input} type={type} className={fieldValidClassName+' form-control'} placeholder={placeholder} />
          }
        })()}

        {touched && (error || warning) && <div className="invalid-feedback"> {error || warning} </div>}
      </div>
    </div>
  )
}

const renderOptions = ({fields, meta: { error, warning}}) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">Options</label>
      <div className="col-sm-10">
        <div className="list-group-item">
          <button id="btnOption" type="button" className="btn btn-primary" onClick={() => fields.push()}>
            <i className="fas fa-plus"></i> Add Option
          </button>
          <button id="btnOption" type="button" disabled={!fields.length} className="btn btn-default" data-toggle="modal" data-target="#optionConfirm">
            <i className="fas fa-eraser"></i> Clear All
          </button>
        </div>


        <Modal title="Confirm" ModalSelector="optionConfirm">
          <div className="modal-body">
            Are you sure, you want to remove all options ?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">NO</button>
            <button type="button" className="btn btn-primary" onClick={() => {fields.removeAll(); window.$('#optionConfirm').modal('hide')}}>YES</button>
          </div>
        </Modal>

        <ul className="list-group options-section">
          {fields.map((option, index) => (
            <li key={index} className="list-group-item">
              <button
                type="button"
                className="btn float-right"
                title="Remove Option"
                onClick={() => fields.remove(index)}
              >
              <i className="fas fa-trash-alt"></i>
              </button>
              <Field
                name={option}
                type="text"
                component={renderFormField}
                label={`Option #${index + 1}`}
              />
            </li>
          ))}
          {error && <li className="error list-group-item">{error}</li>}
        </ul>
      </div>
    </div>
  )
}

export const validate = values => {
  const errors = {};
  // Options
  if(!values.options || !values.options.length){
    errors.options = {_error: "Atleast should have one option required."}; // fallback error for options array
  }else{
    const errorOptions = [];
    values.options.forEach((option, index) => {
      if(!option){
        errorOptions[index] = `Please enter the option ${index+1}`;
      }
    });

    if(errorOptions.length){
      errors.options = errorOptions;
    }

  }

  if(!values.description){
    errors.description = "Decription Required.";
  }else if(values.description.length < 5){
    errors.description = "Description atleast 5 character or more";
  }

  if(!values.answer){
    errors.answer = "Answer Required.";
  }else if(!(/[0-9]+/i).test(Number(values.answer))){
    errors.answer = "Number is Required.";
  }else{
    if(values.options && values.options.length && ((values.options.length-1) < Number(values.answer))){
      errors.answer = `Entered ${values.answer} did not matched with the options index`;
    }
  }

  if(!values.choiceType){
    errors.choiceType = "choiceType Required";
  }

  console.log("Error Object ::", errors);
  return errors
}

export default reduxForm({
  form: 'questionForm',
  validate
})(QuestionForm)
