import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormObservacionSeguimiento = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form} = props;
        const { getFieldDecorator} = form;
        return(
            <Modal
                visible={visible}
                title={`Agregar observación del seguimiento`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
                width={600}
            >
                <Form layout="vertical">
                    <FormItem label="Descripción de la observación">
                        {getFieldDecorator('observacion', {
                            rules: [{required: true, message: 'La observación debe llevar una descripción'},{min: 5, message: 'El minimo de caracteres es de 5.'}, {max: 500, message: 'El mensaje debe tener como maximo 500 caracteres.'}]
                        })(<Input.TextArea style={{ width: '100%' }} placeholder="Descripción de la observacion..." rows={4}/>)}
                    </FormItem>
                </Form>
            </Modal>
        );
    })
)

export default class FormAddObservacionSeguimiento extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            id_seguimiento: props.id_seguimiento,
            usuario: props.usuario
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, id_seguimiento, usuario} = nextProps;
        this.setState({
            visible,
            id_seguimiento,
            usuario
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        const form = this.form;
        form.resetFields();
        this.setState({ visible: false });
        
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            // console.warn('oaqui', this.state.usuario.id_docente)
            // crear post al servidor
            axios.post('/api/proyecto/seguimiento/observacion', {
                observacion: values.observacion,
                id_seguimiento: this.state.id_seguimiento,
                id_docente: this.state.usuario.id_docente
            }).then((res) => {
                // console.log(res)
                if(res.status === 200){
                    message.success("Observación agregada correctamente")
                    this.setState({ visible: false });
                    form.resetFields();
                    this.props.updateSeguimientos();
                    this.props.updateProyecto();
                }else{
                    Modal.error({
                        title: 'Error al agregar la observación. Revisar los siguientes campos',
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
        // console.warn('Aqui merengues',this.state.usuario)
        return(
            <div>

                <CreateFormObservacionSeguimiento
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
