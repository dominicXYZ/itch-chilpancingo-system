import React, {Component, useState, useEffect} from 'react';
import render from 'react-dom';
//import FormDepartamento from './components/FormDepartamento.jsx';
import {Row, Col, Card, Layout, Button, Table, Modal, Select, message} from 'antd';
import FormEditUsuario from '../usuario/components/FormEditUsuarios.jsx'
import FormUsuarios from '../usuario/components/FormUsuarios.jsx'
import axios from 'axios';

export default class Usuarios extends Component{
    constructor(){
        super();
        this.state = {
            usuarios: [],
            visible_form_usuarios: false,
            visible_form_EditUsuario: false,
            props_edit_usuario: {
                detalles: null
            },
            loadTable: true,            
        }
    }
    //const [isModalVisible, setModalVisible] = useState(false);
    
    fetchUsuarios = () => {
        axios.get('/api/usuarios')
            .then(res => {
                if(res.status === 200){
                   // console.log(res.data);
                    var usuarios = res.data.map((usuario, key) => {
                        return {
                            key:key,
                            id: usuario.id,
                            correo: usuario.correo,
                            rol: usuario.rol,
                            detalles: {
                                usuario
                            },acciones: 'acctions'
                        }
                    })
                    this.setState({
                        usuarios,
                        loadTable: false,
                    })
                }
            })
    }
   
    handleAddUsuarios(){
        this.fetchUsuarios();
        this.setState({
             visible_form_usuarios: false,
    })
    }

    handleEditUsuarios(){
        this.fetchUsuarios();
        this.setState({
             visible_form_EditUsuario: false,
    })
    }

    componentDidMount() {
        this.fetchUsuarios();
    }
    showModalFormUsuarios = () => {
        this.setState({
             visible_form_usuarios: true,
        })
    }

    showModalFormEditUsuario = (id_usuario) => {
       // console.log("que trae el id_user?: ",id_usuario)
        const {usuarios} = this.state;
        //const usuario= usuarios;
        const usuario = usuarios.find((usuario) => {return usuario.id === id_usuario});
        //console.log('USUARIO edit form', usuarios);
        this.setState({
            visible:false,
             visible_form_EditUsuario: true,
             props_edit_usuario: usuario
        })
    }

   

    enviarContrasenia = (id_usuario, correo) => {
        // alert(id_usuario)
        axios.put('/api/usuario/cambiar_contrasenia/email', {id_usuario, correo})
            .then(res => {
                if(res.status === 200){
                    message.success('Contraseña nueva enviada al correo del usuario!')
                }else{
                    message.error('Surgio un error, verificar conexión');
                }
            })
    }
    render(){
       const {usuarios, loadTable} = this.state;
       const { visible_form_usuarios,visible_form_EditUsuario, props_edit_usuario } = this.state;
       //const {  } = this.state;

        const columns = [
            {
                title: 'correo',
                dataIndex: 'correo',
                key: 'correo'
            }, {
                title: 'rol',
                dataIndex: 'rol',
                key: 'rol',
                filters: [
                    {
                        text: 'docente',
                        value: 'docente'
                    },
                    {
                        text: 'residente',
                        value: 'residente'
                    },
                    {
                        text: 'candidato_residente',
                        value: 'candidato_residente'
                    },
                    {
                        text: 'jefe_departamento',
                        value: 'jefe_departamento'
                    },
                    {
                        text: 'asesor_externo',
                        value: 'asesor_externo'
                    },
                    {
                        text: 'subdirector_academico',
                        value: 'subdirector_academico'
                    },
                ],
                onFilter: (value, record) => record.rol.indexOf(value) === 0,
            },
            {
                className: 'center-text',
                title: 'Recuperar contraseña',
                dataIndex: 'recover',
                key: 'recover',
                render: (text, record) => {

                    return (
                        <span>
                        <Button style={{marginRight: 5}} icon="reload" onClick={() => this.enviarContrasenia(record.id, record.correo)}>Enviar nueva contraseña a su correo</Button>,
                        <Button style={{marginRight: 5}} icon="edit" onClick={() => this.showModalFormEditUsuario(record.id)} >Modificar Correo</Button>
                        
                        </span>
                    )
                }

            }
            
        ]
        return (


            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{marginRight: 20}}>
                        <h1> Usuarios </h1>
                    </Col>
                    <Col>
                       { /*<Button type="primary" icon="plus" onClick={this.showModalFormUsuarios}>Agregar</Button>*/}
                    </Col>
                </Row>
               
                <Row type="flex" justify="center" align="middle" style={{marginTop: 20}}>
                    <Table dataSource={usuarios} className="full-width" columns={columns} pagination={{ pageSize: 10 }} loading={loadTable} scroll={{ x: 1100 }} />
                </Row>

                <FormUsuarios visible={visible_form_usuarios} onAddUsuario={this.handleAddUsuarios.bind(this)}/>
                <FormEditUsuario visible={visible_form_EditUsuario} usuario={props_edit_usuario} onEditUsuario={this.handleEditUsuarios.bind(this)}/>
                
            </div>
        )
    }
}