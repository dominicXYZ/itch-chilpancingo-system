import React, {Component} from 'react';
import {Tabs, Form, Input, Upload, Row, Col, Icon, Button, Table, Tooltip, Modal, Alert, Switch, message} from 'antd';
const TabPane = Tabs.TabPane;
const Item = Form.Item;
import moment from 'moment';
import uuid from 'uuid';
import axios from 'axios';

//components
import FormAddObservacionSeguimiento from '../docente/components/FormAddObservacionSeguimiento.jsx';

export default class RevisionProyecto extends Component{
    constructor(props){
        super(props);
        this.state = {
            proyecto: props.proyecto,
            usuario: props.usuario,
            id_seguimiento: -1,
            visible_observacion: false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            proyecto: nextProps.proyecto,
            usuario: nextProps.usuario,
            id_seguimiento: -1,
            visible_observacion: false
        })
    }
    updateProyecto = () => {
        this.props.updateProyecto();
    }
    showSoluciones = (soluciones_recomendadas) => {
        
        const columnsSolucionesRecomendadas = [
            {
                title: 'Solucionado',
                dataIndex: 'solucionado',
                key: 'solucionado',
                render: (text, record) => (
                    <Icon type={record.solucionado?'check':'close'}/>
                )
            },
            {
                title: 'Solución',
                dataIndex: 'solucion',
                key: 'solucion',
            }
        ]

        const soluciones = soluciones_recomendadas.map((solucion, index) => {
            return {
                key: index,
                id: solucion.id,
                solucionado: solucion.solucionado,
                solucion: solucion.solucion
            }
        }
        )
        Modal.info({
            width: 800,
            title: 'Soluciones recomendadas',
            content: (
                <div>
                    <Table size="small" columns={columnsSolucionesRecomendadas} dataSource={soluciones} pagination={{ pageSize: 5 }}  />
                </div>
            ),
            onOk(){},
        })
                
    }
    changeSeguimiento = (id_seguimiento) => {
        this.setState({
            id_seguimiento,
            visible_observacion: false
        })
    }
    showAddObservacionSeguimiento = () => {
        this.setState({
            visible_observacion: true
        })
    }
    onChangeObservacion = (id_revision_seguimiento, check) => {
        axios.put(`/api/proyecto/revision_seguimiento`, {
            id_revision_seguimiento,
            solucionado: check
        }).then(res => {
            if(res.status === 200){
                message.success('La revisión se ha actulizado satisfactoriamente')
            }else{
                message.error('Error al actualizar la revisión, favor de reportar al administrador.')
            }
        })
    }
    render(){
        const {proyecto, usuario, id_seguimiento, visible_observacion} = this.state;
        const currentDate = moment().format('YYYY-MM-DD');
        const observacionesPlanTrabajo = proyecto.observaciones.filter(obs => obs.tipo==='plan_de_trabajo').map((observacion) => {
            return {
                key: uuid.v1(),
                id: observacion.id,
                observacion: observacion.observacion,
                solucionada: observacion.solucionada
            }
        })
        const observacionesCronograma = proyecto.observaciones.filter(obs => obs.tipo==='cronograma').map((observacion) => {
            return {
                key: uuid.v1(),
                id: observacion.id,
                observacion: observacion.observacion,
                solucionada: observacion.solucionada
            }
        })
        const _asesorias = proyecto.asesorias.map((asesoria) => {
            return {
                key: uuid.v1(),
                id: asesoria.id,
                fecha: moment(asesoria.fecha, 'YYYY-MM-DD').format('ll'),
                temas_a_asesorar: asesoria.temas_a_asesorar,
                url_avance: asesoria.url_avance,
                soluciones_recomendadas: asesoria.soluciones_recomendadas,
                permitir_generar_formato: asesoria.permitir_generar_formato
            }
        })
        const currentSeguimiento = proyecto.seguimientos_proyecto.find(seg => seg.id == id_seguimiento);
        var observacionesSeguimiento = [];
        if(currentSeguimiento){
            observacionesSeguimiento = currentSeguimiento.revisiones_seguimiento.map((revision, index) => {
                return{
                    key: uuid.v1(),
                    id: revision.id,
                    observacion: revision.observacion,
                    solucionado: revision.solucionado,
                    fecha: moment(revision.createdAt).utc().format('LL'),
                    docente: revision.docente
                }
            });
        }
        

        const columnsPlanTrabajo = [
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion'
            }
        ]
        const columnsAsesorias = [
            {
                className: 'center-text',
                title: 'Fecha',
                dataIndex: 'fecha',
                key: 'fecha',
            },
            {
                className: 'center-text',
                title: 'Temas a asesorar',
                dataIndex: 'temas_a_asesorar',
                key: 'temas_a_asesorar',

            },
            {
                className: 'center-text',
                title: 'Avance',
                dataIndex: 'url_avance',
                key: 'url_avance',
                render: (text, record) => (
                    <a href={record.url_avance} target="_blank">Archivo de avance<Icon type="file-pdf"/></a>
                )
            },
            {
                className: 'center-text',
                title: 'Soluciones recomendadas',
                dataIndex: 'soluciones_recomendadas',
                key: 'soluciones_recomendadas',
                render: (text, record) => (
                    <span>
                        <Button style={{marginLeft: 2, marginRight: 2}} icon="bars" onClick={() => this.showSoluciones(record.soluciones_recomendadas)}>Soluciones</Button>
                    </span>
                )
            }
        ]
        const columnsObservacionesSeguimiento = [
            {
                className: 'center-text',
                title: 'Fecha de observación',
                dataIndex: 'fecha',
                key: 'fecha',
            },
            {
                title: 'Solucionado',
                dataIndex: 'solucionado',
                key: 'solucionado',
                render: (text, record) => (
                    <span>
                        {record.docente.id === usuario.id_docente ?
                            <Switch  onChange={(check) => this.onChangeObservacion(record.id, check)} defaultChecked={record.solucionado} checkedChildren="Solucionado" unCheckedChildren={<Icon type="cross" />} />
                            : <p>{record.solucionado? 'Si': 'No'}</p>
                        }
                    </span>
                )
            },{
                className: 'center-text',
                title: 'Realizado por',
                dataIndex: 'docente',
                key: 'docente',
                render: (text, record) => (
                    <p>{`${record.docente.titulo} ${record.docente.nombre} ${record.docente.ap_paterno} ${record.docente.ap_materno}`}</p>
                )
            },
            {
                className: 'center-text',
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion',
            }
        ]
        return(
            <Tabs style={{marginTop: 30}} key=".103." defaultActiveKey="1">
                <TabPane tab={<span><Icon type="book" />Proyecto</span>} key="proyecto">
                    <Form>
                        <Item label="Título: ">
                            <Input value={proyecto.anteproyecto.nombre}  readOnly />
                        </Item>
                        <Item label="Objetivo general: ">
                            <Input value={proyecto.anteproyecto.objetivo_general}  readOnly />
                        </Item>
                        
                        <Item label="Anteproyecto: ">
                            <Upload
                                
                                listType="picture-card"
                                fileList={[{
                                    uid: -1,
                                    name: 'anteproyecto.pdf',
                                    status: 'done',
                                    url: `/api/anteproyecto/pdf/${proyecto.anteproyecto.path_file_anteproyecto}`
                                }]}
                            />
                        </Item>
                    </Form>
                    <Row className="border-top">
                        <Col xs={24} lg={6} >
                            <h2 style={{marginBottom: 20}}>Plan de trabajo</h2>
                            <Item  label={(
                                    <span>
                                        Plan de trabajo&nbsp;
                                        <Tooltip title={`Ultima fecha de actualización: ${moment(proyecto.updatedAt).utc().format('ll')}`}>
                                            <Icon type="clock-circle-o"/>
                                        </Tooltip>
                                    </span>
                                )}>
                                <Upload
                                    className="file-preview"
                                    style={{width: 600}}
                                    listType="picture-card"
                                    fileList={[{
                                        uid: -1,
                                        name: 'plan_de_trabajo.pdf',
                                        status: 'done',
                                        url: `/api/plan_de_trabajo/pdf/${proyecto.filename_plan_trabajo}`
                                    }]}
                                />
                            </Item>
                        </Col>
                        <Col xs={24} lg={18}>
                            <Table title={() => 'Observaciones de plan de trabajo'} columns={columnsPlanTrabajo} dataSource={observacionesPlanTrabajo} pagination={{ pageSize: 4 }} />
                        </Col>
                    </Row>
                    <Row className="border-top">
                        <Col xs={24} lg={6} >
                            <h2 style={{marginBottom: 20}}>Cronograma de actividades</h2>
                            <Item  label={(
                                    <span>
                                        Cronograma de actividades&nbsp;
                                        <Tooltip title={`Ultima fecha de actualización: ${moment(proyecto.updatedAt).utc().format('ll')}`}>
                                            <Icon type="clock-circle-o"/>
                                        </Tooltip>
                                    </span>
                                )}>
                                <Upload
                                    className="file-preview"
                                    style={{width: 600}}
                                    listType="picture-card"
                                    fileList={[{
                                        uid: -1,
                                        name: 'cronograma.pdf',
                                        status: 'done',
                                        url: `/api/cronograma/pdf/${proyecto.filename_cronograma}`
                                    }]}
                                    onRemove={false}
                                />
                            </Item>
                        </Col>
                        <Col xs={24} lg={18}>
                            <Table title={() => 'Observaciones del cronograma de actividades'} columns={columnsPlanTrabajo} dataSource={observacionesCronograma} pagination={{ pageSize: 4 }} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab={<span><Icon type="solution" />Asesorías</span>} key="asesorias">
                    <Row>
                        <Col xs={24} lg={24}>
                            <Table title={() => 'Asesorías'} columns={columnsAsesorias} dataSource={_asesorias} pagination={{ pageSize: 5 }} scroll={{ x: 1200 }} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab={<span><Icon type="calendar" />Seguimientos</span>} key="seguimientos">
                    <Tabs key="-99" tabPosition="left" defaultActiveKey="-1" onChange={(id) =>  this.changeSeguimiento(id)}>
                        {proyecto.seguimientos_proyecto.map(((seguimiento, index) => {
                                // console.log('key', seguimiento.id)
                                return (
                                    <TabPane tab={<span><Icon type="schedule" />{`Seguimiento ${index+1}`}</span>} key={seguimiento.id}>
                                        {currentDate >= seguimiento.seguimiento.fecha_inicial && currentDate <= seguimiento.seguimiento.fecha_final 
                                            ?
                                            <Row>
                                                <Col xs={24} lg={24} style={{marginTop: 20, marginBottom: 30}}>
                                                    {seguimiento.url_seguimiento ? 
                                                        <div>
                                                            <p>Link del seguimiento: </p>
                                                            <Upload 
                                                                defaultFileList= {
                                                                    [{
                                                                        uid: -2,
                                                                        name: 'Seguimiento',
                                                                        status: 'done',
                                                                        url: seguimiento.url_seguimiento
                                                                    }]
                                                                }
                                                            />
                                                        </div>
                                                    : 
                                                        <Alert message="El alumno no ha subido su seguimiento" type="warning" showIcon/>
                                                    }
                                                </Col>
                                                <Col xs={24} lg={24} >
                                                    <Button type="primary" icon="plus" onClick={() => this.showAddObservacionSeguimiento()}>Agregar observación</Button>
                                                    <Table title={() => 'Observaciones del seguimiento'} columns={columnsObservacionesSeguimiento} dataSource={observacionesSeguimiento} pagination={{ pageSize: 4 }} />
                                                </Col>
                                                <FormAddObservacionSeguimiento updateProyecto={this.updateProyecto.bind(this)}  updateSeguimientos={() => console.log('()')} usuario={usuario} visible={visible_observacion} id_seguimiento={id_seguimiento}/>
                                            </Row>
                                            :
                                            <Alert message={`No puede acceder al seguimiento,\n Fecha inicial: ${moment(seguimiento.seguimiento.fecha_inicial, 'YYYY-MM-DD').format('LL')} - Fecha final: ${moment(seguimiento.seguimiento.fecha_final, 'YYYY-MM-DD').format('LL')}`} type="warning" showIcon />
                                        
                                        }
                                    </TabPane>
                                )
                        }))}
                    </Tabs>
                </TabPane>
            </Tabs>
        )
    }
}