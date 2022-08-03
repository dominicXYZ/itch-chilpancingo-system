import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message} from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';
const CreateFormDepartamento = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, departamento} = props;
        // console.log('===>', departamento)
        const { getFieldDecorator} = form;

        const prefixSelectorTitulo = getFieldDecorator('titulo', {
            initialValue: 'ING.',
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
        var jefe_departamento = null
        if(departamento)
            jefe_departamento = departamento.docentes.find(docente => docente.usuario.rol === 'jefe_departamento') || null;
        return(
            <Modal
                visible={visible}
                title="Editar departamento"
                okText="Actualizar"
                onCancel={onCancel}
                onOk={onCreate}
                width={600}
                className="full-width"
            >
                <Form layout="vertical">
                    <FormItem label="Nombre del departamento" initialValue="" hasFeedback>
                        {getFieldDecorator('nombre_departamento', {
                            rules: [{required: true, message: 'El departamento debe tener un nombre.'}],
                            initialValue: departamento ? departamento.nombre : ''
                        })(<Input placeholder="Nombre del departamento" />)}
                    </FormItem>
                    <FormItem
                        label="Seleccione al jefe de departamento"
                        hasFeedback
                        >
                        {getFieldDecorator('id_jefe_departamento', {
                            rules: [
                            { required: true, message: 'El departamento debe tener un jefe.' },
                            ], initialValue: jefe_departamento ? `${jefe_departamento.id_usuario}` : ''
                        })(
                            <Select placeholder="Seleccione un docente">
                                {   departamento ?
                                        departamento.docentes.map((docente, index) => {
                                            return <Option key={index} value={`${docente.id_usuario}`}>{`${docente.titulo} ${docente.nombre} ${docente.ap_paterno} ${docente.ap_materno}`}</Option>
                                        }): ''
                                }

                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="Carreras"
                        >
                        {getFieldDecorator('carreras', {})(
                            <Select placeholder="Carreras del departamento">
                                {   departamento ?
                                        departamento.carreras.map((carrera, index) => {
                                            return <Option key={index} value={`${carrera.id}`}>{`${carrera.nombre}`}</Option>
                                        }): ''
                                }

                            </Select>
                        )}
                    </FormItem>
                </Form>

            </Modal>
        );
    })
)

export default class FormDepartamento extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            departamento: props.departamento
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, departamento} = nextProps;
        this.setState({
            visible,
            departamento
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
        const form = this.form;
        form.resetFields();

    }
    handleCreate = () => {
        const form = this.form;
        const {departamento} = this.state
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
           
            axios.put(`/api/departamento/${departamento.id}`, {
                nombre_departamento: values.nombre_departamento,
                id_jefe_departamento: values.id_jefe_departamento,
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    form.resetFields();
                    message.success("Departamento actualizado satisfactoriamente")
                    this.setState({ visible: false });
                    this.props.onReloadDepartamentos();
                }else{
                    Modal.error({
                        title: 'Error al actualizar el departamento. Revisar los siguientes campos',
                        content:(
                            <div>
                                {res.data.errores}
                            </div>
                        ), onOk(){}, 
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
    render(){
        const {departamento} = this.state
        // console.log('=>', departamento)
        return(
            <div>
                <CreateFormDepartamento
                    departamento={departamento}
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
