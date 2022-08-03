import React, {Component} from 'react';

import { Select, Row, Col, Form, Input, Button, Icon, Table, message, Modal} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

import axios from 'axios';
import uuid from 'uuid';
// console.warn('uuid', uuid.v1())

const CreateFormAsignacion = Form.create()(
    (props) => {
        const {form, handleSubmit, docentes, checkDocenteDiferente, docentesAsignados} = props;
        const {getFieldDecorator} = form;
        // console.log('as', docentesAsignados)

        const default_presidente_academia = docentesAsignados.find(docente => docente.rol === 'presidente_academia') || null
        // console.log('presidente:',default_presidente_academia);
        const default_jefe_proyecto = docentesAsignados.find(docente => docente.rol === 'jefe_proyecto') || null
        // console.log('jefe_proyecto:',default_jefe_proyecto);

        return (
            <Form layout="horizontal" 
                onSubmit={handleSubmit}
            >   
                <FormItem hasFeedback label="Presidente de la academia">
                    {getFieldDecorator('id_presidente_academia', {
                    rules: [{ required: true, message: 'Seleccione al presidente de academia' }],
                    initialValue: default_presidente_academia ? `${docentes.find(docentes => docentes.id === default_presidente_academia.id_docente).id}` : null
                    })(
                        <Select 
                            showSearch
                            placeholder="Seleccione al presidente de la academia"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {docentes.map((docente, index) => {return <Option key={uuid.v1()} value={`${docente.id}`}>{docente.nombre}</Option>})}
                        </Select>
                    )}
                </FormItem>
                <FormItem hasFeedback label="Jefe de proyecto">
                    {getFieldDecorator('id_jefe_proyecto', {
                        rules: [{validator: checkDocenteDiferente}],
                        initialValue: default_jefe_proyecto ? `${docentes.find(docentes => docentes.id === default_jefe_proyecto.id_docente).id}` : null
                    })(
                        <Select 
                            showSearch
                            placeholder="Seleccione al jefe de proyecto"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                             <Option disabled selected value>Sin asignar</Option>
                            {docentes.map((docente, index) => {return <Option key={uuid.v1()} value={`${docente.id}`}>{docente.nombre}</Option>})}
                        </Select>
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form>
        )
    }
)


export default class GestionarCarrera extends Component{
    constructor(props){
        super(props);
        const docentes = props.docentes.map((docente, index) => {
            return {
                id: docente.id,
                key: uuid.v1(),
                nombre: `${docente.titulo} ${docente.nombre} ${docente.ap_paterno} ${docente.ap_materno}`,
                id_usuario: docente.id_usuario,
                acciones: 'assign'
            }
        });
        // console.log('constructor', props.docentesAsignados)

        this.state = {
            carrera: props.carrera,
            docentes: docentes,
            filterDocentes: docentes,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
            docentesAsignados: props.docentesAsignados
        }
    }
    componentWillReceiveProps(nextProps) {
        const docentes = nextProps.docentes.map((docente, index) => {
            return {
                id: docente.id,
                key: uuid.v1(),
                nombre: `${docente.titulo} ${docente.nombre} ${docente.ap_paterno} ${docente.ap_materno}`,
                id_usuario: docente.id_usuario,
                asignacion: 'assign'
            }
        });
        // console.log('update', nextProps.docentesAsignados)

        this.setState({
            carrera: nextProps.carrera,
            docentes: docentes,
            filterDocentes: docentes,
            filterDropdownVisible: false,
            searchText: '',
            filtered: false,
            docentesAsignados: nextProps.docentesAsignados
        })
    }
    // FORM ASIGNAR PRESIDENTE Y JEFE DE PROYECTO
    refForm= (form) => {
        this.form = form;
    }
    checkDocenteDiferente = (rule, value, callback) => {
        const form = this.form;
        if(value === form.getFieldValue('id_presidente_academia')){
            callback('El jefe de proyecto no puede ser el mismo que el presidente de academia')
        }else{
            callback();
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {carrera} = this.state
        const form = this.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }    
          console.log('Received values of form: ', values);

          axios.post('/api/carrera/asignar_encargados', {
              id_carrera: carrera.id,
              id_jefe_proyecto: values.id_jefe_proyecto || null,
              id_presidente_academia: values.id_presidente_academia
          }).then(res => {
                if(res.status === 200 ){
                    message.success('Carrera actualizada!')
                }else{
                    Modal.error({
                        title: 'Error al actualizar la carrera. Revisar los siguientes campos',
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

        //   form.resetFields();
        });
    }
    // TABLE
    onInputChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    onSearch = () => {
        const {searchText, docentes} = this.state
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            visible: false,
            filterDropdownVisible: false,
            filtered: !!searchText,
            filterDocentes: docentes.map((record) => {
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
    render(){
        const {carrera, docentes, filterDocentes, docentesAsignados} = this.state;
        // console.log('docentes_asignados: ', docentesAsignados)

        var columns = [
            {
                className: 'center-text',
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
                        visible: false
                    }, () => this.searchInput.focus())
                }               
            }
        ]
        const presidente_academia = docentesAsignados.find((docente) => docente.rol==='presidente_academia') || null
        const jefe_proyecto =  docentesAsignados.find((docente) => docente.rol==='jefe_proyecto') || null
        
        var isSelectedRow = (record) => {
            // console.warn('asignado => ', docentesAsignados);
            // console.warn('record =>', record)
            // console.warn(docentesAsignados.find((docente) => (docente.id_docente === record.id && docente.rol==='docente')))
            return docentesAsignados.find((docente) => (docente.id_docente === record.id && docente.rol==='docente')) ? true : false
            // return true;
        }
        var rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              axios.post('/api/carrera/asignar_docentes', {
                  id_carrera: carrera.id, 
                  array_docentes: selectedRows
                }).then(res => {
                        if(res.status === 200 ){
                            message.success('Docentes asignados :)!')
                        }else{
                            Modal.error({
                                title: 'Error al actualizar docentes. Revisar los siguientes campos',
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
            },
            getCheckboxProps: record => (
                {
                    disabled: (presidente_academia ? record.id === presidente_academia.id_docente : null) || (jefe_proyecto ? record.id === jefe_proyecto.id_docente : null),
                    defaultChecked: isSelectedRow(record)
                }
            ),
        }

        return (
            <div>
                <Row style={{marginTop: 20}}>
                    <Col xs={24} lg={16}>
                        <CreateFormAsignacion
                            ref={this.refForm}
                            handleSubmit={this.handleSubmit}
                            docentes={docentes}
                            checkDocenteDiferente={this.checkDocenteDiferente}
                            docentesAsignados={docentesAsignados}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="middle" style={{marginTop: 20}}>
                    <Table bordered title={() => 'Docentes que participan en la carrera'} rowSelection={rowSelection} dataSource={filterDocentes} className="full-width" columns={columns} pagination={{ pageSize: 8 }}  scroll={{ x: 800 }} />
                </Row>
            </div>
        )
    }
}