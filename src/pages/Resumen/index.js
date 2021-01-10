import React, { useState } from 'react';
import { Container, Row, Col, Card, Label, CardBody, Media, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";

// Pages Components
import EcommerceOrders from "../Ecommerce/EcommerceOrders";
import ActivitySales from "./ActivitySales";
import TopSales from "./TopSales";
import Pie from "./piechart";
//import LineBar from "./linechart";
import LineBar from "./linebarchart";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

 const Resumen = (props) => {

          const reports = [
                { title: "Cantidad Pedidos/Día", iconClass: "bx-purchase-tag-alt", description: "25" },
                { title: "Ingreso/Venta Diaria", iconClass: "bx-money", description: "$35.000" },
                { title: "Ticket Promerio Diario", iconClass: "bx-check", description: "15" }
            ];


          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Link to="/home">
                        <Breadcrumbs title="Home" linktitle="/home" breadcrumbItem="Resumen Ventas"   />
                        </Link>

                        <Row>
                            <Col xl="12">
                                <Row>

                                            <Col md="6" >
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>

                                                            <div className="col-xl col-sm-3">
                                                                <FormGroup className="mt-3 mb-0">
                                                                    <Label>Fecha Desde :</Label>
                                                                    <DatePicker
                                                                        className="form-control"
                                                                        placeholderText="Seleccione el día"
                                                                    />
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col-xl col-sm-3">
                                                                <FormGroup className="mt-3 mb-0">
                                                                    <Label>Fecha Hasta :</Label>
                                                                    <DatePicker
                                                                        className="form-control"
                                                                        placeholderText="Seleccione el día"
                                                                    />
                                                                </FormGroup>
                                                            </div>
                                                      </Media>
                                                    </CardBody>
                                                  </Card>
                                                </Col>

                                                <Col md="6" >
                                                <Card className="mini-stats-wid">
                                                  <CardBody>
                                                  <Media>
                                                  <Media body>
                                                      <p className="text-muted font-weight-medium">Acciones</p>

                                                  </Media>

                                                        <div className="col-xl col-sm-3">
                                                            <FormGroup className="mt-3 mb-0">
                                                                  <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-right">
                                                                      <span className="avatar-title">
                                                                          <i className="bx bx-rotate-right font-size-24"></i>
                                                                      </span>
                                                                  </div>
                                                            </FormGroup>
                                                        </div>
                                                          <div className="col-xl col-sm-3">
                                                                <FormGroup className="mt-3 mb-0">
                                                                      <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-right">
                                                                          <span className="avatar-title">
                                                                              <i className="bx bxs-file-pdf font-size-24"></i>
                                                                          </span>
                                                                      </div>
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col-xl col-sm-3">
                                                                  <FormGroup className="mt-3 mb-0">
                                                                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-right">
                                                                            <span className="avatar-title">
                                                                                <i className="mdi-microsoft-excel font-size-24"></i>
                                                                            </span>
                                                                        </div>
                                                                  </FormGroup>
                                                              </div>




                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>

                                </Row>
                            </Col>
                        </Row>


                        <Row>
                            <Col xl="12">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        reports.map((report, key) =>
                                            <Col md="4" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0">{report.description}</h4>
                                                            </Media>
                                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                                <span className="avatar-title">
                                                                    <i className={"bx " + report.iconClass + " font-size-24"}></i>
                                                                </span>
                                                            </div>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>

                        <Row>

                            <Col xl="6">
                                <LineBar />
                            </Col>

                            <Col xl="6">
                                <Pie />
                            </Col>
                        </Row>



                        <Row>

                            <Col xl="6">
                                <TopSales />
                            </Col>

                            <Col xl="6">
                                <ActivitySales />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="12">
                                <EcommerceOrders />
                            </Col>
                        </Row>
                    </Container>
                </div>

            </React.Fragment>
          );
        }

export default withNamespaces()(Resumen);
