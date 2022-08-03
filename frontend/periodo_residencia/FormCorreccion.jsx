import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input,Icon, message} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

import axios from 'axios';

const CreateFormCorreccion = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form} = props;
        const { getFieldDecorator} = form;

        return(
            <Modal
                visible={visible}
                title="Correcciones para anteproyecto"
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Correcciones del anteproyecto">
                        {getFieldDecorator('comentario', {
                            rules: [{required: true, message: 'Debe indicar las correcciones.'}, {max: 500, message: 'Las correcciones no deben pasar 500 caracteres'}]
                        })(<TextArea maxLength='500' placeholder="Escriba aqui las correcciones" autosize={{ minRows: 2, maxRows: 6 }} />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    })
)

export default class FormCorreccion extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_docente: props.id_docente,
            id_anteproyecto: props.id_anteproyecto,
            correo_alumno: props.correo_alumno,
            visible: props.visible,
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible} = nextProps;
        this.setState({
            id_docente: nextProps.id_docente,
            id_anteproyecto: nextProps.id_anteproyecto,
            correo_alumno: nextProps.correo_alumno,
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
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            
            // crear post al servidor
            axios.put('/api/anteproyecto/factibilidad/correciones', {
                id_docente: this.state.id_docente,
                id_anteproyecto: this.state.id_anteproyecto,
                comentario: values.comentario,
                correo_alumno: this.state.correo_alumno
            }).then(res => {
                if(res.status === 200 ){
                    message.success('Se han enviado las correcciones!')
                    form.resetFields();
                    this.setState({
                        visible: false
                    })
                }else{
                    Modal.error({
                        title: 'Error al enviar las correcciones. Revisar los siguientes campos',
                        content:(
                            <div>
                                {res.data.errores}
                            </div>
                        ), onOk(){}, 
                    })
                }
            }).catch(err => {
                    message.error('Error en el servidor verificar con el encargado.');   
            })
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render(){
        return(
            <div>
                <CreateFormCorreccion
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
