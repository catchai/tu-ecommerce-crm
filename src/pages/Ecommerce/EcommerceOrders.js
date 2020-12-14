import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Card, CardBody, Table, Label, Badge, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Pagination, PaginationItem, PaginationLink } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import img4 from "../../assets/images/product/img-4.png";
import img7 from "../../assets/images/product/img-7.png";

import * as firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";

class EcommerceOrders extends Component {

  // Paso1 : Definicion
  state = {
      data: [],
      modalInsertar: false,
      modalEditar: false,
      form: {
        Date : '',
        badgeclass : '',
        billingName : '',
        id : '',
        methodIcon : '',
        orderId : '',
        paymentMethod : '',
        paymentStatus : '',
        total : '',
      },
      id: 0
    };

    peticionGet = () => {
        firebase.database().ref("Pedidos").on("value", (pedidos) => {
          if (pedidos.val() !== null) {
            this.setState({ ...this.state.data, data: pedidos.val() });
          } else {
            this.setState({ data: [] });
          }
        });
      };

      // Se carga al incio del componente
       componentDidMount() {
       this.peticionGet();
       }




render(){
    return (
           <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Comercio" breadcrumbItem="Ventas" />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>
                                        <Row className="mb-2">
                                            <Col sm="4">
                                                <div className="search-box mr-2 mb-2 d-inline-block">
                                                    <div className="position-relative">
                                                        <Input type="text" className="form-control" placeholder="Buscar..." />
                                                        <i className="bx bx-search-alt search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm="8">
                                                <div className="text-sm-right">
                                                    <Button type="button"  onClick={()=>this.setState({modalInsertar: true})} color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> Agregar Venta Nueva</Button>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive">
                                            <Table className="table table-centered table-nowrap">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th style={{ width: "20px" }}>
                                                            <div className="custom-control custom-checkbox">
                                                                <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                                <Label className="custom-control-label" htmlFor="customCheck1">&nbsp;</Label>
                                                            </div>
                                                        </th>
                                                        <th>Nº Orden</th>
                                                        <th>Estado</th>
                                                        <th>Cliente</th>
                                                        <th>Fecha</th>
                                                        <th>Total</th>
                                                        <th>Método de Pago</th>
                                                        <th>Ver Detalle</th>
                                                        <th>Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { Object.keys(this.state.data).map(i=>{
                                                  console.log(i);
                                                    return  <tr key={"_order_" + i}>
                                                                <td>
                                                                    <div className="custom-control custom-checkbox">
                                                                        <Input type="checkbox" className="custom-control-input" id={this.state.data[i].id} />
                                                                        <Label className="custom-control-label" htmlFor={this.state.data[i].id}>&nbsp;</Label>
                                                                    </div>
                                                                </td>
                                                                <td><Link to="#" className="text-body font-weight-bold">{this.state.data[i].orderId}</Link></td>
                                                                <td>  <Badge className={"font-size-12 badge-soft-" + this.state.data[i].badgeclass} color={this.state.data[i].badgeClass} pill>{this.state.data[i].paymentStatus}</Badge></td>
                                                                <td>
                                                                  {this.state.data[i].billingName}
                                                                </td>
                                                                <td>
                                                                      {this.state.data[i].Date}
                                                                </td>
                                                                <td>
                                                                    {this.state.data[i].total}
                                                                </td>
                                                                <td>
                                                                    <i className={"fab " + this.state.data[i].methodIcon + " mr-1"}></i> {this.state.data[i].paymentMethod}
                                                                </td>
                                                                <td>
                                                                    <Button type="button" color="primary" className="btn-sm btn-rounded" onClick={()=>this.setState({modalEditar: true})}>
                                                                        Ver Detalle
                                                                    </Button>
                                                                </td>
                                                                <td>
                                                                    <Link to="#" className="mr-3 text-primary">
                                                                        <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip"></i>
                                                                        <UncontrolledTooltip placement="top" target="edittooltip">
                                                                            Editar
                                                                        </UncontrolledTooltip >
                                                                    </Link>
                                                                    <Link to="#" className="text-danger">
                                                                        <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip"></i>
                                                                        <UncontrolledTooltip placement="top" target="deletetooltip">
                                                                            Eliminar
                                                                        </UncontrolledTooltip >
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                      })}

                                                </tbody>
                                            </Table>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Modal isOpen={this.state.modalInsertar} role="dialog" autoFocus="true" centered="true" className="exampleModal" tabindex="-1" toggle="true">
                    <div className="modal-content">
                        <ModalHeader toggle="true">
                          Ingreso de Orden
                            </ModalHeader >
                        <ModalBody>
                            <p className="mb-2">Product id: <span className="text-primary">#SK2540</span></p>
                            <p className="mb-4">Billing Name: <span className="text-primary">Neal Matthews</span></p>

                            <div className="table-responsive">
                                <Table className="table table-centered table-nowrap">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={img7} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Wireless Headphone (Black)</h5>
                                                    <p className="text-muted mb-0">$ 225 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 255</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={img4} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Hoodie (Blue)</h5>
                                                    <p className="text-muted mb-0">$ 145 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 145</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Sub Total:</h6>
                                            </td>
                                            <td>
                                                $ 400
                                                </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Shipping:</h6>
                                            </td>
                                            <td>
                                                Free
                                                </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Total:</h6>
                                            </td>
                                            <td>
                                                $ 400
                                                </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={()=>this.setState({modalInsertar: false})}>Cerrar</Button>
                        </ModalFooter>
                    </div>
                </Modal>



                <Modal isOpen={this.state.modalEditar} role="dialog" autoFocus="true" centered="true" className="exampleModal" tabindex="-1" toggle="true">
                    <div className="modal-content">
                        <ModalHeader toggle="true">
                            Detalle de Orden
                            </ModalHeader >
                        <ModalBody>
                            <p className="mb-2">Product id: <span className="text-primary">#SK2540</span></p>
                            <p className="mb-4">Billing Name: <span className="text-primary">Neal Matthews</span></p>

                            <div className="table-responsive">
                                <Table className="table table-centered table-nowrap">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={img7} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Wireless Headphone (Black)</h5>
                                                    <p className="text-muted mb-0">$ 225 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 255</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={img4} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Hoodie (Blue)</h5>
                                                    <p className="text-muted mb-0">$ 145 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 145</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Sub Total:</h6>
                                            </td>
                                            <td>
                                                $ 400
                                                </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Shipping:</h6>
                                            </td>
                                            <td>
                                                Free
                                                </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Total:</h6>
                                            </td>
                                            <td>
                                                $ 400
                                                </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={()=>this.setState({modalEditar: false})}>Cerrar</Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </React.Fragment>
          );
    }
}
export default EcommerceOrders;
