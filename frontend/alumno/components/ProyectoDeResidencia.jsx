import React, { Component } from 'react';
import { Card, Icon, Form, Input, Button, Row, Col, Timeline, Table, Alert, Badge, Modal } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Item } = Form;


// components
import WrappedFormPlanTrabajo from '../../periodo_residencia/plan_trabajo.jsx';
import WrappedCronograma from '../../periodo_residencia/cronograma.jsx';

export default class ProyectoDeResidencia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyecto: props.proyecto
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            proyecto: nextProps.proyecto
        })
    }
    render() {
        const { proyecto } = this.state;
        console.log('proyecto => ', this.state.proyecto)


        const columnasAsesoria = [
            {
                className: 'center-text',
                title: 'Actividad',
                dataIndex: 'actividad',
                key: 'actividad'
            },
            {
                className: 'center-text',
                title: 'Cantidad de semanas',
                dataIndex: 'cantidad_semanas',
                key: 'cantidad_semanas'
            },
            
            {
                className: 'center-text',
                title: 'Resultados',
                dataIndex: 'resultados',
                key: 'resultados'
            },
            
            {
                className: 'center-text',
                title: 'Observaciones',
                dataIndex: 'Obseraciones',
                key: 'obseraciones',
                render: (text, record) => (
                    <span>
                        <Badge count={record.soluciones_recomendadas.filter(solucion => {
                            console.log(solucion);
                            return !solucion.solucionado
                        }).length} >
                            <Button onClick={()=> this.showSolucionesRecomendadas(record.soluciones_recomendadas)}>Ver soluciones</Button>
                        </Badge>
                    </span>
                )
            }
        ]
  
        /*
        const actividades = proyecto.actidades.map((asesoria, index) => {
            return {
                key: uuid.v1(),
                actividad: asesoria.actividad,
                cantidad_semanas: asesoria.cantidad_semanas,
                resultados: asesoria.resultados,
                observaciones: asesoria.observaciones
            }
        })
*/


        return (
            <div>
                <Form>
                    <Item label="Título">
                        <Input value={proyecto.anteproyecto.nombre} readOnly />
                    </Item>
                    <Item label="Objetivo general">
                        <Input value={proyecto.anteproyecto.objetivo_general} readOnly />
                    </Item>

                    <Item label="Anteproyecto">
                        <a style={{ color: '#4da1ff' }} href={`/api/anteproyecto/pdf/${proyecto.anteproyecto.path_file_anteproyecto}`} target="_blank"> Ver anteproyecto <Icon type="file-pdf" style={{ color: '#4da1ff' }} /></a>
                    </Item>
                </Form>
                {/* divider */}
                <Row className="border-top">
                    <Col xs={24} lg={24}>
                        <h2 style={{ marginBottom: 20 }}>Plan de trabajo</h2>
                        <a style={{ color: '#4da1ff' }} href="/plantillas/plan_de_trabajo.docx">Plantilla de plan de trabajo <Icon type="cloud-download" /></a>
                    </Col>
                    <Col xs={24} lg={12}>
                        <WrappedFormPlanTrabajo proyecto={proyecto} />
                    </Col>
                    <Col xs={24} lg={12} >
                        <p style={{ marginLeft: 40, marginBottom: 15 }}>Observaciones del plan de trabajo</p>
                        <Timeline className="center-block" style={{ marginLeft: 40, overflow: 'scroll', height: 180, paddingLeft: 20, paddingTop: 20 }}>
                            {proyecto.observaciones.filter(obs => obs.tipo === 'plan_de_trabajo').map((observacion, index) => {
                                return (
                                    <Timeline.Item key={index} color={observacion.solucionada ? 'green' : 'red'} dot={observacion.solucionada ? <Icon type="check-circle-o" /> : <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                                        {observacion.observacion}
                                    </Timeline.Item>
                                )
                            }
                            )}
                        </Timeline>
                    </Col>
                </Row>
                <Row className="border-top">

                    <Col xs={24} lg={24}>
                        <h2 style={{ marginBottom: 20 }}>Cronograma</h2>
                        <a style={{ color: '#4da1ff' }} href="/plantillas/cronograma.docx">Plantilla de cronograma de actividades <Icon type="cloud-download" /></a>
                    </Col>
                    <Col xs={24} lg={12}>
                        <WrappedCronograma proyecto={proyecto} />
                    </Col>
                    <Col xs={24} lg={12} >
                        <p style={{ marginLeft: 40, marginBottom: 15 }}>Observaciones del cronograma de actividades</p>
                        <Timeline className="center-block" style={{ marginLeft: 40, overflow: 'scroll', height: 180, paddingLeft: 20, paddingTop: 20 }}>
                            {proyecto.observaciones.filter(obs => obs.tipo === 'cronograma').map((observacion, index) => {
                                return (
                                    <Timeline.Item key={index} color={observacion.solucionada ? 'green' : 'red'} dot={observacion.solucionada ? <Icon type="check-circle-o" /> : <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                                        {observacion.observacion}
                                    </Timeline.Item>
                                )
                            }
                            )}
                        </Timeline>
                    </Col>
                </Row>



                <Row>
                    <Col xs={24} lg={24}>
                        <Button icon="plus" type="primary" onClick={this.showAddAsesoria}>Agregar actividad</Button>
                    </Col>
                    
                    <Col xs={24} lg={24}>
                        <Table title={()=> 'Lista de actividades registradas'} columns={columnasAsesoria}  pagination={{ pageSize: 5 }} scroll={{x: 1200}}/>
                    </Col>
                </Row>

            </div>
        )
    }
}