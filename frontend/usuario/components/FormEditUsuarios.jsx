import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Modal, Form, Input, Radio, Select, Icon, message, Row, Col } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormEditUsuario = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, usuario } = props;
        const { getFieldDecorator } = form;
        //console.log('usuario? ', usuario);

        return (

            <Modal
                visible={visible}
                title={`Editar el usuario ${usuario.correo}`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Correo del usuario">
                        {getFieldDecorator('correo', {
                            rules: [{ required: true, message: 'El usuario debe tener un correo.' }],
                            initialValue: usuario.correo
                        })(<Input placeholder="Usuario" />)}
                    </FormItem>
                    <FormItem label="Contraseña">
                        {getFieldDecorator('contrasenia', {
                            rules: [{ required: true, message: 'El usuario debe tener una contrasenia.' }],
                            
                        })(<Input type='password' placeholder="Contraseña" />)}
                    </FormItem>
                    
                    <FormItem label="Rol" hasFeedback>
                                {getFieldDecorator('rol', {
                                    rules: [{required: true, message: 'El usuario debe tener un rol.'}],
                                    initialValue: usuario.rol
                                })(
                                    <Select placeholder="Seleccione un rol">
                                        <Option value="docente">Docente</Option>
                                        <Option value="jefe_departamento">Jefe Departamento</Option>
                                        <Option value="subdirector_academico">Subdirector Academico</Option>
                                        <Option value="asesor_interno">Asesor Interno</Option>
                                    </Select>
                                )}
                    </FormItem>

                   
                </Form>

            </Modal>

        );
    })
)

export default class FormUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            usuario: props.usuario
        }
    }
    componentWillReceiveProps(nextProps) {
        const { visible,usuario } = nextProps;
        this.setState({
            visible: visible,
            usuario: usuario
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
        this.form.resetFields();
    }
    handleCreate = () => {
        const form = this.form;
        const {usuario} = this.state
        form.validateFields((err, values) => {

            if (err) {
                return;
            }
            //console.log('Received values of form: ', values);

            // crear post al servidor
            axios.put(`/api/usuario/${usuario.id}`, {
                usuario_id: usuario.id,
                correo: values.correo,
                contrasenia: values.contrasenia,
                rol: values.rol
            }).then((res) => {
                //console.log(res)
                if (res.status === 200) {
                    form.resetFields();
                    message.success("Usuario actualizado satisfactoriamente")
                    this.setState({ visible: false });
                    this.props.onEditUsuario()
                } else {
                    Modal.error({
                        title: 'Error al guardar el usuario. Revisar los siguientes campos',
                        content: (
                            <div>
                                {res.data.errores}
                            </div>
                        ), onOk() { },
                    })
                }
            }).catch((err) => {
                message.error(err);
            })
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        //console.log("aqui user edit open:",this.state.usuario);
        return (
            <div>
                <CreateFormEditUsuario
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    usuario={this.state.usuario}
                />
            </div>
        )
    }
}
