import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, requestFeatching, deleteQuestion } from './question_actions';
import { Link } from 'react-router-dom';

 class Questions extends Component {
  render() {
    const { isFetching, questions } = this.props;
    console.log("Render ", questions);
    return (
      <div>
         {isFetching && <div> Loading ... </div>}
          <Link to="/questions/new" className="btn btn-primary float-right"> <i className="fas fa-plus"></i> Question </Link>
          <br />
          <h1>List of Questions</h1>
          <ul className="list-group">
            {this.showList()}
          </ul>
      </div>
    );
  }

  componentWillMount(){
    this.props.dispatch(fetchQuestions());
  }

  onDelete(id){
    this.props.dispatch(deleteQuestion(id))
  }

  showList(){
      const { questions } = this.props;
      if(!questions || !Object.keys(questions).length){
        return (
          <div> Empty Question there. Please add more questions to see.</div>
        )
      }

      return Object.keys(questions).map(key => (
        <li key={questions[key]._id} className="list-group-item">
          <Link to={`/questions/${questions[key]._id}`}>{questions[key].description}</Link>
          <div className="d-inline-block float-right">
            <button className="btn btn-danger" onClick={() => this.onDelete(questions[key]._id)}> <i className="fas fa-trash-alt"></i></button>
            <Link to={`/questions/${questions[key]._id}/edit`} className="btn btn-primary"> <i className="fas fa-edit"></i></Link>
          </div>
        </li>
        )
      )
  }

}

const mapStateToProps = ({ questions }) => {
 const {
    isFetching,
    lists
  } = questions || {
     isFetching: true,
     lists: {}
  }

  return {
    questions: lists,
    isFetching
  }
}

// export the questions
export default connect(mapStateToProps)(Questions);
