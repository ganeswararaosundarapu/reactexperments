import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';

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

const renderOptions = ({fields, meta: { touched, error, warning, valid}}) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">Options</label>
      <div className="col-sm-10">
        <ul className="list-group">
            <li className="list-group-item">
              <button id="btnOption" type="button" className="btn btn-primary" onClick={() => fields.push()}>
                <i className="fas fa-plus"></i> Add Option
              </button>
            </li>
          {fields.map((option, index) => (
            <li key={index} className="list-group-item">
              <button
                type="button"
                className="fas fa-trash-alt btn align-self-end"
                title="Remove Option"
                onClick={() => fields.remove(index)}
              />
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

 class CreateQuestion extends Component {
   constructor(props){
     super(props);
   }

  componentDidMount(){
    // click explicitly to add one option
    // window.$('#btnOption').click();
  }


  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit((values) => console.log('form Submitted', values))}>

        <FieldArray name="options" component={renderOptions} />

        <div className="form-group row">
          <label className="col-sm-2 col-form-label"></label>
           <div className="col-sm-10">
            <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  // Options
  if(!values.options || !values.options.length){
    //errors.options._error = "Atleast should have one option required."; // fallback error for options array
    errors.options = { _error: 'At least one member must be entered' }
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
  }

  console.log("Error Object is ::", errors, values);
  return errors
}

export default reduxForm({
  form: 'createQuestion',
  validate
})(CreateQuestion);



/*
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"
        />
        <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    ))}
  </ul>
)

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="clubName"
        type="text"
        component={renderField}
        label="Club Name"
      />
      <FieldArray name="hobbies" component={renderHobbies} />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

const validate = values => {
  const errors = {}
  if (!values.clubName) {
    errors.clubName = 'Required'
  }
  if (!values.hobbies || !values.hobbies.length) {
    //errors.hobbies = { _error: 'At least one member must be entered' }

    if(!errors.options){
      errors.options  = [];
    }
    errors.options._error = "Atleast should have one option required."; // fallback error for options array

  } else {


      const hobbyArrayErrors = []
      values.hobbies.forEach((hobby, hobbyIndex) => {
        if (!hobby || !hobby.length) {
          hobbyArrayErrors[hobbyIndex] = 'Required'
        }
      })
      if (hobbyArrayErrors.length) {
        errors.hobbies = hobbyArrayErrors
      }
      if (values.hobbies.length > 5) {
        if (!errors.hobbies) {
          errors.hobbies = []
        }
        errors.hobbies._error = 'No more than five hobbies allowed'
      }


  }

  return errors
}


export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate
})(FieldArraysForm)
 */


 // {this.props.questions && !this.props.questions.length && <div> Loading ... </div>}
 //  <ul>
 //    {this.showList()}
 //  </ul>


import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { createQuestion } from './question_actions';

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
        <ul className="list-group">
            <li className="list-group-item">
              <button id="btnOption" type="button" className="btn btn-primary" onClick={() => fields.push()}>
                <i className="fas fa-plus"></i> Add Option
              </button>
            </li>
          {fields.map((option, index) => (
            <li key={index} className="list-group-item">
              <button
                type="button"
                className="fas fa-trash-alt btn align-self-end"
                title="Remove Option"
                onClick={() => fields.remove(index)}
              />
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

 class CreateQuestion extends Component {
   constructor(props){
     super(props);
   }

  componentDidMount(){
    // click explicitly to add one option
    window.$('#btnOption').click();
    console.log("History", this.props.history);

    // this.props.initialize(
    //   {"description": "Th",
    //     "answer": 90
    //   });

  }

  onSubmit(values){
    console.log('form Submitted', values);
    this.props.dispatch(createQuestion(values)).then(() => this.props.history.push('/'));

  }


  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

const validate = values => {
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

  console.log("Error Object is ::", errors, values);
  return errors
}

export default reduxForm({
  form: 'createQuestion',
  validate
})(connect(null)(CreateQuestion));
