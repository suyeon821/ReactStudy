import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Todo from './Todo';
import Detail from './Detail';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
     <Switch>
     <Todo/>
      <Route exact path="/Detail" component={Detail} />
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
