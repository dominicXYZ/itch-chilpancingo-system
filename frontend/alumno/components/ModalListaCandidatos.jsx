import React, {Component} from 'react';

export default class ModalListaCandidatos extends Component{
    constructor(props){
        super(props);
        this.state = {
            periodo: props.periodo,
            visible: props.visible
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            periodo: nextProps.periodo,
            visible: nextProps.visible
        })
    }

    render(){
        return(
            <Modal
                visible={visible}
                title={`Agregar alumno a la carrera de ${carrera ? carrera.nombre: ''}`}
            >
                
            </Modal>
        );
    }

}