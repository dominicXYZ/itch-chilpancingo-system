import React, {Component} from 'react';
import {message, Modal, Row, Col, Select, Table, Button, Input, Icon, Popconfirm, Switch, Form} from 'antd';
const {Option, OptGroup}  = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
import PDF2 from 'react-pdf-js-infinite';

import axios from 'axios';
import moment from 'moment';

// components
import FormCorreccion from './FormCorreccion.jsx';

export default class RevisionDocente extends Component{
    constructor(props){
        super(props);
        this.state = {
            periodo: props.periodo,
            anteproyectos: props.anteproyectos,
            filterAnteproyectos: props.anteproyectos,
            usuario: props.usuario,
            visible_correcciones: false,
            props_correcciones: {
                id_docente: null,
                id_anteproyecto: null,
                correo_alumno: null
            }
        }
        // console.wa
    }
    componentWillReceiveProps(nextProps){
        this.state = {
            periodo: nextProps.periodo,
            anteproyectos: nextProps.anteproyectos,
            filterAnteproyectos: nextProps.anteproyectos,
            usuario: nextProps.usuario,
            visible_correcciones: false,
            props_correcciones: {
                id_docente: null,
                id_anteproyecto: null,
                correo_alumno: null
            }
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
                console.warn('record=> ',record)
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
    showInputCorreccion(id_anteproyecto, correo_alumno) {
        this.setState({
            visible_correcciones: true,
            props_correcciones:{
                id_docente: this.state.usuario.id_docente,
                id_anteproyecto: id_anteproyecto,
                correo_alumno: correo_alumno
            }
        })   
    }
    handleFactible(id_anteproyecto, checked){
        axios.put('/api/anteproyecto/factibilidad', {
            id_docente: this.state.usuario.id_docente,
            id_anteproyecto: id_anteproyecto,
            esFactible: checked ? 'factible' : 'no_factible'
        }).then(res => {
            if(res.status === 200 ){
                message.success('Anteproyecto actualizado !')
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
        const fecha_inicio_entrega = periodo.fecha_inicio_entrega_anteproyecto,
            fecha_fin_entrega = periodo.fecha_fin_entrega_anteproyecto;
        const currentDate = moment().format('YYYY-MM-DD');
        // console.warn(anteproyectos)
        console.warn(')>', filterAnteproyectos);

        const columns = [
            {
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
                title: 'Factible',
                dataIndex: 'factible',
                key: 'factible',
                render: (text, record) => (
                    <span>
                        {(fecha_inicio_entrega <= currentDate && fecha_fin_entrega >= currentDate) ?
                        <span>
                            <Switch style={{marginRight: 3, marginBottom: 3}} defaultChecked={(record.revision && (record.revision.esFactible === 'factible')) ? true : false} checkedChildren="Factible" unCheckedChildren={<Icon type="cross" />} onChange={(checked) => this.handleFactible(record.id, checked)} />
                            <Button style={{marginLeft: 3}} icon="exception" onClick={() => this.showInputCorreccion(record.id, record.detalles_alumno.usuario.correo)}>Correción</Button>
                        </span>
                        : <p style={{color: '#ff5757'}}>La fecha de revisión finalizo</p>
                        }
                    </span>
                )
            }
        ]
        return (
            <div>
            <Row type="flex" justify="center" align="middle" style={{marginTop: 20}}>
                <Col xs={24} lg={24}>
                    <Table bordered title={() => 'Anteproyectos registrados'} dataSource={filterAnteproyectos} className="full-width" columns={columns} pagination={{ pageSize: 8 }}  scroll={{ x: 2500 }} />
                </Col>
            </Row>
            <FormCorreccion visible={this.state.visible_correcciones} id_docente={this.state.props_correcciones.id_docente} id_anteproyecto={this.state.props_correcciones.id_anteproyecto} correo_alumno={this.state.props_correcciones.correo_alumno}/> 
            </div>
        )
    }

}