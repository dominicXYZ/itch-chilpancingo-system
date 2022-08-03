import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Modal, Form, Input, Radio, Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
import uuid from 'uuid';
import axios from 'axios';

const CreateFormEditDocente = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, docente, departamentos } = props;
        const { getFieldDecorator } = form;
        const prefixSelectorTitulo = getFieldDecorator('titulo', {
            initialValue: docente.titulo,
        })(
            <Select style={{ width: 60 }}>
                <Option value="ING.">ING.</Option>
                <Option value="DR.">DR.</Option>
                <Option value="DRA.">DRA.</Option>
                <Option value="MTRO.">MTRO.</Option>
                <Option value="DIR.">DIR.</Option>
                <Option value="DIRA.">DIRA.</Option>
                <Option value="LIC.">LIC.</Option>
                <Option value="ISC.">ISC.</Option>
                <Option value="ISI.">ISI.</Option>
                <Option value="MAI.">MAI.</Option>
                <Option value="MBT.">MTB.</Option>
                <Option value="MCT.">MCT.</Option>
                <Option value="MTI.">MTI.</Option>
                <Option value="M.A.T.I.">M.A.T.I.</Option>
                <Option value="M.C.">M.C.</Option>
            </Select>
        );


        return (

            <Modal
                visible={visible}
                title={`Editar docente`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >

                <Form layout="vertical">
                    <FormItem label="Nombre">
                        {getFieldDecorator('nombre', {
                            rules: [{ required: true, message: 'El docente debe tener un nombre.' }],
                            initialValue: docente ? docente.nombre : ''
                        })(<Input addonBefore={prefixSelectorTitulo} style={{ width: '100%' }} placeholder="Nombre del docente" />)}
                    </FormItem>
                    <FormItem label="Apellido paterno">
                        {getFieldDecorator('ap_paterno', {
                            rules: [{ required: true, message: 'El docente debe tener un apellido paterno.' }],
                            initialValue: docente ? docente.ap_paterno : ''
                        })(<Input placeholder="Apellido paterno del docente" />)}
                    </FormItem>
                    <FormItem label="Apellido materno">
                        {getFieldDecorator('ap_materno', {
                            rules: [{ required: true, message: 'El docente debe tener un apellido materno.' }],
                            initialValue: docente ? docente.ap_materno : ''
                        })(<Input placeholder="Apellido materno del docente" />)}
                    </FormItem>

                    <FormItem label="Seleccione el departamento">
                        {getFieldDecorator('id_departamento', {
                            rules: [{ required: true, message: 'El docente debe tener departamento.' }],
                            
                            
                        })(
                            <Select placeholder="Departamentos">
                              
                                {
                                    
                                    departamentos[0] ?
                                        departamentos.map((departamento, index) => {
                                            return <Option key={index} value={`${departamento.id}`}>{`${departamento.nombre}`}</Option>
                                        }) : ''
                                }

                            </Select>
                        )}
                    </FormItem>

                </Form>

            </Modal>
        );
    })
)

export default class FormAddDocente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            docente: props.docente,
            departamentos: props.departamentos
        }
    }
    componentWillReceiveProps(nextProps) {
        const { visible, docente, departamentos } = nextProps;
        this.setState({
            visible,
            docente,
            departamentos
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        const { docente } = this.state
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            // crear post al servidor
            axios.put(`/api/docenteU/${docente.id}`, {
                docente_id: docente.id,
                titulo: values.titulo,
                nombre: values.nombre,
                ap_paterno: values.ap_paterno,
                ap_materno: values.ap_materno,
                id_departamento: values.id_departamento

            }).then((res) => {
                //console.log(res)
                if (res.status === 200) {
                    message.success("Docente Actualizado satisfactoriamente")
                    this.setState({ visible: false });
                    form.resetFields();
                    this.props.onEditDocente();
                } else {
                    Modal.error({
                        title: 'Error al guardar el docente. Revisar los siguientes campos',
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

        return (
            <div>

                <CreateFormEditDocente
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    docente={this.state.docente}
                    departamentos={this.state.departamentos}
                />
            </div>
        )
    }
}
