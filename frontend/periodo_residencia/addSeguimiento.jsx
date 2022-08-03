import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Modal, Form, Input,Icon, message, DatePicker} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;


import axios from 'axios';
import moment from 'moment';


const CreateFormAddSeguimiento= Form.create()(
    (props => {
        const { visible, onCancel, onCreate, form} = props;
        const { getFieldDecorator} = form;
        const rangeConfigPeriodoSeguimiento = {
            rules: [{ type: 'array', required: true, message: 'Seleccione la fecha de inicio y fin del seguimiento' }],
        };  
        return(
            <Modal
                visible={visible}
                title="Agregar seguimiento de residencia"
                okText="Guardar"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical" style={{width: '100%'}}>
                    <FormItem
                        label="Seleccione la fecha de inicio y fin del seguimiento"
                        style={{width: '100%'}}
                        >
                        {getFieldDecorator('fechas_seguimiento', rangeConfigPeriodoSeguimiento)(
                            <RangePicker format="ll" 
                           // disabledDate={current => current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')} 
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    })
)

export default class FormAddSeguimiento extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_periodo: props.id_periodo, 
            visible: props.visible,
        }
    }
    componentWillReceiveProps(nextProps) {
        const {visible, id_periodo} = nextProps;
        this.setState({
            id_periodo: id_periodo,
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

            const fecha_inicial = values.fechas_seguimiento[0].format('YYYY-MM-DD'),
                fecha_final = values.fechas_seguimiento[1].format('YYYY-MM-DD'),
                id_periodo = this.state.id_periodo;
            // console.log('Received values of form: ', values);
            // console.log('id_periodo', this.state.id_periodo);
            // crear post al servidor
            axios.post('/api/periodo/seguimiento', {
                id_periodo,
                fecha_inicial,
                fecha_final
            }).then(res => {
                if(res.status === 200 ){
                    message.success('Seguimiento agregado satisfactoriamente!')
                    form.resetFields();
                    this.setState({
                        visible: false
                    })
                }else{
                    Modal.error({
                        title: 'Error al agregar el seguimiento. Revisar los siguientes campos',
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
                <CreateFormAddSeguimiento
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}
