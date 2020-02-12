import React from 'react';
import Header from './components/Header'
import Form from './components/Form'
import { Provider } from 'react-redux'
import store from './redux'
import './index.css'

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <Form />
      </React.Fragment>
    </Provider>
  );
}

export default App;
