// Dependencies
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Row, Col, Card, Layout, Button, Table, Modal, Select, message} from 'antd';
const {Content, Header} = Layout;
const { Column, ColumnGroup } = Table;
const Option = Select.Option;
import axios from 'axios';
import uuid from 'uuid';


// Components
import FormDepartamento from './components/FormDepartamento.jsx';
import FormEditDepartamento from './components/FormEditDepartamento.jsx';
import FormAddDocente from '../docente/components/FormAddDocente.jsx'
import FormAddCarrera from './components/FormAddCarrera.jsx';
import WrappedFormSubdirectorAcademico from './components/FormSubdirectorAcademico.jsx';

class Departamento extends Component{
   constructor(){
       super();
       this.state = {
            data: [],
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            visible_add_docente: false,
            props_add_docente: {
                id_departamento: null,
                nombre_departamento: null
            },
            visible_add_carrera: false,
            props_add_carrera: {
                id_departamento: null,
                nombre_departamento: null
            },
            departamento: null,
            loadTable: true,
            docentes: []
       }
       
   }
   fetchDepartamento(){
        axios.get('/api/departamento')
            .then(res => {
                if(res.status === 200){
                    var departamentos = res.data.map((departamento, index) => {
                        //console.log(departamento.docentes)                        
                        const jefe_departamento = departamento.docentes.find(docente => { return docente.usuario.rol === 'jefe_departamento'});
                        return {key: index, id: departamento.id, nombre:departamento.nombre, jefe_departamento: jefe_departamento ? `${jefe_departamento.titulo} ${jefe_departamento.nombre} ${jefe_departamento.ap_paterno} ${jefe_departamento.ap_materno}`:  'no asignado', acciones: 'Editar departamento' }
                   
                    })
                    axios.get('/api/docentes')
                        .then(res => {
                            if(res.status === 200){
                                this.setState({
                                    docentes: res.data,
                                    data: departamentos,
                                    loadTable: false,
                                    visible_form_edit_departamento: false
                                })
                            }else{
                                this.setState({
                                    data: departamentos,
                                    loadTable: false,
                                    visible_form_edit_departamento: false
                                })
                            }
                        })
                    
                }
                // console.log(res.data);
            });
   }
   handleAddDepartamento(){
       this.fetchDepartamento();
       this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false
   })
   }
   componentDidMount() {
       this.fetchDepartamento();
   }
   showModalFormDepartamento = () => {
       this.setState({
            visible_form_departamento: true,
            visible_form_edit_departamento: false,
            visible_add_docente: false,
            visible_add_carrera: false
       })
   }
   showModalFormEditDepartamento = (id_departamento) => {
        axios.get(`/api/departamento/${id_departamento}`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    visible_add_docente: false,
                    visible_add_carrera: false,
                    visible_form_departamento: false,
                    visible_form_edit_departamento: true,
                    departamento: res.data
                })
            })
    }
    showAddDocente = (id_departamento, nombre_departamento) => {
        this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            visible_add_carrera: false,
            visible_add_docente: true,
            props_add_docente: {
                id_departamento: id_departamento,
                nombre_departamento: nombre_departamento
            }
        })
    }
    showAddCarrera = (id_departamento, nombre_departamento) => {
        this.setState({
            visible_form_departamento: false,
            visible_form_edit_departamento: false,
            visible_add_docente: false,
            visible_add_carrera: true,
            props_add_carrera: {
                id_departamento: id_departamento,
                nombre_departamento: nombre_departamento
            }
        })
    }
    changeSubdirectorAcademico = (id_usuario) => {
        axios.put('/api/docente/subdirector_academico', {id_usuario: id_usuario ? id_usuario : null})
            .then(res => {
                if(res.status === 200){
                    message.success('Subdirector academico actualizado satisfactoriamente');
                }else{
                    message.error('Tuvimos un error al asignar al subdirector academico.')
                }
            }).catch(err => {
                message.error('Error al asignar al subdirector academico');
            })
    }
    render(){
        const { visible_form_edit_departamento,visible_form_departamento, docentes,data, departamento, loadTable, visible_add_docente, props_add_docente, visible_add_carrera, props_add_carrera} = this.state;
        const subdirector_academico = docentes.find(docente => docente.usuario.rol === 'subdirector_academico')
        return(
            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{marginRight: 20}}>
                        <h1> Departamentos </h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon="plus" onClick={this.showModalFormDepartamento}>Agregar</Button>
                    </Col>
                </Row>
                <Row style={{marginTop: 20, marginBottom: 20}}>
                    <Col xs={24} lg={8}>
                        <h3>Seleccione al subdirector academico</h3>
                        <Select 
                            key={uuid.v4()}
                            style={{width: '100%'}}
                            showSearch
                            placeholder="Seleccione al subdirector academico"
                            optionFilterProp="children"
                            allowClear
                            onChange={(id_docente) => this.changeSubdirectorAcademico(id_docente)}
                            defaultValue={subdirector_academico?`${subdirector_academico.titulo} ${subdirector_academico.nombre} ${subdirector_academico.ap_materno} ${subdirector_academico.ap_paterno}`:null}
                        >
                            {docentes.map((docente, index) => {
                                return (
                                    <Option 
                                        key={uuid.v1()} 
                                        value={`${docente.id_usuario}`}
                                    >
                                        {`${docente.titulo} ${docente.nombre} ${docente.ap_materno} ${docente.ap_paterno}`}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 30}}>
                    <Table dataSource={data} className="full-width" pagination={{ pageSize: 5 }} loading={loadTable} scroll={{ x: 800 }} >
                        <Column 
                            title="ID"
                            dataIndex="id"
                            key="id"
                            className="center-text"
                        />
                        <Column 
                            title="Nombre"
                            dataIndex="nombre"
                            key="nombre"
                            className="center-text"
                        />
                        <Column 
                            title="Jefe de departamento"
                            dataIndex="jefe_departamento"
                            key="jefe_departamento"
                            className="center-text"
                        />
                        <Column 
                            title="Acciones"
                            key="acciones"
                            render={(text, record) => (
                                <span>
                                    {/* {record.id} */}
                                    <Button style={{marginRight: 5}} icon="edit" onClick={() => this.showModalFormEditDepartamento(record.id)}>Departamento</Button>
                                    <Button style={{marginLeft: 5}} icon="plus" onClick={() => this.showAddDocente(record.id, record.nombre)} >Docente</Button>
                                    <Button style={{marginLeft: 5}} icon="plus" onClick={() => this.showAddCarrera(record.id, record.nombre)} >Carrera</Button>
                                </span>
                            )}
                            className="center-text"
                        />
                    </Table>
                </Row>
                <FormDepartamento visible={visible_form_departamento} onAddDepartamento={this.handleAddDepartamento.bind(this)}/>
                <FormEditDepartamento visible={visible_form_edit_departamento} onReloadDepartamentos={this.fetchDepartamento.bind(this)} departamento={departamento}/>
                <FormAddDocente visible={visible_add_docente} departamento={props_add_docente}/>              
                <FormAddCarrera visible={visible_add_carrera} departamento={props_add_carrera} />
            </div>
            
        )
    }
}

export default Departamento;