import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';


const render = () => {
    console.log('xxx', document.getElementById('root'))
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );
}

render()
