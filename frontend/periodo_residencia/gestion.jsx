import React, {Component} from 'react';
import {message, Modal, Row, Col, Select, Table, Button, Avatar, DatePicker, Timeline, Icon, Popconfirm} from 'antd';
const Option = Select.Option;

import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';

// component
import FormAddAlumno from '../alumno/components/FormAddAlumno.jsx';
import FormAddSeguimiento from '../periodo_residencia/addSeguimiento.jsx';


export default class GestionPeriodoDeResidencia extends Component{
    constructor(props){
        super(props);
        this.state = {
            departamento: props.departamento,
            carreraSeleccionada: null,
            visible_add_alumno: false,
            visible_add_seguimiento: false,
            id_periodo: null,
            alumnos_rechazados_por_carrera: []
        }
    }
    handleCancelacion = (id_alumno) => {
        axios.put('/api/alumno/cancelacion', {
            id_alumno
        }).then(res => {
                if(res.status === 200){
                    message.success('Se ah realizado la cancelación del proyecto del alumno!')
                    this.setState({
                        visible_add_alumno: false,
                        visible_add_seguimiento: false,
                    })
                }else{
                    message.error('Ops, hubo un error al realizar la cancelación, favor de reportar al administrador.')
                }
            })
    }
    showListaCandidatosResidente = (id_periodo) => {
        axios.get(`/api/periodo/${id_periodo}/anteproyectos`)
            .then(res => {
                if(res.status === 200){
                    const candidatos = res.data.map((candidato, index) => {
                        return (
                                <div style={{overflowY: 100}}>
                                    <Timeline.Item  key={index} color="green" dot={<Icon type="check-circle-o" style={{ fontSize: '16px', marginTop: 10, marginLeft: 10}} />}>
                                        <p>{`${candidato.nombre} ${candidato.ap_paterno} ${candidato.ap_materno}`}</p>
                                        <Popconfirm title={(<span><p>¿Esta seguro de realizar la cancelación de proyecto?</p><p>al realizar esta acción, se borrara todo la información relacionada a este alumno</p><p>y se podra agregar al alumno a otro periodo.</p></span>)} onConfirm={() => this.handleCancelacion(candidato.id)} okText="Si" cancelText="Cancelar">
                                            <Button icon="user-delete" style={{marginTop: 5}} type="danger" >Realizar cancelación</Button>
                                        </Popconfirm>
                                    </Timeline.Item>
                                </div>
                        )
                    })
                    Modal.info({
                        width: 600,
                        title: 'Lista residentes del periodo.',
                        content: (
                            <Timeline>
                                {candidatos}
                            </Timeline>),
                        onOk(){}
                    })
                }
            })
        
    }
    showAddAlumno = (id_periodo) => {
        this.setState({
            visible_add_alumno: true,
            visible_add_seguimiento: false,
            id_periodo
        })
    }
    showAddSeguimiento = (id_periodo, fecha_fin) => {
        this.setState({
            visible_add_alumno: false,
            visible_add_seguimiento: true,
            id_periodo
        })
    }
    
    showSeguimientos = (seguimientos) => {
        console.warn(seguimientos);
        const seguimientos_map = seguimientos.map((seguimiento, key) => {
            return (
                <Timeline.Item key={key}>
                    <p><strong>{(key+1)}</strong> - Del {moment(seguimiento.fecha_inicial, 'YYYY-MM-DD').format('LL')} al {moment(seguimiento.fecha_final,'YYYY-MM-DD').format('LL')}</p>
                </Timeline.Item>
            )
        })
        
        Modal.info({
            title: 'Seguimientos',
            width: 600,
            content: (
                <Timeline>
                    {seguimientos_map}
                </Timeline>
            ),
            onOk(){}
        })
    }


    handleChageCarrera = (value) => {
        const {departamento} = this.state;
        const carrera = departamento.carreras.find((carrera) => `${carrera.id}` === value);
        axios.get(`/api/carrera/${carrera.id}/periodos`)
            .then(res => {
                if(res.status === 200){
                    // console.log('alv',res.data)
                    axios.get(`/api/alumnos/${carrera.id}/rechazados`)
                        .then(_res => {
                            if(_res.status === 200){
                                this.setState({
                                    alumnos_rechazados_por_carrera: _res.data._alumnos,
                                    carreraSeleccionada: res.data,
                                    visible_add_alumno: false,
                                    visible_add_seguimiento: false
                                })
                            }
                        })
                }else{
                    message.warning('Verificar conexión.')
                }
            })   
    }

    handleChangeFechaFinEntregaAnteproyecto = (fecha_fin_entrega_anteproyecto, id_periodo) => {
        axios.put('/api/periodo/fecha_fin_entrega_anteproyecto', {
            fecha_fin_entrega_anteproyecto: fecha_fin_entrega_anteproyecto.format('YYYY-MM-DD'),
            id_periodo
        }).then(res => {
            if(res.status === 200){
                // console.log('alv',res.data)
                message.success('Fecha de entrega de anteproyectos actualizada!')
                window.location.reload();
            }else{
                message.warning('Ups, verificar conexión.')
            }
        }) 
        
    }
    render(){
        const {departamento, carreraSeleccionada, visible_add_alumno, id_periodo, visible_lista_candidatos_residente, alumnos_rechazados_por_carrera, visible_add_seguimiento} = this.state
        const currentDate = moment().format('YYYY-MM-DD');
        const periodos = carreraSeleccionada ? carreraSeleccionada.periodos.map((periodo, index) => {
                return { 
                    id: periodo.id, 
                    key: uuid.v1(),
                    periodo: periodo.periodo,
                    ciclo: periodo.ciclo,
                    fecha_periodo: `${periodo.fecha_inicio} - ${periodo.fecha_fin}`,
                    fecha_fin: periodo.fecha_fin ,
                    fecha_inicio_entrega_anteproyecto: periodo.fecha_inicio_entrega_anteproyecto,
                    fecha_fin_entrega_anteproyecto:  periodo.fecha_fin_entrega_anteproyecto,
                    acciones: (moment().format('YYYY-MM-DD') >= periodo.fecha_inicio_entrega_anteproyecto && moment().format('YYYY-MM-DD') <= periodo.fecha_fin_entrega_anteproyecto) ? true : false,
                    lista_candidatos: 'on',
                    seguimientos: periodo.seguimientos
                }
        }): null;
        const columns = [
            {
                className: 'center-text',
                title: 'Periodo',
                key: 'periodo',
                dataIndex: 'periodo'
            }, 
            {
                className: 'center-text',
                title: 'Ciclo',
                key: 'ciclo',
                dataIndex: 'ciclo'
            },
            {
                className: 'center-text',
                title: 'Fecha de periodo',
                key: 'fecha_periodo',
                dataIndex: 'fecha_periodo'
            },
            {
                className: 'center-text',
                title: 'Fecha entrega anteproyectos',
                key: 'fecha_entrega_anteproyecto',
                dataIndex: 'fecha_entrega_anteproyecto',
                render: (text, record) => (
                    <span>
                        {record.fecha_inicio_entrega_anteproyecto} - <DatePicker onChange={(momentDate, stringDate) => {this.handleChangeFechaFinEntregaAnteproyecto(momentDate, record.id)}} disabledDate={current => (current.format('YYYY-MM-DD') > moment(record.fecha_fin, "YYYY-MM-DD").format('YYYY-MM-DD') || current.format('YYYY-MM-DD') < moment(record.fecha_inicio_entrega_anteproyecto, "YYYY-MM-DD").format('YYYY-MM-DD') ) } format="YYYY-MM-DD"  defaultValue={moment(record.fecha_fin_entrega_anteproyecto, "YYYY-MM-DD")}/>
                    </span>
                )
            },
            {
                className: 'center-text',
                title: 'Seguimientos',
                key: 'seguimientos',
                dataIndex: 'seguimientos',
                render: (text, record) => (
                    <div>
                        <Button style={{marginRight: 2, marginLeft: 2}} type="primary" icon="bars" onClick={() => this.showSeguimientos(record.seguimientos)}>Lista</Button>
                        {(currentDate > record.fecha_fin) ? '' :
                        <Button style={{marginRight: 2, marginLeft: 2}} icon="plus" onClick={() => this.showAddSeguimiento(record.id, record.fecha_fin)}>Seguimiento</Button>
                        }
                    </div>
                )
            },
            {
                className: 'center-text',
                title: 'Agregar candidato',
                key: 'acciones',
                dataIndex: 'Acciones',
                render: (text, record) => (
                    <span>
                        {(record.acciones === true) ? <Button style={{marginRight: 5}} icon="user-add" onClick={() => this.showAddAlumno(record.id)}>Candidato a residente</Button> : <p style={{color:'#ff5757' }}>Deshabilitado, revisar fechas.</p>}
                    </span>
                )
            }, {
                className: 'center-text',
                title: 'Lista de candidatos',
                key: 'lista_candidatos',
                dataIndex: 'lista_candidatos',
                render: (text, record) => (
                    <span>
                        <Button icon="solution" onClick={() => this.showListaCandidatosResidente(record.id)}></Button>
                    </span>
                )
            }
        ]
        return (
            <Row gutter={16}>
                <Col xs={24} lg={4}>
                        <p>Seleccione la carrera: </p>
                        <Select
                            placeholder="Seleccione una carrera"                           
                            style={{width: '100%'}}
                            onChange={this.handleChageCarrera}
                        > 
                            {departamento.carreras.map((carrera, index) => {return <Option key={index} value={`${carrera.id}`} >{carrera.nombre}</Option>})}
                        </Select>
                </Col>
                <Col xs={24} lg={20}>
                    <Table bordered title={() => 'Gestión de periodos'} dataSource={periodos} className="full-width" columns={columns} pagination={{ pageSize: 8 }}  scroll={{ x: 1500 }} />
                </Col>
                
                <FormAddAlumno visible={visible_add_alumno} carrera={carreraSeleccionada} id_periodo={id_periodo} alumnos_rechazados_por_carrera={alumnos_rechazados_por_carrera}/>
                <FormAddSeguimiento visible={visible_add_seguimiento} id_periodo={id_periodo}/>
            </Row>

            
        )
    }
}