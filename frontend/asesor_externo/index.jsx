// Dependencies
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Row, Col, Card, Layout, Button, Table, Modal} from 'antd';
const {Content, Header} = Layout;
const { Column, ColumnGroup } = Table;
import axios from 'axios';


// Components

class Departamento extends Component{
   constructor(){
       super();
       this.state = {
            data: [
                {
                    key: '1',
                    id: 1,
                    nombre: 'Sistemas y computación',
                    jefe_departamento: 'Jose Angel Nava',
                    acciones: 'alv'
                },
                
            ],
            visible: false
       }
       
   }
   componentDidMount() {
       axios.get('/api/docente')
        .then(res => {
            if(res.status === 200){
                var departamentos = res.data.map((departamento, index) => {
                    return {key: index, id: departamento.id, nombre:departamento.nombre, jefe_departamento: 'unasigned', acciones: 'falta' }
                })
                this.setState({
                    data: departamentos
                })
            }
            // console.log(res.data);
        });
    
   }
   showModal = () => {
       this.setState({
           visible: true
       })
   }
    render(){
        const { visible, data } = this.state;
        return(
            <div>
                <Row type="flex" justify="left" align="middle">
                    <Col style={{marginRight: 20}}>
                        <h1> Docente </h1>
                    </Col>
                    <Col>
                        <Button type="primary" icon="plus" onClick={this.showModal}>Agregar</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{marginTop: 30}}>
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
                                    <Button icon="edit" > Cambiar jefe de departamento </Button>
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