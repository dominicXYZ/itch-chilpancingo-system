import React, {Component} from 'react';

import {Row, Col, Button, Table, Icon, Alert, Badge, Modal, Timeline} from 'antd';
import moment from 'moment';
// components
import FormRegistrarAsesoria from './FormRegistrarAsesoria.jsx';
import uuid from 'uuid';

export default class RegistrarAsesoria extends Component{
    constructor(props){
        super(props);
        this.state = {
            proyecto: props.proyecto,
            visibleRegistrarAsesoria: false,
            usuario: props.usuario
        }
    }
    showAddAsesoria = () => {
        this.setState({
            visibleRegistrarAsesoria: true
        })
    }
    showTutorialSubirAsesoria = () => {
        Modal.info({
            width: 800,
            title: 'Tutorial para subir y compartir archivos en google drive',
            content: (
                <div>
                    <video
                        style={{width: '100%', marginTop: 10}}
                        controls
                        src="/video/upload_drive.mp4"
                    />
                </div>
            ), onOk(){}
        })
    }
    updateAsesorias = () => {
        this.props.updateAsesorias();
    }
    showSolucionesRecomendadas = (soluciones_recomendadas) => {
        Modal.info({
            width: 600,
            title: 'Soluciones recomendadas en la asesoría',
            content: (
                <div style={{overflow: 'scroll', height: 300}}>
                    <Timeline style={{marginTop: 30, marginLeft: 30}}>
                        {soluciones_recomendadas.map((solucion, index) => (
                            <Timeline.Item key={index} dot={solucion.solucionado?<Icon type="check-circle-o"/> : <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color={solucion.solucionado?'green':'red'}>{solucion.solucion}</Timeline.Item>
                        ))}
                    </Timeline>
                </div>
            ), 
            onOk(){}
        })
    }
    render(){

        const {proyecto, visibleRegistrarAsesoria, usuario} = this.state;
        // console.log('this',proyecto)
        const columnasAsesoria = [
            {
                className: 'center-text',
                title: 'Fecha de asesoría',
                dataIndex: 'fecha',
                key: 'fecha'
            },
            {
                className: 'center-text',
                title: 'Temas a asesorar',
                dataIndex: 'temas_a_asesorar',
                key: 'temas_a_asesorar'
            },
            {
                className: 'center-text',
                title: 'Avance',
                dataIndex: 'url_avance',
                key: 'url_avance',
                render: (text, record) => (
                    <a href={record.url_avance} target="_blank">Avance <Icon type="file-pdf"/></a>
                )
            },
            {
                className: 'center-text',
                title: 'Soluciones recomendadas',
                dataIndex: 'soluciones_recomendadas',
                key: 'soluciones_recomendadas',
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
            },
            {
                className: 'center-text',
                title: 'Tipo',
                dataIndex: 'tipo',
                key: 'tipo'
            },
            {
                width: 300,
                className: 'center-text',
                title: 'Formato de asesoría',
                dataIndex: 'formato_asesoria',
                key: 'formato_asesoria',
                render: (text, record) => (
                    <span>
                        {record.asesoria.permitir_generar_formato? 
                            <a  href={`/api/asesoria/${record.asesoria.id}/generar_formato/`} target="_blank"><Button icon="file-pdf" type="primary">Generar formato</Button></a>
                            : <Alert message="El asesor interno debe autorizar el formato" type="warning" showIcon />
                        }
                    </span>
                )
            }
        ]
        const asesorias = proyecto.asesorias.map((asesoria, index) => {
            return {
                key: uuid.v1(),
                fecha: moment(asesoria.fecha, 'YYYY-MM-DD').format('ll'),
                asesoria: asesoria,
                temas_a_asesorar: asesoria.temas_a_asesorar,
                url_avance: asesoria.url_avance,
                soluciones_recomendadas: asesoria.soluciones_recomendadas,
                tipo: asesoria.tipo
            }
        })
        return(
            <div>
                <Row>
                    <Col xs={24} lg={24}>
                        <Button icon="plus" type="primary" onClick={this.showAddAsesoria}>Agregar asesoría</Button>
                    </Col>
                    <Col xs={24} lg={24} style={{marginTop: 10}}>
                        <Button icon="video-camera" onClick={this.showTutorialSubirAsesoria} >Tutorial para subir archivos y compartir en drive</Button>
                    </Col>
                    <Col xs={24} lg={24}>
                        <Table title={()=> 'Lista de asesorías registradas'} columns={columnasAsesoria} dataSource={asesorias} pagination={{ pageSize: 5 }} scroll={{x: 1200}}/>
                    </Col>
                </Row>
                <FormRegistrarAsesoria updateAsesorias={this.updateAsesorias.bind(this)} proyecto={proyecto} visible={visibleRegistrarAsesoria}/>
            </div>
        )
    }
}