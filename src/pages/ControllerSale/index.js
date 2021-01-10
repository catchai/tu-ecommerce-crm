import React from 'react';
import { Container, Row, Col, Card, CardBody, Media,  FormGroup , Label, Form } from "reactstrap";
import { Link } from "react-router-dom";



import DatePicker from "react-datepicker";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

 const ControllerSale = (props) => {



          const finanza = [
                { title: "Cantidad Pedidos/Día", iconClass: "bx-purchase-tag-alt", description: "25" },
                { title: "Ingreso/Venta Diaria", iconClass: "bx-money", description: "$35.000" },
                { title: "Ticket Promerio Diario", iconClass: "bx-check", description: "15" },
                { title: "Ticket Promerio Diario", iconClass: "bx-check", description: "15" }
            ];

            const cliente = [
                  { title: "Tasa de Nuevos Cliente", iconClass: "bx-purchase-tag-alt", description: "15" },
                  { title: "Tasa Retención Clientes", iconClass: "bx-purchase-tag-alt", description: "30" },
                  { title: "Carritos Abandonados", iconClass: "bx-money", description: "145" },
                  { title: "Cantidad Usuarios", iconClass: "bx-check", description: "450" }
              ];

              const delivery = [
                    { title: "Cantidad Ventas Local", iconClass: "bx-purchase-tag-alt", description: "25" },
                    { title: "Cantidad Ventas Delivery", iconClass: "bx-purchase-tag-alt", description: "25" },
                    { title: "Promedio de Tiempo / Pedido", iconClass: "bx-money", description: "$35.000" },
                    { title: "Devoluciones", iconClass: "bx-check", description: "15" }
                ];

          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>



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


                        {/* Render Breadcrumb */}
                        <Link to="/home">
                        <Breadcrumbs title="Home" linktitle="/home" breadcrumbItem="Controller/Financiero"   />
                        </Link>

                        <Row>
                            <Col xl="12">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        finanza.map((report, key) =>
                                            <Col md="3" key={"_col_" + key}>
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

                        <Link to="/home">
                        <Breadcrumbs title="Home" linktitle="/home" breadcrumbItem="Controller/Clientes"   />
                        </Link>

                        <Row>
                            <Col xl="12">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        cliente.map((report, key) =>
                                            <Col md="3" key={"_col_" + key}>
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

                        <Link to="/home">
                        <Breadcrumbs title="Home" linktitle="/home" breadcrumbItem="Controller/Delivery"   />
                        </Link>

                        <Row>
                            <Col xl="12">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        delivery.map((report, key) =>
                                            <Col md="3" key={"_col_" + key}>
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





                        {
                        //   <Row>
                        //
                        //     <Col xl="6">
                        //         <LineBar />
                        //     </Col>
                        //
                        //     <Col xl="6">
                        //         <Pie />
                        //     </Col>
                        // </Row>
                        //
                        //
                        //
                        // <Row>
                        //
                        //     <Col xl="6">
                        //         <TopSales />
                        //     </Col>
                        //
                        //     <Col xl="6">
                        //         <ActivitySales />
                        //     </Col>
                        // </Row>
                        //
                        // <Row>
                        //     <Col lg="12">
                        //         <EcommerceOrders />
                        //     </Col>
                        // </Row>
                      }
                    </Container>
                </div>

            </React.Fragment>
          );
        }

export default withNamespaces()(ControllerSale);
