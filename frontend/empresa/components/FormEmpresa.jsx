import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message, Row, Col} from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormEditEmpresa = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form} = props;
        const { getFieldDecorator} = form;
        const prefixSelectorTituloTitular = getFieldDecorator('titulo_titular', {
            initialValue: 'ING.',
          })(
            <Select style={{ width: 60 }}>
              <Option value="ING.">ING.</Option>
              <Option value="DR.">DR.</Option>
              <Option value="DRA.">DRA.</Option>
              <Option value="MTRO.">MTRO.</Option>
              <Option value="M.A.">M.A.</Option>
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
          const prefixSelectorTituloFirmaElAcuerdo = getFieldDecorator('titulo_firma_acuerdo', {
            initialValue: 'ING.',
          })(
            <Select style={{ width: 60 }}>
              <Option value="ING.">ING.</Option>
              <Option value="DR.">DR.</Option>
              <Option value="DRA.">DRA.</Option>
              <Option value="MTRO.">MTRO.</Option>
              <Option value="M.A.">M.A.</Option>
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
                title="Agregar nueva empresa"
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
                width={650}
                style={{ top: 20 }}
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col lg={14} xs={24} >
                        <FormItem label="Nombre de la empresa" hasFeedback>
                            {getFieldDecorator('nombre_empresa', {
                                rules: [{required: true, message: 'La empresa debe tener un nombre.'}]
                            })(<Input placeholder="Nombre de la empresa"/>)}
                        </FormItem>
                        </Col>
                        <Col lg={10} xs={24} >
                        <FormItem
                            label="Seleccione la clasificación de la empresa"
                            hasFeedback
                            >
                            {getFieldDecorator('clasificacion', {
                                rules: [
                                { required: true, message: 'Indique la clasificación de la empresa' },
                                ],
                            })(
                                <Select placeholder="Selecciona la clasificación de la empresa">
                                    <Option value="industrial">Industrial</Option>
                                    <Option value="servicios">Servicios</Option>
                                    <Option value="público">Público</Option>
                                    <Option value="privado">Privado</Option>
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="RFC" hasFeedback>
                        {getFieldDecorator('rfc', {
                            rules: [{required: true, message: 'La empresa debe tener un RFC'}, {min: 12, message: 'El RFC debe tener minimo 12 caracteres'}, {max: 13, message: 'El RFC debe tener maximo 12 caracteres'}]
                        })(<Input placeholder="RFC de la empresa"/>)}
                    </FormItem>
                    <Row gutter={16}>
                        <Col xs={24} lg={12}>
                            <FormItem label="Domicilio" hasFeedback>
                                {getFieldDecorator('domicilio', {
                                    rules: [{max: 50, message: 'El domicilio solo debe tener 50 caracteres'}]
                                })(<Input placeholder="Domicilio de la empresa"/>)}
                            </FormItem>
                        </Col>
                        <Col xs={24} lg={12}>
                            <FormItem label="Colonia" hasFeedback>
                                {getFieldDecorator('colonia', {
                                    rules: [{max: 50, message: 'La colonia solo debe tener 50 caracteres'}]
                                })(<Input placeholder="Colonia de la empresa"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={12} xs={24} >
                        <FormItem label="Codigo postal" hasFeedback>
                            {getFieldDecorator('codigo_postal', {
                                rules: [{len: 5, message: 'El codigo postal solo debe tener 5 caracteres'}]
                            })(<Input placeholder="Codigo postal de la empresa"/>)}
                        </FormItem>
                        </Col>
                        <Col lg={12} xs={24} >
                        <FormItem label="Fax" hasFeedback>
                            {getFieldDecorator('fax', {
                                rules: [{max: 15, message: 'El fax debe tener como maximo 15 caracteres'}]
                            })(<Input placeholder="Fax de la empresa"/>)}
                        </FormItem>
                        </Col>
                        <Col lg={24} xs={24} >
                            <FormItem label="Misión de la empresa" hasFeedback>
                                {getFieldDecorator('mision', {
                                    rules: [{max: 500, message: 'La misión debe tener como maximo 500 caracteres'}]
                                })(<Input.TextArea placeholder="Misión de la empresa" autosize={{ minRows: 2, maxRows: 6 }}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={6} lg={6}>
                            <FormItem label="Puesto del titular" hasFeedback>
                                {getFieldDecorator('puesto_titular', {
                                    rules: [{required: true, message: 'El titular debe tener un puesto.'}]
                                })(<Input placeholder="Puesto del titular"/>)}
                            </FormItem>
                        </Col>
                        <Col xs={18} lg={18}>
                            <FormItem label="Nombre completo del titular" hasFeedback>
                                {getFieldDecorator('nombre_titular', {
                                    rules: [{required: true, message: 'El titular debe tener un nombre.'}]
                                })(<Input addonBefore={prefixSelectorTituloTitular} placeholder="Nombre completo del titular"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={6} lg={6}>
                            <FormItem label="Puesto del que firma el acuerdo" hasFeedback>
                                {getFieldDecorator('puesto_firma_acuerdo', {
                                    rules: [{required: true, message: 'El que firma el acuerdo debe tener un puesto.'}]
                                })(<Input placeholder="Puesto del que firma el acuerdo"/>)}
                            </FormItem>
                        </Col>
                        <Col xs={18} lg={18}>
                            <FormItem label="Nombre completo del que firma el acuerdo de colaboración" hasFeedback>
                                {getFieldDecorator('nombre_firma_acuerdo', {
                                    rules: [{required: true, message: 'El que firma el acuerdo debe tener un nombre.'}]
                                })(<Input addonBefore={prefixSelectorTituloFirmaElAcuerdo} placeholder="Nombre completo del que firma el acuerdo de colaboración"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    
                    
                </Form>

            </Modal>
        );
    })
)

export default class FormEditEmpresa extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible} = nextProps;
        this.setState({
            visible: visible
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
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            
            // crear post al servidor
            axios.post('/api/empresa', {
                nombre: values.nombre_empresa,
                clasificacion: values.clasificacion,
                rfc: values.rfc,
                domicilio: values.domicilio || '',
                colonia: values.colonia || '',
                codigo_postal: values.codigo_postal || '',
                fax: values.fax || '',
                mision: values.mision || '',
                titulo_titular: values.titulo_titular,
                puesto_titular: values.puesto_titular,
                nombre_titular: `${values.nombre_titular}`,
                titulo_firma_acuerdo: values.titulo_firma_acuerdo,
                puesto_firma_acuerdo: values.puesto_firma_acuerdo,
                nombre_firma_acuerdo: `${values.nombre_firma_acuerdo}`
            }).then((res) => {
                // console.log(res)
                if(res.status === 200){
                    form.resetFields();
                    message.success("Empresa agregada satisfactoriamente")
                    this.setState({ visible: false });
                    this.props.onAddEmpresa()
                }else{
                    Modal.error({
                        title: 'Error al guardar la empresa. Revisar los siguientes campos',
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
                <CreateFormEditEmpresa
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
