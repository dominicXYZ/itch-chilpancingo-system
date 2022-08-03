// Dependencies
import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Alert} from 'antd';
const FormItem = Form.Item;
import {Redirect} from 'react-router-dom';
// api
const UUID = "efda6eec-c3d4-414d-8c1e-eede8c03a2b3";
import request from 'superagent';

class FormLogin extends Component{
    constructor(){
        super();
        this.state = {
            successAuth: <div/>
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        const {correo, contrasenia} = values;
          if (!err) {
              request
                .post('/api/usuario/auth')
                .send({correo, contrasenia, UUID})
                .end((err, res)=>{
                    console.log(res)
                    if(res.status === 200 && res.body.isAuth === true){
                        // autenticado redirigir si es admin 
                        const rol = res.body.rol;
                        if(rol === 'admin'){
                            this.setState({
                                successAuth : <Redirect to="/admin"  />
                            })
                        }else if(rol === 'jefe_departamento'){
                            this.setState({
                                successAuth : <Redirect to="/jefe_departamento"  />
                            })
                        }else if(rol === 'candidato_residente'){
                            this.setState({
                                successAuth: <Redirect to="/candidato_residente"/>
                            })
                        }else if(rol === 'docente' || rol === 'subdirector_academico'){
                            this.setState({
                                successAuth: <Redirect to="/docente"/>
                            })
                        }else if(rol === 'asesor_externo'){
                            this.setState({
                                successAuth: <Redirect to="/asesor_externo"/>
                            })
                        }else if(rol === 'residente'){
                            this.setState({
                                successAuth: <Redirect to="/residente"/>
                            })
                        }
                        // console.log('asas', rol);
                        // redirigir a otros paths si es otro tipo de rol
                    }else{
                        // error en la autenticación
                        this.setState({
                            successAuth: <Alert
                                                message="Error"
                                                description="Error en la autenticación"
                                                type="error"
                                                showIcon
                                                closable
                                            />
                            
                        })
                    }
                    
                });
            // console.log('Received values of form: ', values);
          }
        });
      }
    render(){
        const { getFieldDecorator } = this.props.form;        
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('correo', {
                        rules: [{type: 'email',message: 'El email no es correcto'},{required: true, message: 'Necesita su correo para autentificarse en el sistema.'}]
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}} />} type="email" placeholder="Ingrese su correo electronico" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('contrasenia', {
                        rules: [{ required: true, message: 'Necesita su contraseña para autentificarse en el sistema.' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Intruduca su contraseña" />
                    )}
                </FormItem> 
                <Button icon="login" type="primary" htmlType="submit" style={{maxWidth:100, marginTop: 20, marginBottom: 20}}>
                    Ingresar
                </Button>
                {this.state.successAuth}
            </Form>
        )
    }
}

const WrappedLoginForm = Form.create()(FormLogin);
export default WrappedLoginForm;