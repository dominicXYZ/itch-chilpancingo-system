import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect} from 'react-router-dom';
import { Button, Modal, Form, Input, Icon, message} from 'antd';
const FormItem = Form.Item;
import axios from 'axios';


const CreateFormJustificacionCancelacion = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, cancelacion} = props;
        const { getFieldDecorator} = form;
        // console.log('cancelacion', cancelacion)

        return(
            <Modal
                visible={visible}
                title={`Justificación de cancelación del proyecto: ${cancelacion.nombre_proyecto}`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
                width={700}
            >
                <Form layout="vertical">
                    <FormItem label="Justificación de cancelación">
                        {getFieldDecorator('justificacion', {
                            rules: [{required: true, message: 'Debé describir la justificación de la cancelación del proyecto.'}],
                            initialValue: cancelacion.justificacion
                        })(<Input.TextArea autosize={{ minRows: 3, maxRows: 6 }} type="text" placeholder="Justificación..."/>)}
                    </FormItem>
                </Form>

            </Modal>
        );
    })
)

export default class FormJustificacionCancelacion extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            cancelacion: props.cancelacion
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, cancelacion} = nextProps;
        this.setState({
            visible,
            cancelacion
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
            axios.put('/api/alumno/cancelacion_justificacion', {
                id_cancelacion: this.state.cancelacion.id,
                justificacion: values.justificacion
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    // form.resetFields();
                    message.success("Justificación guardada satisfactoriamente")
                    this.setState({ visible: false});
                }else{
                    Modal.error({
                        title: 'Error al cambiar contraseña. Revisar los siguientes campos',
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
                <CreateFormJustificacionCancelacion
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    cancelacion={this.state.cancelacion}
                />
            </div>
        )
    }
}
