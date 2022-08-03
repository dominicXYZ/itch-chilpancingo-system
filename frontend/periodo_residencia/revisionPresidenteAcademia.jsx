import React, {Component} from 'react';
import {message, Modal, Row, Col, Select, Table, Button, Input, Icon, Popconfirm, Switch, Popover} from 'antd';
const {Option, OptGroup}  = Select;
import PDF2 from 'react-pdf-js-infinite';
import axios from 'axios';
import moment from 'moment';

export default class RevisionPresidenteAcademia extends Component{
    constructor(props){
        super(props);
        this.state = {
            anteproyectos: props.anteproyectos,
            filterAnteproyectos: props.anteproyectos,
            usuario: props.usuario,
            periodo: props.periodo,
        }
    }
    componentWillReceiveProps(nextProps){
        this.state = {
            anteproyectos: nextProps.anteproyectos,
            filterAnteproyectos: nextProps.anteproyectos,
            usuario: nextProps.usuario,
            periodo: nextProps.periodo
        }
    }
    
    // TABLE
    onInputChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    onSearch = () => {
        const {searchText, anteproyectos} = this.state
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            visible: false,
            filterDropdownVisible: false,
            filtered: !!searchText,
            filterAnteproyectos: anteproyectos.map((record) => {
                // console.warn(record)
                const match = record.nombre ? record.nombre.match(reg) : null;
                
                 if(!match){
                     return null;
                 }
                 return {
                     ...record,
                     nombre: (
                         <span>
                             {record.nombre.split(reg).map((text, i) => (
                                 i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                             ))}
                         </span>
                     )
                 }
            }).filter(record => !!record),   
        })
    }
    showAsesorExterno = (detalles_asesor_externo) => {
        Modal.info({
            width: 600,
            title: `Detalles del asesor externo`,
            content: (
                <Row gutter={16}>
                    <p >Nombre:</p>
                    <Input readOnly value={detalles_asesor_externo.nombre}></Input>
                    <p style={{marginTop: 10}} >Puesto:</p>
                    <Input readOnly value={detalles_asesor_externo.puesto}></Input>
                    <p style={{marginTop: 10}} >Correo:</p>
                    <Input readOnly value={detalles_asesor_externo.usuario.correo}></Input>
                    <p style={{marginTop: 10}}> Empresa</p>
                    <Input readOnly value={detalles_asesor_externo.empresa.nombre}></Input>
                </Row>
            ), onOk(){},
        });
    }
    showAlumno = (alumno) => {
        Modal.info({
            width: 600,
            title: `Detalles del alumno`,
            content: (
                <Row gutter={16}>
                    <p >Numero de control:</p>
                    <Input readOnly value={alumno.no_control}></Input>
                    <p style={{marginTop: 10}} >Nombre:</p>
                    <Input readOnly value={`${alumno.nombre} ${alumno.ap_paterno} ${alumno.ap_materno}`}></Input>
                </Row>
            ), onOk(){},
        });
    }
    
    showAnteproyecto = (filename) => {
        Modal.info({
            maskClosable: true,
            width: '85%',
            title: `Anteproyecto`,
            content: (
                <div>
                    {/* <PDF className="pdf" file="/api/anteproyecto/pdf/9f3d7eb9866269c6793c64f1ff5a3c19" /> */}
                    <PDF2 file={`/api/anteproyecto/pdf/${filename}`} scale={1.5} />
                </div>
            ), onOk(){}
        });
    }
    handleDictamen = (anteproyecto, isCheck) => {
        const dictamen = (isCheck) ? 'aprobado' : 'no aprobado';
        // validar que existan nombre_anteproyecto, asesor_interno y externo
        const nombre_anteproyecto = anteproyecto.nombre,
            asesor_interno = anteproyecto.asesor_interno,
            asesor_externo = anteproyecto.detalles_asesor_externo;
        if(nombre_anteproyecto === null){
            message.warn('Para completar el proceso, falta el nombre del anteproyecto.')
        }else if(asesor_externo === null){
            message.warn('Para completar el proceso, falta el asesor externo.')
        }else if(asesor_interno === null){
            message.warn('Para completar el proceso, falta el asesor interno.')
        }else{
            axios.put('/api/anteproyecto/set_dictamen',{id_anteproyecto: anteproyecto.id, dictamen})
                .then(res => {
                    if(res.status === 200 ){
                        message.success('Anteproyecto actualizado!')
                    }else{
                        Modal.error({
                            title: 'Error al actualizar anteproyecto. Revisar los siguientes campos',
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
        }
        
    }
    handleAsesorInterno = (id_asesor_interno, id_anteproyecto) => {
        axios.put('/api/anteproyecto/set_asesor_interno', {
            id_asesor_interno, id_anteproyecto
        }).then(res => {
            if(res.status === 200 ){
                message.success('Anteproyecto actualizado!')
                // window.location.reload();
                this.props.updatePeriodo();
            }else{
                Modal.error({
                    title: 'Error al actualizar anteproyecto. Revisar los siguientes campos',
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
    }
    render(){
        const {anteproyectos, filterAnteproyectos, periodo} = this.state
        // console.warn(periodo.anteproyectos)
        const fecha_inicio_entrega = periodo.fecha_inicio_entrega_anteproyecto,
            fecha_fin_entrega = periodo.fecha_fin_entrega_anteproyecto;
        const currentDate = moment().format('YYYY-MM-DD');
        // console.log(fecha_inicio_entrega)
        // console.log(fecha_fin_entrega)
        // console.log(currentDate)
            
        var columns = [
            {
                width: 200,
                fixed: 'left',
                className: 'center-text',
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input 
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar por nombre de anteproyecto"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>Buscar</Button>
                    </div>
                ),
                filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                        visible: false
                    }, () => this.searchInput.focus())
                }               
            }, 
            {
                className: 'center-text',
                title: 'Objetivo general',
                dataIndex: 'objetivo_general',
                key: 'objetivo_general'
            },{
                className: 'center-text',
                title: 'Asesor externo',
                dataIndex: 'detalles_asesor_externo',
                key: 'detalles_asesor_externo',
                render: (text, record) => (
                    <span>
                        <Button  icon="contacts" onClick={() => this.showAsesorExterno(record.detalles_asesor_externo)}></Button>
                    </span>
                )
            },{
                className: 'center-text',
                title: 'Alumno',
                dataIndex: 'detalles_alumno',
                key: 'detalles_alumno',
                render: (text, record) => (
                    <span>
                        <Button  icon="solution" onClick={() => this.showAlumno(record.detalles_alumno)}></Button>
                    </span>
                )
            },{
                className: 'center-text',
                title: 'Anteproyecto',
                dataIndex: 'anteproyecto',
                key: 'anteproyecto',
                render: (text, record) => (
                    <span>
                        <Button style={{color:'#ff5757', marginRight: 3}} icon="file-pdf" onClick={() => this.showAnteproyecto(record.anteproyecto)}></Button>
                        <a style={{ color:'#ff5757', marginLeft: 3}} target="_blank" href={`/api/anteproyecto/pdf/${record.anteproyecto}`}><Icon type="select" /></a>
                    </span>
                )
            },
            {
                className: 'center-text',
                title: '% de factiblidad',
                dataIndex: 'porcentaje_factibilidad',
                key: 'porcentaje_factibilidad',
                render: (text, record) => (
                    <span>
                        <Popover content={record.revisiones} title="Revisión de docentes">
                            <p style={{color: '#4da1ff'}}>{`${record.porcentaje_factibilidad} %`}</p>
                        </Popover>
                        
                    </span>
                )
            },
            {
                width: 150,
                className: 'center-text',
                title: 'Dictamen',
                dataIndex: 'dictamen',
                key: 'dictamen',
                render: (text, record) => (
                    <span>
                        {(fecha_inicio_entrega <= currentDate && fecha_fin_entrega >= currentDate) ?
                            <Switch checkedChildren="Aprobado" defaultChecked={(record.dictamen === 'aprobado') ? true : false} unCheckedChildren="No aprobado" onChange={(checked) => this.handleDictamen(record, checked)} />
                        : <p style={{color: '#ff5757'}}>La fecha de revisión finalizo</p>}
                    </span>
                )
            },
            {
                width: 300,
                className: 'center-text',
                title: 'Asesor interno',
                dataIndex: 'asesor_interno',
                key: 'asesor_inteno',
                render: (text, record) => (
                    <span>
                        <Select 
                            placeholder="Seleccionde al asesor interno"
                            style={{ width: '80%' }}
                            onChange={(id_asesor_interno) => this.handleAsesorInterno(id_asesor_interno, record.id)}
                            defaultValue={record.asesor_interno ? `${record.asesor_interno.id}` : null}
                        >
                            {periodo.carrera.docentes_carreras.map((_docente, index) => {
                                return <Option key={index} value={`${_docente.docente.id}`}>{`${_docente.docente.titulo} ${_docente.docente.nombre} ${_docente.docente.ap_paterno} ${_docente.docente.ap_materno}`}</Option>
                            })}
                        </Select>
                    </span>
                )
            }
        ]
        return (
            <Row type="flex" justify="center" align="middle" style={{marginTop: 20}}>
                <Col xs={24} lg={24}>
                    <Table bordered title={() => 'Registro de dictamen y selección de asesores internos'} dataSource={filterAnteproyectos} className="full-width" columns={columns} pagination={{ pageSize: 8 }}  scroll={{ x: 2500 }} />
                </Col>
            </Row> 
        )
    }

}