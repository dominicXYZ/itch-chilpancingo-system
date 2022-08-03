import React, {Component} from 'react';

import { Select, Row, Col, message} from 'antd';
const Option = Select.Option;
import axios from 'axios';
import uuid from 'uuid';
// components
import GestionarCarrera from './components/GestionarCarrera.jsx';



export default class Departamento extends Component{
    constructor(props){
        super(props);
        this.state = {
            departamento: props.departamento,
            carrera: null,
            docentesAsigandos: null
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            departamento: nextProps.departamento,
            carrera: null,
            docentesAsigandos: null
        })
    }
    handleChageCarrera = (id_carrera) => {
        const {departamento} = this.state;
        const carrera = departamento.carreras.find((carrera) => `${carrera.id}` === id_carrera);
        axios.get(`/api/carrera/${id_carrera}/docentes_asignados`)
            .then(res => {
                if(res.status === 200){
                    console.log('alv',res.data)
                    this.setState({
                        carrera: <GestionarCarrera key={uuid.v4()} carrera={carrera} docentes={departamento.docentes} docentesAsignados={res.data}/>,
                    })
                }else{
                    message.warning('Verificar los docentes asignados.')
                }
            })   
    }
    render(){
        const {departamento, carrera} = this.state;
        return (
            <div>
                <Row>
                    <Col xs={24} lg={6}>
                        <p>Carrera: </p>
                        <Select
                            placeholder="Seleccione una carrera"                           
                            style={{width: '100%'}}
                            onChange={this.handleChageCarrera}
                        > 
                            {departamento.carreras.map((carrera, index) => {return <Option key={index} value={`${carrera.id}`} >{carrera.nombre}</Option>})}
                        </Select>
                    </Col>
                </Row>
                {carrera}
            </div>
        )
    }
}