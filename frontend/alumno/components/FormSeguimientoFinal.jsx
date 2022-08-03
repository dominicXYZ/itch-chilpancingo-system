import React, {Component} from 'react';
import {render} from 'react-dom';
import { 
    Button,
    Modal, 
    Form, 
    Input,
    Icon, 
    message, 
    Upload, 
    Collapse, 
    Badge,
    Row,
    Col,
    Tree,
    Alert
} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const {Panel} = Collapse;
const TreeNode = Tree.TreeNode;

import axios from 'axios';
import moment from 'moment';

class FormSeguimientoFinal extends Component{
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            axios.put('/api/proyecto/informe_tecnico',{
                id_proyecto: this.props.proyecto.id,
                url_informe_tecnico: values.url_informe_tecnico
            }).then(res => {
                if(res.status === 200){
                    message.success('Informe técnico actualizado satisfactoriamente');
                }else{
                    message.error('Error al actualizar al informe técnico, favor de reportar al administrador.')
                }
            })
          }
        });
      }
    render(){
        const {getFieldDecorator} = this.props.form;
        const {proyecto} = this.props
        // addonAfter={seguimiento.url_seguimiento? <a href={seguimiento.url_seguimiento? seguimiento.url_seguimiento: '#'} target="_blank"><Icon type="cloud"/>Ver seguimiento</a>: null}
        return (
            <div>
                <Row gutter={16}>
                    <Col xs={24} lg={12} >
                        <Form onSubmit={this.handleSubmit} >
                                <FormItem label="URL del informe técnico en google drive">
                                    {getFieldDecorator('url_informe_tecnico', {
                                        rules: [{required: true, message: 'El url del archivo es necesario para la revisión.'}, {pattern: '^https:\/\/drive.google.com\/[^\\s]*$', message: 'La URL esta mal formada ejemplo: https://drive.google.com/open?id=0B-agd1bGfOTYcHZNWmtFZ1BINzQ'}]
                                    })(
                                        <Input prefix={<Icon type="global" style={{ fontSize: 13 }} />}  placeholder="URL del sitio donde esta almacenado el archivo del seguimiento ejemplo: https://drive.google.com/open?id=0B-agd1bGfOTYcHZNWmtFZ1BINzQ" addonAfter={proyecto.url_informe_tecnico? <a href={proyecto.url_informe_tecnico? proyecto.url_informe_tecnico: '#'} target="_blank"><Icon type="cloud"/>Ver informe técnico</a>: null}/>
                                    )
                                    }
                                </FormItem>
                                <Button type="primary" htmlType="submit">
                                    Actualizar
                                </Button>
                        </Form>
                    </Col>
                    <Col xs={24} lg={12}>
                        <h3>Estructura del informe técnico</h3>
                        <Tree
                            showLine
                        >
                            <TreeNode title="Informe técnico" key="0">
                                <TreeNode title="Portada" key="1">
                                    <TreeNode title="Periodo de residencia" key="1-0"/>
                                    <TreeNode title="Nombre de proyecto" key="1-1"/>
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </Col>
                </Row>
                <Row gutter={20} style={{marginTop: 30}}>
                    <Col xs={24} lg={24} className="border-bottom">
                        <h3>Formato de evaluación</h3>
                    </Col >
                    <Col xs={24} lg={24}>
                        {
                            proyecto.id_evaluacion_asesor_interno !== null & proyecto.id_evaluacion_asesor_externo!== null ?
                                
                                <a target="_blank" href={`/api/proyecto/${proyecto.id}/formato_evaluacion/${proyecto.anteproyecto.alumno.plan_estudios === '2009-2010' ? 'anexoIII' : 'anexoXXX'}`}>
                                    <Button type="primary" icon="file-pdf">Generar formato de evaluación</Button>
                                </a>
                            : <Alert message={`${proyecto.id_evaluacion_asesor_interno === null? 'El asesor interno no ha realizado la evaluación':''}\n${proyecto.id_evaluacion_asesor_externo===null? ', El asesor externo no ha realizado la evaluación':''}`} type="warning" showIcon></Alert>
                            
                        }
                        
                    </Col>
                </Row>
                <Row gutter={20} style={{marginTop: 30}}>
                    <Col xs={24} lg={24} className="border-bottom">
                        <h3>Cartas de liberación</h3>
                    </Col >
                    <Col xs={24} lg={12}>
                        <h4>Asesor interno</h4>
                        {proyecto.autorizar_carta_liberacion_asesor_interno 
                            ? 
                                <a target="_blank" href={`/api/proyecto/${proyecto.id}/carta_liberacion/asesor_interno`}>
                                    <Button type="primary" icon="file-pdf">Generar carta de liberación</Button>
                                </a>
                            :
                            <Alert message={`Tu asesor interno no ha autorizado tu carta de liberación`} type="warning" showIcon />
                        }
                    </Col >
                    <Col xs={24} lg={12}>
                        <h4>Asesor externo</h4>
                        {proyecto.autorizar_carta_liberacion_asesor_externo
                            ? 
                                <a target="_blank" href={`/api/proyecto/${proyecto.id}/carta_liberacion/asesor_externo`}>
                                    <Button type="primary" icon="file-pdf">Generar carta de liberación</Button>
                                </a>
                            :
                            <Alert message={`Tu asesor externo no ha autorizado tu carta de liberación`} type="warning" showIcon />
                        }
                    </Col>
                </Row>
            </div>

        )
    }
}

const WrappedFormSeguimientoFinal = Form.create({
    mapPropsToFields(props) {
      return {
        props
      }
    }
  })(FormSeguimientoFinal);
export default WrappedFormSeguimientoFinal;