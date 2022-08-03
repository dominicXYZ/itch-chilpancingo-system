// Dependencies
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

// Components
import Login from './login/index.jsx';
import Departamento from './departamento/index.jsx';

// layouts components
import LayoutAdmin from './layoutComponents/LayoutAdmin.jsx';
import LayoutJefeDepartamento from './layoutComponents/LayoutJefeDepartamento.jsx';
import LayoutCandidatoAResidente from './layoutComponents/LayoutCandidatoAResidente.jsx';
import LayoutDocente from './layoutComponents/LayoutDocente.jsx';
import LayoutAsesorExterno from './layoutComponents/LayoutAsesorExterno.jsx';
import LayoutResidente from './layoutComponents/LayoutResidente.jsx';
import Page404 from './layoutComponents/Page404.jsx';


const AppRoutes = () => 
            <Switch>
                <Route exact path="/usuario/auth" component={Login} />
                <LayoutAdmin path="/admin" />
                <LayoutJefeDepartamento path="/jefe_departamento"/>
                <LayoutCandidatoAResidente path="/candidato_residente"/>
                <LayoutResidente path="/residente"/>                
                <LayoutDocente path="/docente"/>
                <LayoutAsesorExterno path="/asesor_externo"/>
                <Route component={Page404} />
            </Switch>

export default AppRoutes;