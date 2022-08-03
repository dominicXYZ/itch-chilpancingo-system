import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormAddAsesorExterno = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, empresa} = props;
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
                title={`Agregar asesor a la empresa ${empresa.nombre_empresa}`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Nombre completo del asesor externo">
                        {getFieldDecorator('nombre', {
                            rules: [{required: true, message: 'El docente debe tener un nombre.'}]
                        })(<Input addonBefore={prefixSelectorTitulo} style={{ width: '100%' }} placeholder="Nombre completo del asesor externo"/>)}
                    </FormItem>
                    <FormItem label="Puesto del asesor externo">
                        {getFieldDecorator('puesto', {
                            rules: [{required: true, message: 'El docente debe tener un puesto dentro de la empresa.'}]
                        })(<Input  style={{ width: '100%' }} placeholder="Puesto del asesor externo"/>)}
                    </FormItem>
                    <FormItem label="Correo del asesor externo">
                        {getFieldDecorator('correo', {
                            rules: [{type: 'email',message: 'El email no es correcto'},{required: true, message: 'El correo es obligatorio.'}]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}} />} type="email" placeholder="Ingrese su correo electronico" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    })
)

export default class FormAddAsesorExterno extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            empresa: props.empresa
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, empresa} = nextProps;
        this.setState({
            visible: visible,
            empresa: empresa
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
            console.log('Received values of form: ', values);
            
            // crear post al servidor
            axios.post('/api/asesor_externo', {
                nombre: `${values.titulo} ${values.nombre}`,
                puesto: values.puesto,
                correo: values.correo,
                id_empresa: this.state.empresa.id_empresa,
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    message.success("Asesor agregado satisfactoriamente")
                    this.setState({ visible: false });
                    form.resetFields();
                    this.props.onReloadFetch();
                }else{
                    Modal.error({
                        title: 'Error al guardar al asesor externo. Revisar los siguientes campos',
                        content:(
                            <div>
                                {res.data.errores}
                            </div>
                        ), onOk(){}, 
                    })
                }
            }).catch((err) => {
                console.log(err)
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

                <CreateFormAddAsesorExterno
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    empresa={this.state.empresa}
                />
            </div>
        )
    }
}
