import React, { Component, Fragment } from 'react';
import './App.css';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu';

class App extends Component {
  render() {
    return (
        <Fragment>
          <Cabecalho>
            <NavMenu usuario="omariosouto" />
          </Cabecalho>
          <div>
            Listagem de tweets...
          </div>
        </Fragment>
    );
  }
}

export default App;
