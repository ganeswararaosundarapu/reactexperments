import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import QuestionForm, { validate } from './form';
import { createQuestion } from './question_actions';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux';

class CreateQuestion extends Component{
  onSubmit(values){
    const { dispatch } = this.props;
    console.log('New form Submitted Values', values);
    dispatch(createQuestion(values)).then(() => this.props.history.push('/'));
  }

  render(){
        return (
            <div>
              <Link to="/" className="btn btn-primary float-right"> Back </Link>
              <h1> New Question Form </h1>
              <QuestionForm formData={null} onSubmit={this.onSubmit.bind(this)} />
            </div>
        )
    }
}

export default connect(null)(CreateQuestion);
