// Dependencies
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Row, Col, Card, Layout, Button, Table, Modal, Input, Icon} from 'antd';
const {Content, Header} = Layout;
const { Column, ColumnGroup } = Table;
import axios from 'axios';


// Components
import FormEmpresa from './components/FormEmpresa.jsx';
import FormEditEmpresa from './components/FormEditEmpresa.jsx';
import FormAddAsesorExterno from '../asesor_externo/components/FormAddAsesorExterno.jsx'
class Empresa extends Component{
   constructor(){
       super();
       this.state = {
            empresas: [],
            filterEmpresas: [],
            visible: false,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
            loadTable: true,
            visibleFormAddAsesorExterno: false,
            visibleFormEditEmpresa: false,
            props_add_asesor: {
                id_empresa: null,
                nombre_empresa: null
            },
            props_edit_empresa: {
                detalles: null
            }
       }
       
   }
   onInputChange = (e) => {
       this.setState({
           searchText: e.target.value
       })
   }
   onSearch = () => {
       const {searchText, empresas} = this.state
       const reg = new RegExp(searchText, 'gi');
       this.setState({
           visible: false,
           filterDropdownVisible: false,
           filtered: !!searchText,
           filterEmpresas: empresas.map((record) => {
               console.warn(record)
                const match = record.nombre.match(reg);
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
   fetchEmpresas(){
        axios.get('/api/empresa')
            .then(res => {
                if(res.status === 200){
                    var empresas = res.data.empresas.map((empresa, index) => {
                        // console.log('EMPRESA: ', empresa);
                        return {
                            key: index,
                            id: empresa.id, 
                            nombre: empresa.nombre, 
                            clasificacion: empresa.clasificacion,
                            titular: empresa.titular,
                            representante_legal: empresa.representante_legal,
                            detalles: {
                                rfc: empresa.rfc,
                                domicilio: `${empresa.domicilio} colonia ${empresa.colonia}`,
                                domicilio_only: empresa.domicilio,
                                colonia: empresa.colonia,
                                codigo_postal: empresa.codigo_postal,
                                fax: empresa.fax,
                                mision: empresa.mision,
                                puesto_titular: empresa.puesto_titular,
                                nombre_titular: empresa.nombre_titular,
                                puesto_firma_acuerdo: empresa.puesto_firma_acuerdo,
                                nombre_firma_acuerdo: empresa.nombre_firma_acuerdo,
                                asesores_externos: empresa.asesor_externos
                            },
                            acciones: 'acctions'
                        }
                    })
                    this.setState({
                        loadTable: false,
                        empresas,
                        filterEmpresas: empresas,
                        visibleFormAddAsesorExterno: false,
                        visibleFormEditEmpresa: false
                    })
                }
                // console.log(res.data);
            }).catch(err => {
                this.setState({
                        loadTable: false
                })
            })
   }
   componentDidMount() {
        this.fetchEmpresas();
    
   }
   showModal = () => {
       this.setState({
           visible: true,
           visibleFormEditEmpresa: false,
           visibleFormAddAsesorExterno: false,
       })
   }
   handleAddEmpresa(){
       this.fetchEmpresas();
       this.setState({
           visible: false
       })
   }
    showModalFormEditEmpresa = (id_empresa) => {
        const {empresas} = this.state;
        const empresa = empresas.find((empresa) => {return empresa.id === id_empresa});
        this.setState({
            visible: false,
            visibleFormEditEmpresa: true,
            visibleFormAddAsesorExterno: false,
            props_edit_empresa: empresa
        })
    }
    showAddAsesorExterno = (id_empresa, nombre_empresa) => {
        this.setState({
            visible: false,
            visibleFormEditEmpresa: false,
            visibleFormAddAsesorExterno: true,
            props_add_asesor: {
                id_empresa: id_empresa,
                nombre_empresa: nombre_empresa
            }
        })

    }
    expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'nombre'
            },
            {
                title: 'Puesto',
                dataIndex: 'puesto'
            }
        ]
        return(
            <div>
                <span>
                    <strong>RFC</strong><p>{record.detalles.rfc}</p>
                    <strong>Domicilio</strong><p>{record.detalles.domicilio}</p>
                    <strong>Codigo postal</strong><p>{record.detalles.codigo_postal}</p>
                </span>
                <span>
                    <strong>Nombre y puesto del titular de la empresa</strong><p>{`${record.titular.titulo} ${record.titular.nombre} ${record.titular.puesto}`}</p>
                    <strong>Nombre y puesto de quien firma el acuerdo con el ITCH</strong><p>{`${record.representante_legal.titulo} ${record.representante_legal.nombre} ${record.representante_legal.puesto}`}</p>
                </span>
                <Table style={{marginTop: 10}} title={() => 'Asesores externos de la empresa'} columns={columns} size="small" dataSource={record.detalles.asesores_externos.map((asesor, index) => {return {key: index, nombre: asesor.nombre,puesto: asesor.puesto}})}/>
            </div>
        )
    }
    render(){
        const { visible, filterEmpresas, loadTable, visibleFormAddAsesorExterno, props_add_asesor, visibleFormEditEmpresa, props_edit_empresa } = this.state;
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input 
                            ref={ele => this.searchInput = ele}
                            placeholder="Buscar por nombre"
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
                        visible: false,
                        visibleFormAddAsesorExterno: false,
                        visibleFormEditEmpresa: false,
                    }, () => this.searchInput.focus())
                }
            },
            {
                title: 'Clasificación',
                dataIndex: 'clasificacion',
                key: 'clasificacion',
                filters: [
                    {
                        text: 'Público',
                        value: 'público'
                    },
                    {
                        text: 'Privado',
                        value: 'privado'
                    },
                    {
                        text: 'Industrial',
                        value: 'industrial'
                    },
                    {
                        text: 'Servicios',
                        value: 'servicios'
                    }
                ], filterMultiple: false,
                onFilter: (value, record) => record.clasificacion.indexOf(value) === 0,

            },
            {
                title: 'Acciones',
                key: 'acciones',
                render: (text, record) => (
                    <span>
                        <Button style={{marginRight: 5}} icon="edit" onClick={() => this.showModalFormEditEmpresa(record.id)}>Empresa</Button>
                        <Button style={{marginLeft: 5}} icon="team" onClick={() => this.showAddAsesorExterno(record.id, record.nombre)} >Agregar asesor externo</Button>
                    </span>
                ),
                className: 'center-text'
            }
        ]
        return(
            
            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{marginRight: 20}}>
                        <h1> Empresas </h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon="plus" onClick={this.showModal}>Agregar</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 30}}>
                    <Table dataSource={filterEmpresas} className="full-width" columns={columns} pagination={{ pageSize: 5 }} loading={loadTable} scroll={{ x: 1200 }} expandedRowRender={this.expandedRowRender} />
                </Row>
                <FormEmpresa visible={visible} onAddEmpresa={this.handleAddEmpresa.bind(this)}/>
                <FormEditEmpresa visible={visibleFormEditEmpresa} empresa={props_edit_empresa} onReloadFetch={this.fetchEmpresas.bind(this)}/>
                <FormAddAsesorExterno visible={visibleFormAddAsesorExterno} empresa={props_add_asesor} onReloadFetch={this.fetchEmpresas.bind(this)}/>
            </div>
            
        )
    }
}

export default Empresa;