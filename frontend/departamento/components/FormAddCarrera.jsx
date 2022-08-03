import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormAddCarrera = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, departamento} = props;
        const { getFieldDecorator} = form;
        return(
            <Modal
                visible={visible}
                title={`Agregar carrera al departamento de ${departamento.nombre_departamento}`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Nombre de la carrera">
                        {getFieldDecorator('nombre', {
                            rules: [{required: true, message: 'La carrera debe tener un nombre'}]
                        })(<Input  style={{ width: '100%' }} placeholder="Nombre de la carrera"/>)}
                    </FormItem>
                </Form>

            </Modal>
        );
    })
)

export default class FormAddCarrera extends Component{
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
            axios.post('/api/carrera', {
                nombre: values.nombre,
                id_departamento: this.state.departamento.id_departamento,
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    message.success("Carrera agregada satisfactoriamente")
                    this.setState({ visible: false });
                    form.resetFields();
                }else{
                    Modal.error({
                        title: 'Error al guardar la carrera. Revisar los siguientes campos',
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
                    <CreateFormAddCarrera
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
