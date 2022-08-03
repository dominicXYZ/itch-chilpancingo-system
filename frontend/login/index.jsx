// Dependencies
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Row, Col, Card, Layout} from 'antd';
const {Content, Header} = Layout;
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import Particles from 'react-particles-js';

import WrappedLoginForm from './components/FormLogin.jsx';

export default class Login extends Component{
    render(){
        return(
            <div>
                <Particles style={{background: '#282c34', position: 'absolute', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} params={require('./particles.json')}>
                
                </Particles>
                <Row type="flex" justify="center" align="middle" style={{height: '100%', position: 'absolute', marginLeft: 'auto',marginRight: 'auto',left: 0, right: 0}}>
                    <Col lg={16} xs={22} >
                        <Card style={{borderBottomRightRadius: 7, borderBottomLeftRadius: 7, borderTopLeftRadius: 7, borderTopRightRadius: 7, paddingTop: 30, paddingBottom: 30}}>
                            <Row type="flex" justify="center" align="middle">
                                <Col lg={12} xs={22} style={{paddingLeft: 20, paddingRight: 20}}>
                                    <Row className="custom-image" type="flex" justify="center">
                                        <img src="/img/tec_Logo.png" alt="logo_tec" className="logo-login" />
                                    </Row>
                                    <h2 style={{marginTop: 20, marginBottom: 20,textAlign: 'center', color: "#505962"}} className="color-font"> SSRITCH v1 </h2>
                                    <p style={{textAlign: 'center'}}>Sistema de seguimiento de residencias del Instituto Tecnológico de Chilpancingo</p>
                                </Col>
                                <Col lg={12} xs={22} className="col-login" style={{marginTop: 20}}>
                                    <h1 style={{color: "#1f90e6", marginBottom: 20}} >Autenticación de usuario</h1>
                                    <WrappedLoginForm/>
                                </Col>
                            </Row>
                        </Card>
                    </Col> 
                </Row>
            </div>
                
        )
    }
}
