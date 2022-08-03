// Dependencies
import React, {Component} from 'react';
import {render} from 'react-dom';
import {LocaleProvider} from 'antd';
import {BrowserRouter as Router} from 'react-router-dom';
import {browserHistory} from 'react-router';
import esES from '../node_modules/antd/lib/locale-provider/es_ES';
import moment from 'moment';

// It's recommended to set locale in entry file globaly.
import '../node_modules/moment/locale/es';
moment.locale('es');

// Componentes
import AppRoutes from './routes.jsx';

import './common.css';


render(
    <LocaleProvider locale={esES} className="full-height">
        <Router history={browserHistory}>
            <AppRoutes/>
        </Router>
    </LocaleProvider>
    , document.getElementById('app')
);