import * as React from 'react';
import './App.css';
import UserFormComponent from './UserFormComponent/UserFormComponent'

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="App">
        <UserFormComponent/>
      </div>
    );
  }
}

export default App;
