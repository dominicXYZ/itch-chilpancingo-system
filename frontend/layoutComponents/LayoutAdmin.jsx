import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Modal, Input, Form} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import {Redirect, Link} from 'react-router-dom';

import {getIsAuth} from '../api.jsx';

// components
import Departamento from '../departamento/index.jsx';
import Docente from '../docente/index.jsx';
import DocentesInactivos from '../docenteI/index.jsx';
//import Docentes from '../GestionDocentes/index.jsx';
import Empresa from '../empresa/index.jsx';
import Usuario from '../usuario/index.jsx';
import CambiarContrasenia from '../layoutComponents/CambiarContrasenia.jsx';

class LayoutAdmin extends Component{
    
    constructor(){
        super();
        this.state = {
            collapsed: false,
            isAuth: true,
            componentSelected: 1,
            components: {
                        1: {
                            title: 'Gestión de departamentos',
                            render: <Departamento/>
                        },
                        2: {
                            title: 'Gestión de empresas',
                            render: <Empresa/>
                        },
                        6: {
                            title: 'Gestión de docentes',
                            render: <Docente/>
                        },
                        7: {
                            title: 'Docentes dados de baja del sistema',
                            render: <DocentesInactivos/>
                        },
                        5: {
                            title: 'Usuarios del sistema',
                            render: <Usuario/>
                        }
                    },
            visibleCambiarContrasenia: false
                        
        }
    }
    getIsAuth(){
        getIsAuth().then((usuario) => {
            if(usuario.rol === 'admin'){
                // console.warn('isAdmin', usuario.rol);
                this.setState({isAuth: usuario.isAuth})
            }
            else{
                this.setState({isAuth: false})
            }
        })
    }
    componentWillMount(){
        this.getIsAuth()
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            visibleCambiarContrasenia: false
        });
    }
    
    handleMenu = ({item, key, selectedKeys}) => {
        if(key == 3){
            this.setState({
                visibleCambiarContrasenia: true
            })
        }else{
            this.setState({
                componentSelected: key,
                visibleCambiarContrasenia: false
            })
        }
    }
    render(){
        const {isAuth, componentSelected, components, visibleCambiarContrasenia} = this.state
        // console.log(isAuth)
        const component = components[componentSelected];
        return(
            isAuth ? (
                <Layout style={{minHeight:'100vh'}}>
                    <Sider
                        breakpoint="lg"
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        
                    >
                        <div className="logo" style={{textAlign: 'center'}}>
                            <img src="/img/tec_logo.png" alt="logo_tec" height="100%"/>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handleMenu}>
                            <Menu.Item key="1">
                                <Icon type="appstore-o"/>
                                <span>Departamentos</span>
                            </Menu.Item>
                            <Menu.Item key="2" >
                                <Icon type="contacts"/>
                                <span>Empresas</span>
                            </Menu.Item>
                            <Menu.Item key="6" >
                                <Icon type="contacts"/>
                                <span>Docentes</span>
                            </Menu.Item>
                            <Menu.Item key="7" >
                                <Icon type="contacts"/>
                                <span>Docentes Inactivos</span>
                            </Menu.Item>
                            <Menu.Item key="5" >
                                <Icon type="bars"/>
                                <span>Usuarios del sistema</span>
                            </Menu.Item>
                            <Menu.Divider/>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>Usuario</span></span>}
                                >
                                <Menu.Item key="3">Cambiar contraseña</Menu.Item>
                                <Menu.Item ><a href="/api/usuario/logout"> <strong>Cerrar sesión</strong> </a> </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div style={{float: 'right', marginRight: 20}} >
                                {component.title}
                            </div>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                        {component.render}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Sistema de Seguimiento de residencias del ITCH ©2017 Francisco Blanco 00fblanco@gmail.com
                        </Footer>
                    </Layout>
                    <CambiarContrasenia visible={visibleCambiarContrasenia}/>
                </Layout>
            ):
            (<Redirect to="/usuario/auth"/>)
        )
    }
}

export default LayoutAdmin;