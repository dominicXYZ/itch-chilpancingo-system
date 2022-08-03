import React, {Component} from 'react';
import {Card, Icon, Form, Input, Button, Row, Col, Upload, Modal, Tooltip, Table, Switch, message, Tabs, Alert, Select} from 'antd';
import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';
const { Item } = Form;
const TabPane = Tabs.TabPane;

import FormEvaluacionSeguimiento from './FormEvaluacionSeguimiento.jsx';

export default class Seguimiento extends Component{
    constructor(props){
        super(props);
        this.state = {
            numero: props.numero,
            seguimiento: props.seguimiento,
            proyecto: props.proyecto,
            criterios_evaluacion_seguimiento: null,
            visibleEvaluacionSeguimientoAsesorExterno: false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            numero: nextProps.numero,
            proyecto: nextProps.proyecto,
            seguimiento: nextProps.seguimiento,
            visibleEvaluacionSeguimientoAsesorExterno: false,
            criterios_evaluacion_seguimiento: null
        })
    }
    showEvaluacionSeguimientoAsesorExterno = (alumno) => {
        axios.get('/api/proyecto/evaluacionAnexoXXIX/criterios/asesor_externo/')
            .then(res => {
                if(res.status === 200){
                    // console.warn('cri', res.data)
                    this.setState({
                        criterios_evaluacion_seguimiento: res.data,
                        visibleEvaluacionSeguimientoAsesorExterno: true
                    })
                }else{
                    message.warn('Error al realizar petición de criterios de evaluación, favor de reportar al administrador.')
                }
            })
    }
    render(){
        const {criterios_evaluacion_seguimiento, visibleEvaluacionSeguimientoAsesorExterno, seguimiento, numero, proyecto} = this.state;
        return (
                <Col xs={24} lg={24}>
                    <h2 style={{marginTop: 20, marginBottom: 10}} className="border-top" >{`Seguimiento ${(numero+1)}`}</h2>
                    {seguimiento.url_seguimiento ? 
                        <div style={{marginTop: 10, marginBottom: 10}}>
                            <p>Link del seguimiento: </p>
                            <Upload 
                                defaultFileList= {
                                    [{
                                        uid: -2,
                                        name: 'seguimiento de residencia',
                                        status: 'done',
                                        url: seguimiento.url_seguimiento
                                    }]
                                }
                            />
                        </div>
                    : 
                        <Alert style={{marginTop: 10, marginBottom: 10}} message="El alumno no ha subido el avance de su seguimiento de residencia" type="warning" showIcon/>
                    }
                    {
                        seguimiento.url_seguimiento
                        ?
                            <div style={{marginTop: 10, marginBottom: 10}}>
                                <Button style={{marginBottom: 30}} onClick={() => this.showEvaluacionSeguimientoAsesorExterno(proyecto.anteproyecto.alumno)} icon="bars" type="primary">Realizar evaluación</Button>
                                <FormEvaluacionSeguimiento key={uuid.v4()} seguimiento={seguimiento} visible={visibleEvaluacionSeguimientoAsesorExterno} criterios_evaluacion={criterios_evaluacion_seguimiento}/>
                            </div>
                        :
                            <Alert style={{marginTop: 10, marginBottom: 10}} message="El alumno debe subir su avance del seguimiento de residencia para continuar con el proceso de evaluación" type="warning" showIcon/>
                    }
                </Col>
        )
    }
}


