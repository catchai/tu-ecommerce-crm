import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, TabContent, TabPane, NavItem, NavLink, Label, Form, FormGroup, Button } from "reactstrap";
import classnames from 'classnames';

//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MDBDataTable } from "mdbreact";
import "./datatables.scss";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class Pedidos extends Component {
    constructor(props) {

        super(props);
        this.state = {
            data : {},
            startDate: new Date(),
            endDate: new Date(),
            activeTab: '1',
        }
        this.toggleTab = this.toggleTab.bind(this);
        this.handleChange.bind(this);
    }

    handleChange = date => {
        this.setState({
          startDate: date,
          endDate: date,
        });
    };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
      console.log('EcommercePedido')
    console.log(this.props.item);

        const data = {
            columns: [
              {
                label: "Order ID",
                field: "order",
                sort: "asc",
                width: 40
              },
              {
                label: "Nombre",
                field: "displayName",
                sort: "asc",
                width: 40
              },
              {
                label: "Estado",
                field: "paymentStatus",
                sort: "asc",
                width: 40
              },
              {
                label: "Fecha Órden",
                field: "fechaPedido",
                sort: "asc",
                width: 40
              },
              {
                label: "Total",
                field: "total",
                sort: "asc",
                width: 40
              },
              {
                label: "Método de Pago",
                field: "paymentMethod",
                sort: "asc",
                width: 20
              }
            ],
            rows: [
              {
                order: "",
                displayName: "",
                paymentStatus: "",
                fechaPedido: "",
                total: 0,
                paymentMethod: ""
              }
            ]
        };
        data.rows = this.props.item;

        console.log(data);
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title="Menú"  linktitle="/home" breadcrumbItem="Órdenes" />

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title mb-3">Órdenes</h4>


                                        <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                                            <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                                    Todas las Órdenes
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                                    Procesando
                                                </NavLink>
                                            </NavItem>
                                        </ul>


                                        <TabContent activeTab={this.state.activeTab} className="p-3">
                                            <TabPane tabId="1" id="all-order">
                                                <Form>
                                                    <Row>

                                                        <div className="col-xl col-sm-6">
                                                            <FormGroup className="mt-3 mb-0">
                                                                <Label>Desde :</Label>
                                                                <DatePicker
                                                                    selected={this.state.startDate}
                                                                    onChange={this.handleChange}
                                                                    className="form-control"
                                                                    placeholderText="Select date"
                                                                />
                                                            </FormGroup>
                                                        </div>

                                                        <div className="col-xl col-sm-6">
                                                            <FormGroup className="mt-3 mb-0">
                                                                <Label>Hasta :</Label>
                                                                <DatePicker
                                                                    selected={this.state.startDate}
                                                                    onChange={this.handleChange}
                                                                    className="form-control"
                                                                    placeholderText="Select date"
                                                                />
                                                            </FormGroup>
                                                        </div>

                                                        <div className="col-xl col-sm-6">
                                                            <FormGroup className="mt-3 mb-0">
                                                                <Label>Estado</Label>
                                                                <select className="form-control select2-search-disable">
                                                                    <option value="CO" defaultValue>Completed</option>
                                                                    <option value="PE">Pending</option>
                                                                </select>
                                                            </FormGroup>
                                                        </div>
                                                          {
                                                            // <div className="col-xl col-sm-6 align-self-end">
                                                            //     <div className="mt-3">
                                                            //         <Button type="button" color="primary" className="w-md">Add Order</Button>
                                                            //     </div>
                                                            // </div>
                                                          }

                                                    </Row>
                                                </Form>


                                                <MDBDataTable responsive bordered data={data} className="mt-5" />

                                            </TabPane>
                                            <TabPane tabId="2" id="processing">
                                                <div>
                                                    <MDBDataTable responsive bordered data={data} className="mt-4" />
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Pedidos;
