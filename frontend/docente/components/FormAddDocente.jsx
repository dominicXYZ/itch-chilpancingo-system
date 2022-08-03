import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormAddDocente = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, departamento} = props;
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
        return(
            <Modal
                visible={visible}
                title={`Agregar docente al departamento de ${departamento.nombre_departamento}`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Nombre">
                        {getFieldDecorator('nombre', {
                            rules: [{required: true, message: 'El docente debe tener un nombre.'}]
                        })(<Input addonBefore={prefixSelectorTitulo} style={{ width: '100%' }} placeholder="Nombre del docente"/>)}
                    </FormItem>
                    <FormItem label="Apellido paterno">
                        {getFieldDecorator('ap_paterno', {
                            rules: [{required: true, message: 'El docente debe tener un apellido paterno.'}]
                        })(<Input placeholder="Apellido paterno del docente"/>)}
                    </FormItem>
                    <FormItem label="Apellido materno">
                        {getFieldDecorator('ap_materno', {
                            rules: [{required: true, message: 'El docente debe tener un apellido materno.'}]
                        })(<Input placeholder="Apellido materno del docente"/>)}
                    </FormItem>
                    <FormItem label="Correo electronico">
                        {getFieldDecorator('correo', {
                            rules: [{type: 'email',message: 'El correo no es correcto'},{required: true, message: 'Necesita su correo para autentificarse en el sistema.'}]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}} />} type="email" placeholder="Ingrese su correo electronico" />
                        )}
                    </FormItem>

                </Form>

            </Modal>
        );
    })
)

export default class FormAddDocente extends Component{
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
            visible: visible,
            departamento: departamento
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
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
           // console.log('Received values of form: ', values);
            
            // crear post al servidor
            axios.post('/api/docente', {
                titulo: values.titulo,
                nombre: values.nombre,
                ap_paterno: values.ap_paterno,
                ap_materno: values.ap_materno,
                id_departamento: this.state.departamento.id_departamento,
                correo: values.correo
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    message.success("Docente agregado satisfactoriamente")
                    this.setState({ visible: false });
                    form.resetFields();
                    this.props.onReloadDepartamentos();
                }else{
                    Modal.error({
                        title: 'Error al guardar el docente. Revisar los siguientes campos',
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
        return(
            <div>

                <CreateFormAddDocente
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                departamento={this.state.departamento}
                />
            </div>
        )
    }
}
