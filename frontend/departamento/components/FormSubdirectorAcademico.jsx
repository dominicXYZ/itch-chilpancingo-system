import React, {Component} from 'react';
import {Form, Select, Input, Icon, message, Button, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class FormSubdirectorAcademico extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                // realizar post al server
                alert('alv')
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;  
        const prefixSelectorTitulo = getFieldDecorator('titulo', {
            initialValue: 'ING.',
          })(
            <Select style={{ width: 90 }}>
              <Option value="ING.">ING.</Option>
              <Option value="DR.">DR.</Option>
              <Option value="DRA.">DRA.</Option>
              <Option value="MTRO.">MTRO.</Option>
              <Option value="DIR.">DIR.</Option>
              <Option value="DIRA.">DIRA.</Option>
              <Option value="LIC.">LIC.</Option>
              <Option value="ISC.">ISC.</Option>
              <Option value="ISI.">ISI.</Option>
              <Option value="MAI.">MAI.</Option>
              <Option value="MBT.">MTB.</Option>
              <Option value="MCT.">MCT.</Option>
              <Option value="MTI.">MTI.</Option>
              <Option value="M.A.T.I.">M.A.T.I.</Option>
              <Option value="M.C.">M.C.</Option>
            </Select>
          );
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="Nombre completo del subdirector academico: ">
                        {getFieldDecorator('nombre', {
                            rules: [{required: true, message: 'El subdirector academico debe tener un nombre.'}]
                        })(<Input addonBefore={prefixSelectorTitulo} style={{ width: '100%' }} placeholder="Nombre completo del subdirector academico" />)}
                </FormItem>
                <Button htmlType="submit">
                    Guardar
                </Button>
            </Form>
        )
    }
}

const WrappedFormSubdirectorAcademico = Form.create()(FormSubdirectorAcademico);
export default  WrappedFormSubdirectorAcademico;