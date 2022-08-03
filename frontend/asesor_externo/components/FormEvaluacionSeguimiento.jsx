import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message,Slider } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormEvaluacionSeguimiento = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, criterios, seguimiento} = props;
        const { getFieldDecorator} = form;
        return(
            <Modal
                visible={visible}
                title={`Evaluación de seguimiento de residencia`}
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
                width={600}
                style={{top: 20}}
            >
                <Form layout="vertical">
                    {
                        criterios !== null ? 
                        criterios.map((criterio, index) => {
                            return (
                                <FormItem key={index} label={`${(index+1)}. ${criterio.descripcion}`} style={{width: '100%'}}>
                                    {getFieldDecorator(`${criterio.id}`, {
                                        rules: [{required: true, message: 'La pregunta debe tener un valor de evaluación.'}],
                                        initialValue: seguimiento.evaluacion_asesor_externo !== null?seguimiento.evaluacion_asesor_externo.criterios_de_evaluacion.find(_eval => _eval.id_criterio == criterio.id).valor_de_evaluacion:null
                                    })(<Select placeholder="" >
                                        {Array((criterio.valor_max+1)).fill(1).map((e, i) => {
                                                return <Option key={i} value={`${i}`}>{i}</Option>
                                        })}
                                    </Select>)}
                                </FormItem>
                            )
                        })
                        : null
                    }
                    <FormItem label="Observaciones" style={{width: '100%'}}>
                        {getFieldDecorator('observaciones', {
                            rules: [{min: 5, message: 'El minimo de caracteres es de 5.'}, {max: 500, message: 'Las observaciones debe tener como maximo 500 caracteres.'}],
                            initialValue: seguimiento.evaluacion_asesor_externo !== null?seguimiento.evaluacion_asesor_externo.observaciones:null
                        })(
                            <Input.TextArea placeholder="Escriba aquí sus observaciones" type="text" autosize={{ minRows: 2, maxRows: 6 }}/>
                        )
                        }
                    </FormItem>
                </Form>

            </Modal>
        );
    })
)

export default class FormEvaluacionSeguimiento extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            criterios: props.criterios_evaluacion,
            seguimiento: props.seguimiento
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, criterios_evaluacion, seguimiento} = nextProps;
        this.setState({
            visible: visible,
            criterios: criterios_evaluacion,
            seguimiento
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
        // this.form.resetFields();
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            // crear post al servidor
            axios.put('/api/proyecto/evaluacion_seguimiento/asesor_externo', {
                id_seguimiento: this.state.seguimiento.id,
                observaciones: values.observaciones,
                criterios_evaluacion: values,
                criterios: this.state.criterios
            }).then((res) => {
                if(res.status === 200){
                    message.success("Evaluación del seguimiento guardada!")
                    this.setState({ visible: false });
                }else{
                    Modal.error({
                        title: 'Error al guardar la evaluación. Revisar los siguientes campos',
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

                <CreateFormEvaluacionSeguimiento
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    criterios={this.state.criterios}
                    seguimiento={this.state.seguimiento}
                />
            </div>
        )
    }
}
