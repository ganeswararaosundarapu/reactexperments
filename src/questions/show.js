import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestion, requestFeatching, fetchQuestionIfNeeded } from './question_actions'


class QuestionShow extends Component{
  constructor(props){
    super(props);
    this.questionId = this.props.match.params.id;
  }
  render(){
    const { isFetching, question } = this.props;

    return (
      <div>
      {isFetching && <div> Loading ... </div>}
      <Link to="/" className="btn btn-primary float-right"> Back </Link>
      <br />
      <h1> Show Question </h1>
      {question &&
        <div className="card">
          <div className="card-body">
            <p className="card-title">
              {question.description}
            </p>
            <div className="card-text" >
              Options : {question.options.join(', ')}
              <br/>
              Answer : {question.options[question.answer]}
            </div>
          </div>
        </div>
      }
      </div>
    )
  }

  componentWillMount() {
    //this.props.dispatch(fetchQuestion(this.questionId));
    this.props.dispatch(fetchQuestionIfNeeded(this.questionId));


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

export default connect(mapStateToProps)(QuestionShow)
