import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store'
// import {positions,transitions as AlertProvider} from "react-confirm-alert"

// const options={
//   timeout:5000,
//   position:positions.BOTTOM_CENTER,
//   transition: transitions.SCALE
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
   {/* <AlertProvider template={AlertProvider} {...options}>
    <App />
    </AlertProvider> */}
  </Provider>
);
