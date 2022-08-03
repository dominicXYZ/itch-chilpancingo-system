import React, {Component} from 'react';
import {message, Modal, Row, Col, Select, Table, Button, Input, Icon, Popconfirm, Badge} from 'antd';
const {Option, OptGroup}  = Select;

import axios from 'axios';
import moment from 'moment';
import PDF2 from 'react-pdf-js-infinite';
import uuid from 'uuid';

// components
import RevisionDocente from './revisionDocente.jsx';
import RevisionPresidenteAcademia from './revisionPresidenteAcademia.jsx';

export default class revisionAnteproyectos extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            usuario: props.usuario,
            departamento: props.departamento,
            renderRevision: null,
            id_periodo: null
        }
    }
    
    handleChangePeriodo = (id_periodo) => {
        axios.put('/api/carrera/docente_habilitado', {id_docente: this.state.usuario.id_docente, id_periodo: id_periodo})
            .then(_res => {
                if(_res.status === 200 && _res.data.habilitado === true){
                    // ROL DE DOCENTE
                    if(_res.data.rol === 'docente' ){
                        axios.get(`/api/periodo/${id_periodo}`)
                        .then(res =>{
                            if(res.status === 200){
                                // console.log('=>', res.data)
                                const anteproyectos = res.data.anteproyectos.map((anteproyecto, index) => {
                                    // console.warn(anteproyecto)
                                    return {
                                        key: uuid.v1(),
                                        id: anteproyecto.id,
                                        id_alumno: anteproyecto.id_alumno,
                                        dictamen: anteproyecto.dictamen,
                                        id_asesor_externo: anteproyecto.id_asesor_externo,
                                        id_periodo: anteproyecto.id_periodo,
                                        nombre: anteproyecto.nombre,
                                        objetivo_general: anteproyecto.objetivo_general,
                                        detalles_alumno: anteproyecto.alumno,
                                        detalles_asesor_externo: anteproyecto.asesor_externo,
                                        anteproyecto: anteproyecto.path_file_anteproyecto,
                                        revision: anteproyecto.revisiones.find((revision) => revision.id_docente === this.state.usuario.id_docente)
                                    }
                                })
                                
                                this.setState({
                                    renderRevision: <RevisionDocente periodo={res.data} usuario={this.state.usuario} anteproyectos={anteproyectos}/>
                                })
                            }
                        })
                    }else if(_res.data.rol === 'jefe_departamento'){
                        axios.get(`/api/periodo/${id_periodo}`)
                            .then(res =>{
                                if(res.status === 200){
                                    // console.log('=>', res.data)
                                    const anteproyectos = res.data.anteproyectos.map((anteproyecto, index) => {
                                        const count_factible =  anteproyecto.revisiones.filter((revision) => revision.esFactible === 'factible').length;
                                        const porcentaje_factibilidad = Number((count_factible * 100 / anteproyecto.revisiones.length).toFixed(1)) || 0
                                        // console.log('corr', anteproyecto.revisiones)
                                        const revisiones = (
                                            <span>
                                                {anteproyecto.revisiones.map((revision, key) => {
                                                    if(revision.esFactible === 'factible'){
                                                        return (
                                                            <p key={key}>
                                                            <Badge status="success" text={`${revision.docente.titulo} ${revision.docente.nombre} ${revision.docente.ap_paterno} ${revision.docente.ap_materno}`} />
                                                            </p>
                                                        )
                                                    }else if(revision.esFactible === 'corrección'){
                                                        return (
                                                            <p key={key}>
                                                            <Badge status="processing" text={`${revision.docente.titulo} ${revision.docente.nombre} ${revision.docente.ap_paterno} ${revision.docente.ap_materno}`} />
                                                            </p>
                                                        )
                                                    }else if(revision.esFactible === 'no_factible'){
                                                        return (
                                                            <p key={key}>
                                                            <Badge status="error" text={`${revision.docente.titulo} ${revision.docente.nombre} ${revision.docente.ap_paterno} ${revision.docente.ap_materno}`} />
                                                            </p>
                                                        )
                                                    }
                                                    
                                                })}
                                            </span>
                                        )
                                    
                                        return {
                                            key: uuid.v1(),
                                            id: anteproyecto.id,
                                            id_alumno: anteproyecto.id_alumno,
                                            dictamen: anteproyecto.dictamen,
                                            id_asesor_externo: anteproyecto.id_asesor_externo,
                                            id_periodo: anteproyecto.id_periodo,
                                            nombre: anteproyecto.nombre,
                                            objetivo_general: anteproyecto.objetivo_general,
                                            detalles_alumno: anteproyecto.alumno,
                                            detalles_asesor_externo: anteproyecto.asesor_externo,
                                            asesor_interno: anteproyecto.asesor_interno,
                                            anteproyecto: anteproyecto.path_file_anteproyecto,
                                            revisiones,
                                            porcentaje_factibilidad,
                                            dictamen: anteproyecto.dictamen
                                        }
                                    })

                                    this.setState({
                                        renderRevision: <RevisionPresidenteAcademia updatePeriodo={this.updatePeriodo.bind(this)} periodo={res.data} usuario={this.state.usuario} anteproyectos={anteproyectos}/>,
                                        id_periodo: id_periodo
                                    })
                                }
                            })
                    }
                    
                }else{
                    message.warning('Permiso denegado, solicite permisos al jefe de departamento.')
                }
            })
        
    }
    updatePeriodo = () =>{
        axios.get(`/api/periodo/${this.state.id_periodo}`)
        .then(res =>{
            if(res.status === 200){
                // console.log('=>', res.data)
                const anteproyectos = res.data.anteproyectos.map((anteproyecto, index) => {
                    const count_factible =  anteproyecto.revisiones.filter((revision) => revision.esFactible === 'factible').length;
                    const porcentaje_factibilidad = Number((count_factible * 100 / anteproyecto.revisiones.length).toFixed(1)) || 0
                    // console.log('corr', anteproyecto.revisiones)
                    const revisiones = (
                        <span>
                            {anteproyecto.revisiones.map((revision, key) => {
                                if(revision.esFactible === 'factible'){
                                    return (
                                        <p key={key}>
                                        <Badge status="success" text={`${revision.docente.titulo} ${revision.docente.nombre} ${revision.docente.ap_paterno} ${revision.docente.ap_materno}`} />
                                        </p>
                                    )
                                }else if(revision.esFactible === 'corrección'){
                                    return (
                                        <p key={key}>
                                        <Badge status="processing" text={`${revision.docente.titulo} ${revision.docente.nombre} ${revision.docente.ap_paterno} ${revision.docente.ap_materno}`} />
                                        </p>
                                    )
                                }else if(revision.esFactible === 'no_factible'){
                                    return (
                                        <p key={key}>
                                        <Badge status="error" text={`${revision.docente.titulo} ${revision.docente.nombre} ${revision.docente.ap_paterno} ${revision.docente.ap_materno}`} />
                                        </p>
                                    )
                                }
                                
                            })}
                        </span>
                    )
                
                    return {
                        key: uuid.v1(),
                        id: anteproyecto.id,
                        id_alumno: anteproyecto.id_alumno,
                        dictamen: anteproyecto.dictamen,
                        id_asesor_externo: anteproyecto.id_asesor_externo,
                        id_periodo: anteproyecto.id_periodo,
                        nombre: anteproyecto.nombre,
                        objetivo_general: anteproyecto.objetivo_general,
                        detalles_alumno: anteproyecto.alumno,
                        detalles_asesor_externo: anteproyecto.asesor_externo,
                        asesor_interno: anteproyecto.asesor_interno,
                        anteproyecto: anteproyecto.path_file_anteproyecto,
                        revisiones,
                        porcentaje_factibilidad,
                        dictamen: anteproyecto.dictamen
                    }
                })

                this.setState({
                    renderRevision: <RevisionPresidenteAcademia  updatePeriodo={this.updatePeriodo.bind(this)} periodo={res.data} usuario={this.state.usuario} anteproyectos={anteproyectos}/>,
                    id_periodo: this.state.id_periodo
                })
            }
        })
    }
    render(){
        const {departamento, renderRevision} = this.state
        return (
            <div>
                <Row type="flex">
                    <Col xs={24} lg={6}>
                        <p>Seleccione el periodo</p>
                        <Select 
                            onChange={this.handleChangePeriodo}
                            style={{width: '100%'}}
                        >   
                            {departamento.carreras.map((carrera, i) => {
                                return (
                                    <OptGroup key={i} label={carrera.nombre}>
                                        {carrera.periodos.map((periodo, j) => {
                                            return (<Option key={`${i}-${j}`} value={`${periodo.id}`}>{`${periodo.periodo} ${periodo.ciclo}`}</Option>)
                                        })}
                                    </OptGroup>
                                )
                            })}
                        </Select>
                    </Col>
                </Row>
                {renderRevision}                   
            </div>
        )
    }
}