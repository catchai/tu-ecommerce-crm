import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Card, CardBody, Table, Label, Badge, UncontrolledTooltip} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

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

    peticionDelete=()=>{
        if(window.confirm(`Estás seguro que deseas eliminar el producto ${this.state.form && this.state.form.orderId}?`))
        {
        firebase.database().ref(`Pedidos/${this.state.id}`).remove(
         error=>{
           if(error)console.log(error)
         });
        }
    }


    // switcher
    seleccionarProducto=(order, id, caso)=>{
        this.setState({form: order, id: id});
        localStorage.setItem('id',id);
        (caso==="Editar")?this.setState({modalEditar: true}):
          this.peticionDelete()
    }


render(){
    return (
           <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Home" linktitle="/home"  breadcrumbItem="Ventas" />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>
                                        <Row className="mb-2">
                                            <Col sm="12">
                                                <div className="search-box mr-2 mb-2 d-inline-block" style={{ width: "50%" }}>
                                                    <div className="position-relative">
                                                        <Input type="text" className="form-control" placeholder="Buscar..." />
                                                        <i className="bx bx-search-alt search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                           {
                                          // <Col sm="8">
                                          //       <div className="text-sm-right">
                                          //         <Link to={{pathname: "/ecommerce-add-order"}} className="mr-3 text-primary">
                                          //           <Button type="button"  color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> Agregar Venta Nueva</Button>
                                          //         </Link>
                                          //       </div>
                                          //   </Col>
                                        }
                                        </Row>

                                        <div className="table-responsive">
                                            <Table className="table table-centered table-nowrap">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th colspan="9">
                                                     Pedidos del día 12 de Enero 2021
                                                    </th>
                                                </tr>
                                            </thead>
                                                <thead className="thead-light">
                                                    <tr>
                                                        {
                                                        //   <th style={{ width: "20px" }}>
                                                        //     <div className="custom-control custom-checkbox">
                                                        //         <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                        //         <Label className="custom-control-label" htmlFor="customCheck1">&nbsp;</Label>
                                                        //     </div>
                                                        // </th>
                                                       }
                                                        <th>Nº Orden</th>
                                                        <th>Estado</th>
                                                        <th>Cliente</th>
                                                        <th>Fecha</th>
                                                        <th>Total</th>
                                                        <th>Método de Pago</th>
                                                        <th>Ver Detalle</th>
                                                        {
                                                          // <th>Acción</th>
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { Object.keys(this.state.data).map(i=>{
                                                    return  <tr key={"_order_" + i}>
                                                              {
                                                                //   <td>
                                                                //     <div className="custom-control custom-checkbox">
                                                                //         <Input type="checkbox" className="custom-control-input" id={this.state.data[i].id} />
                                                                //         <Label className="custom-control-label" htmlFor={this.state.data[i].id}>&nbsp;</Label>
                                                                //     </div>
                                                                // </td>
                                                              }
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
                                                                    <Link to={{pathname: "/detalle-pedido/1"}} className="mr-3 text-primary">
                                                                      <Button type="button" color="primary" className="btn-sm btn-rounded"  >
                                                                      Gestionar
                                                                    </Button>
                                                                    </Link>
                                                                </td>
                                                                {
                                                               //    <td>
                                                               //  <Link to={`/ecommerce-edit-order/${i}`} onClick={()=>this.seleccionarProducto(this.state.data[i], i, 'Editar')}
                                                               // className="mr-3 text-primary">
                                                               //          <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip"></i>
                                                               //          <UncontrolledTooltip placement="top" target="edittooltip">
                                                               //              Editar
                                                               //          </UncontrolledTooltip >
                                                               //      </Link>
                                                               //      <Link to="#" className="text-danger">
                                                               //          <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip"></i>
                                                               //          <UncontrolledTooltip placement="top" target="deletetooltip">
                                                               //              Eliminar
                                                               //          </UncontrolledTooltip >
                                                               //      </Link>
                                                               //  </td>
                                                              }
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

            </React.Fragment>
          );
    }
}
export default EcommerceOrders;
