
import React from 'react';
import Questions from '../questions';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';
import CreateQuestion from './../questions/new';
import ShowQuestion from './../questions/show';
import EditQuestion from './../questions/edit';
import Login from './../users/login'

export default () => (
  <BrowserRouter>
    <div className="container">
      <div className="row">
      <div className="container-fluid">
      <div className="App-header"  />
      <Switch>
        <Route exact path='/' component={Questions}/>
        <Route path='/questions/new' component={CreateQuestion}/>
        <Route path='/questions/:id/edit' component={EditQuestion} />
        <Route path='/questions/:id' component={ShowQuestion} />
        <Route path='/login' component={Login} />

        <Route render={() => <h1>Sorry</h1>} />
      </Switch>
      <div className="App-footer"  />
      </div>
      </div>
    </div>

  </BrowserRouter>
)
