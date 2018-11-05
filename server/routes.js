import bodyParser from 'body-parser';
import { Questions } from './questions';
import QuestionModel from './models/questions'

export function Routes(){
  this.use(bodyParser.urlencoded({ extended: true }))
  this.use(bodyParser.json());

  this.get('/sampleText', (req, res) => {
    res.json({
      msg: "Hello World"
    })
  });

  // Questions model CRUD
  this.get('/questions', Questions.index);
  this.post('/questions', Questions.create);
  this.get('/questions/:id', Questions.show);
  this.put('/questions/:id', Questions.update);
  this.delete('/questions/:id', Questions.destroy);
  // END Questions model CRUD

}
