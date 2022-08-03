import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input, Radio,Select, Icon, message,Slider } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import axios from 'axios';

const CreateFormEvaluacion = Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form, criterios, proyecto} = props;
        const { getFieldDecorator} = form;
        // console.warn('=>>',proyecto)
        return(
            <Modal
                visible={visible}
                title={`Evaluación de residencia profesional`}
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
                                        initialValue: proyecto.evaluacion_asesor_externo !== null?proyecto.evaluacion_asesor_externo.criterios_de_evaluacion.find(_eval => _eval.id_criterio == criterio.id).valor_de_evaluacion:null
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
                            initialValue: proyecto.evaluacion_asesor_externo !== null?proyecto.evaluacion_asesor_externo.observaciones:null
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

export default class FormEvaluacion extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: props.visible,
            criterios: props.criterios_evaluacion,
            proyecto: props.proyecto
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, criterios_evaluacion, proyecto} = nextProps;
        this.setState({
            visible: visible,
            criterios: criterios_evaluacion,
            proyecto
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
            axios.put('/api/proyecto/evaluacion/asesor_externo', {
                id_proyecto: this.state.proyecto.id,
                observaciones: values.observaciones,
                criterios_evaluacion: values,
                criterios: this.state.criterios
            }).then((res) => {
                if(res.status === 200){
                    message.success("Evaluación guardada!")
                    this.props.updateProyecto();
                    this.setState({ visible: false });
                    form.resetFields();
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
        // console.warn('=>>',this.state.proyecto)
        return(
            <div>

                <CreateFormEvaluacion
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    criterios={this.state.criterios}
                    proyecto={this.state.proyecto}
                />
            </div>
        )
    }
}
