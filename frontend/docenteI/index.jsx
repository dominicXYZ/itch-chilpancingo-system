// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Row, Col, Card, Layout, Button, Table, Modal , Popconfirm, message} from 'antd';



const { Content, Header } = Layout;
const { Column, ColumnGroup } = Table;
import axios from 'axios';


// Components

class Departamento extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            visible_form_EditUsuario: false,
            props_edit_docente: {
                detalles: null
            },
            props_edit_departamento: {
                detalles: null
            },
            visible: false, 
            loadTable: true, 
            docentes: [], 
            usuarios: [], 
            departamentos: []
        }

    }

    fetchDepartamento() {
        axios.get(`/api/departamento2`)
        .then(res => {
            // console.log(res.data)
            this.setState({
                visible: false,
                props_edit_departamento: res.data
            })
        })
    }

    fetchDocente() {
        axios.get('/api/docentesA')
            .then(res => {
                if (res.status === 200) {
                    var docentes = res.data.map((docente, index) => {
                        //console.info("docentes: ", departamento.docentes)                        
                        //const jefe_departamento = departamento.docentes.find(docente => { return docente.usuario.rol === 'jefe_departamento'});
                        //const correo = departamento.docentes.find(docente => { return docente.usuario.rol==='docente'});
                        //console.log("docentes", docente);

                        //console.log("departamento", jefe_departamento);
                        return {
                            key: index, id: docente.id, nombre:
                                `${docente.titulo}
                                 ${docente.nombre} 
                                 ${docente.ap_paterno}
                                 ${docente.ap_materno}`,
                                 nombre2: docente.nombre,
                                ap_paterno: docente.ap_paterno,
                                ap_materno: docente.ap_materno,
                                titulo: docente.titulo,
                                correo: docente.usuario.correo, jefe_departamento: docente.departamento.nombre,
                                id_usuario: docente.id_usuario,
                                acciones: 'Editar departamento'
                        }

                    })
                    this.setState({
                        docentes,
                        loadTable: false,
                    })
                    axios.get('/api/usuarios')
                        .then(res => {
                            if (res.status === 200) {
                                this.setState({
                                    usuarios: res.data,
                                    data: docentes,
                                    loadTable: false,
                                    visible_form_edit_departamento: false
                                })
                            } else {
                                this.setState({
                                    data: docentes,
                                    loadTable: false,
                                    visible_form_edit_departamento: false
                                })
                            }
                        })

                    axios.get('/api/departamento')
                        .then(res => {
                            if (res.status === 200) {
                                this.setState({
                                    departamentos: res.data,
                                    data: docentes,
                                    loadTable: false,
                                    visible_form_edit_departamento: false
                                })
                            } else {
                                this.setState({
                                    data: docentes,
                                    loadTable: false,
                                    visible_form_edit_departamento: false
                                })
                            }
                        })


                }
                //console.log(res.data);
            });
    }



    componentDidMount() {
        this.fetchDocente();
        this.fetchDepartamento();
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleEditDocentes() {
        this.fetchDocente();
        this.fetchDepartamento();
        this.setState({
            visible_form_EditDocente: false,
        })
    }

  


    handleEliminar = (id_docente, id_usuario) => {
        // crear post al servidor
        axios.put(`/api/docenteA/${id_docente}`, {
            docente_id: id_docente,
            usuario_id: id_usuario
        }).then((res) => {
            //console.log(res)
            if (res.status === 200) {
               
                message.success("docente activado satisfactoriamente")
                this.setState({ visible: false });
                this.handleEditDocentes();
              
            } else {
                Modal.error({
                    title: 'Error al guardar el docente o act. Revisar los siguientes campos',
                    content: (
                        <div>
                            {res.data.errores}
                        </div>
                    ), onOk() { },
                })
            }
        }).catch((err) => {
            message.error(err);
        })
    }

    render() {
        const { visible, data, visible_form_EditDocente, props_edit_docente, props_edit_departamento } = this.state;
        return (
            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{ marginRight: 20 }}>
                        <h1> Docente </h1>
                    </Col>
                    
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ marginTop: 30 }}>
                    <Table dataSource={data} className="full-width">
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
                            title="Correo"
                            dataIndex="correo"
                            key="correo"
                            className="center-text"
                        />
                        <Column
                            title="Departamento"
                            dataIndex="jefe_departamento"
                            key="jefe_departamento"
                            className="center-text"
                        />
                        <Column
                            title="Acciones"
                            key="acciones"
                            render={(text, record) => (
                                <span>
                                   
                                    <Popconfirm title={(<span><p>??Esta seguro de reactivar el docente?</p><p>al realizar esta acci??n, se hara visible todo la informaci??n relacionada a este docente</p></span>)} onConfirm={() => this.handleEliminar(record.id, record.id_usuario)} okText="Si" cancelText="Cancelar">
                                            <Button icon="user-delete" style={{marginTop: 5}} type="danger" >Activar Docente</Button>
                                    </Popconfirm>
                                </span>
                            )}
                            className="center-text"
                        />
                    </Table>
                </Row>
                {/* <FormDepartamento visible={visible}/> */}

                

            </div>

        )
    }
}

export default Departamento;