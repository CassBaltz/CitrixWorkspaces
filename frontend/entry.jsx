'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/app.jsx');

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<App />, document.getElementById('content'))
})
