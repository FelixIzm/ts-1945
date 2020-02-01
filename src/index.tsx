import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import Table from './Table';
import TableAsync from './TableAsync';
//import FxTable from './fxTable_1';
//import CountListMaterialExperiment from './tableThing';

import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<FxTable hi='Felix' />, document.getElementById('root'));
ReactDOM.render(<TableAsync />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
