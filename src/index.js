import React from 'react';
import ReactDOM from 'react-dom';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'

import './assets/css/novoTweet.css'
// import './index.css';


// import App from './App.js';
import registerServiceWorker from './registerServiceWorker';

// Sistema de roteamento
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
// 1 - URL é critério master
// se tiver logado vai pra home
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
