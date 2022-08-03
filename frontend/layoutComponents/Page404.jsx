import React, {Component} from 'react';
import {Row, Col, Card, Layout} from 'antd';
const {Content, Header} = Layout;
export default class Page404 extends Component{
    render(){
        return(
            <div>
            <Row type="flex" justify="center" align="middle" style={{height: '100%'}} key="a">
                <Col lg={16} xs={22} >
                    <Card style={{borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 25, paddingBottom: 25}}>
                        <Row type="flex" justify="center" align="middle">
                            <Col lg={24} xs={24} style={{paddingLeft: 20, paddingRight: 20}}>
                                <h1 style={{fontSize: 150, color: '#4da1ff', textAlign: 'center'}}>404</h1>
                                <p style={{color: '#4da1ff', textAlign: 'center'}} >Oops!!! Pagina no encontrada.</p>
                            </Col>
                        </Row>
                    </Card>
                </Col> 
            </Row>
        </div>
        )
    }
}