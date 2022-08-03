import React, {Component} from 'react';

import {Row, Col, Icon, Upload, Card, Form, Alert, Button, Table, Switch, message} from 'antd';

const {Item} = Form
import uuid from 'uuid';
import moment from 'moment';
import axios from 'axios';

// components
import FormAddObservacionSeguimiento from '../components/FormAddObservacionSeguimiento.jsx';
import FormEvaluacionSeguimiento from '../components/FormEvaluacionSeguimiento.jsx';

export default class RevisionSeguimiento extends Component{
    constructor(props){
        super(props);
        this.state = {
            seguimiento: props.seguimiento,
            visible_observacion: false,
            usuario: props.usuario,
            visibleEvaluacionAsesorInterno: false,
            criterios_evaluacion: []
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            seguimiento: nextProps.seguimiento,
            visible_observacion: false,
            usuario: nextProps.usuario,
            visibleEvaluacionAsesorInterno: false,
            criterios_evaluacion: []
        })
    }
    showAddObservacionSeguimiento(){
        this.setState({
            visible_observacion: true,
            visibleEvaluacionAsesorInterno: false,
        })
    }
    updateSeguimientos = () => {
        this.props.updateSeguimientos();
    }
    onChangeObservacion = (id_revision_seguimiento, check) => {
        axios.put(`/api/proyecto/revision_seguimiento`, {
            id_revision_seguimiento,
            solucionado: check
        }).then(res => {
            if(res.status === 200){
                message.success('La revisión se ha actulizado satisfactoriamente')
            }else{
                message.error('Error al actualizar la revisión, favor de reportar al administrador.')
            }
        })
    }
    updateProyecto = () => {
        this.props.updateProyecto();
    }
    showEvaluacionAsesorInterno = (alumno) => {
        axios.get('/api/proyecto/evaluacionAnexoXXIX/criterios/asesor_interno/')
            .then(res => {
                if(res.status === 200){
                    // console.warn('cri', res.data)
                    this.setState({
                        criterios_evaluacion: res.data,
                        visible_observacion: false,
                        visibleEvaluacionAsesorInterno: true
                    })
                }else{
                    message.warn('Error al realizar petición de criterios de evaluación, favor de reportar al administrador.')
                }
            })
    }
    render(){
        const {seguimiento, usuario, visible_observacion, visibleEvaluacionAsesorInterno, criterios_evaluacion} = this.state
        // console.warn('se', seguimiento)
        const observacionesSeguimiento = seguimiento.revisiones_seguimiento.map((revision, index) => {
            return{
                key: uuid.v1(),
                id: revision.id,
                observacion: revision.observacion,
                solucionado: revision.solucionado,
                fecha: moment(revision.createdAt).utc().format('LL'),
                docente: revision.docente
            }
        });
        const columnsObservacionesSeguimiento = [
            {
                className: 'center-text',
                title: 'Fecha de observación',
                dataIndex: 'fecha',
                key: 'fecha',
            },
            {
                title: 'Solucionado',
                dataIndex: 'solucionado',
                key: 'solucionado',
                render: (text, record) => (
                    <span>
                        {record.docente.id == usuario.id_docente
                            ? <Switch  onChange={(check) => this.onChangeObservacion(record.id, check)} defaultChecked={record.solucionado} checkedChildren="Solucionado" unCheckedChildren={<Icon type="cross" />} />
                            : <p>{record.solucionado? 'Si' : 'No'}</p>
                        }
                    </span>
                )
            },
            {
                className: 'center-text',
                title: 'Realizada por',
                dataIndex: 'docente',
                key: 'docente',
                render: (text, record) => (
                    <p>{`${record.docente.titulo} ${record.docente.nombre} ${record.docente.ap_paterno} ${record.docente.ap_materno}`}</p>
                )
            },
            {
                className: 'center-text',
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion',
            },
        ]
        return(
            <Row>
                <Col xs={24} lg={24} style={{marginTop: 20, marginBottom: 30}}>
                    {seguimiento.url_seguimiento ? 
                        <div>
                            <p>Link del seguimiento: </p>
                            <Upload 
                                defaultFileList= {
                                    [{
                                        uid: -2,
                                        name: 'Seguimiento',
                                        status: 'done',
                                        url: seguimiento.url_seguimiento
                                    }]
                                }
                            />
                        </div>
                    : 
                        <Alert message="El alumno no ha subido su seguimiento" type="warning" showIcon/>
                    }
                </Col>
                {
                    seguimiento.proyecto.anteproyecto.alumno.plan_estudios === '2015-2016' &&
                    <div>
                        <Col className="border-top" xs={24} lg={24}>
                            <h3>Evaluación del seguimiento de residencia</h3>
                            {
                                seguimiento.url_seguimiento 
                                ?
                                    <div>
                                        <Button style={{marginBottom: 30}} onClick={() => this.showEvaluacionAsesorInterno(seguimiento.proyecto.anteproyecto.alumno)} icon="bars" type="primary">Realizar evaluación</Button>
                                        <FormEvaluacionSeguimiento seguimiento={seguimiento} visible={visibleEvaluacionAsesorInterno} criterios_evaluacion={criterios_evaluacion}/>
                                    </div>
                                    
                                :
                                    <Alert message="El alumno debe subir el avance de su seguimiento para continuar con el proceso de evaluación" type="warning" showIcon/>
                            }
                        </Col>
                    </div>
                }
                
                <Col className="border-top" xs={24} lg={24} >
                    <Button type="primary" icon="plus" onClick={() => this.showAddObservacionSeguimiento()}>Agregar observación</Button>
                    <Table title={() => 'Observaciones del seguimiento'} columns={columnsObservacionesSeguimiento} dataSource={observacionesSeguimiento} pagination={{ pageSize: 4 }} />
                </Col>
                <FormAddObservacionSeguimiento updateProyecto={this.updateProyecto.bind(this)} updateSeguimientos={this.updateSeguimientos.bind(this)} usuario={usuario} visible={visible_observacion} id_seguimiento={seguimiento.id}/>
            </Row>
        )
    }
}