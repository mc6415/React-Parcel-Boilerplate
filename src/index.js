import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './public/style.scss';

console.log("Hello World");

ReactDOM.render(<Router />, document.getElementById('root'));

if(module.hot){
    module.hot.accept();
}