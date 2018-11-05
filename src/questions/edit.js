import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import QuestionForm, { validate } from './form';
import { Link } from 'react-router-dom';
import { createQuestion, fetchQuestionIfNeeded, updateQuestion } from './question_actions';
import { connect } from 'react-redux';

class EditQuestion extends Component{
constructor(props){
  super(props);
  this.questionId = this.props.match.params.id;
}

onSubmit(values){
    const { dispatch, history } = this.props;
    console.log('Edit form Submitted Values', values);
    dispatch(updateQuestion(this.questionId, values)).then(() => history.push('/'));
  }

  intitialData(){
    return {
      "description": "Ganesh",
      "answer": 0,
      "options": ["sdsdsd", "sdsds", "sdsdsd"],
      "choiceType": "Multiple"
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchQuestionIfNeeded(this.questionId));
  }

  render(){
    const { question, isFetching } = this.props;

    return (
          <div>
            <Link to="/" className="btn btn-primary float-right"> Back </Link>
            <br />
            {isFetching && <div> Loading ... </div>}
            <h1> Edit Question Form</h1>
            {question && <QuestionForm formData={question} onSubmit={this.onSubmit.bind(this)} />}
          </div>
      )
  }

}

const mapStateToProps = (state, ownProps) => {
// console.log("New Question MapStateToPros ", state);
const { questions } = state;

  const {
    isFetching,
    lists
  } = questions || {
    isFetching: true,
    lists: {}
  }

  return {
    question: lists[ownProps.match.params.id],
    isFetching
  }
}

export default connect(mapStateToProps)(EditQuestion);
