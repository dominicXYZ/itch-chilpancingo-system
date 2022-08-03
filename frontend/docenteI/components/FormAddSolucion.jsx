import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormAddSolucion = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form} = props;
        const { getFieldDecorator} = form;
        return(
            <Modal
                visible={visible}
                title={`Agregar solución recomendada`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Solución">
                        {getFieldDecorator('solucion', {
                            rules: [{required: true, message: 'La solucion debe llevar una descripción'},{min: 5, message: 'El minimo de caracteres es de 5.'}, {max: 500, message: 'El mensaje debe tener como maximo 500 caracteres.'}]
                        })(<Input.TextArea style={{ width: '100%' }} placeholder="Descripción de la solución.." rows={4}/>)}
                    </FormItem>
                </Form>
            </Modal>
        );
    })
)

export default class FormAddSolucion extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            id_asesoria: props.id_asesoria,
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, id_asesoria} = nextProps;
        this.setState({
            visible,
            id_asesoria
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
            axios.post('/api/proyecto/asesoria/solucion_recomendada', {
                solucion: values.solucion,
                id_asesoria: this.state.id_asesoria
            }).then((res) => {
                // console.log(res)
                if(res.status === 200){
                    message.success("Solución recomendada agregada correctamente")
                    this.setState({ visible: false });
                    form.resetFields();
                }else{
                    Modal.error({
                        title: 'Error al agregar la solución. Revisar los siguientes campos',
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

                <CreateFormAddSolucion
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
