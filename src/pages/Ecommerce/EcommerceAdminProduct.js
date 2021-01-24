import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Card, CardBody, Table, Label,  UncontrolledTooltip  } from "reactstrap";

import * as firebase from "firebase";
import Breadcrumbs from '../../components/Common/Breadcrumb';

class EcommerceAdmProduct extends Component {

  // Paso1 : Definicion
  state = {
      data: [],
      modalInsertar: false,
      modalEditar: false,
      form: {
        calories: '',
        category: '',
        combo: '',
        discount: '',
        discountprice: '',
        flavors:'',
        id:'',
        name:'',
        img:'',
        label:'',
        price:'',
        rating:'',
        text:'',
        time:'',
        title:'',
        totalRating:'',
        trending:'',
        comments:''
      },
      id: 0
    };


    peticionGet = () => {

      localStorage.removeItem('id');
      firebase.database().ref("data").child("products").on("value", (prdto) => {
        if (prdto.val() !== null) {
          this.setState({ ...this.state.data, data: prdto.val() });
        } else {
          this.setState({ data: [] });
        }
      });
    };

    // Se carga al incio del componente
    componentDidMount() {
       this.peticionGet();
     }

     // Paso 3: Ingresar el Item Nuevo
     peticionPost=()=>{
       let count = 0;
       firebase.database().ref("data/products").once("value", function(snapshot)
       {
           count  =(snapshot.numChildren() + 1);

       });
        this.state.form.id = count;
        firebase.database().ref("data/products").push().set(this.state.form);
        this.setState({modalInsertar: false});

    }

    handleChange=e=>{
      this.setState({
        form:{...this.state.form,
              [e.target.name]: e.target.value
      }})
    }


    peticionDelete=()=>{
        if(window.confirm(`Estás seguro que deseas eliminar el producto ${this.state.form && this.state.form.title}?`))
        {
        firebase.database().ref(`data/products/${this.state.id}`).remove(
         error=>{
           if(error)console.log(error)
         });
        }
    }

    seleccionarProducto=(producto, id, caso)=>{

    this.setState({form: producto, id: id});

    localStorage.setItem('id',id);

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

    }



    render() {

    return (
           <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Comercio" breadcrumbItem="Admin Producto" />
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
                                                      <Button type="button"  onClick={event =>  window.location.href='/ecommerce-add-product'} color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> Ingresar Nuevo Producto</Button>

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
                                                        <th>ID Producto</th>
                                                        <th>Nombre Producto</th>
                                                        <th>Descripcion</th>
                                                        <th>Precio</th>
                                                        <th>Descuento</th>
                                                        <th>Rating</th>
                                                        <th>View Details</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                      { Object.keys(this.state.data).map(i=>{

                                                          return  <tr key={"_product_" + i}>
                                                                <td>
                                                                    <div className="custom-control custom-checkbox">
                                                                        <Input type="checkbox" className="custom-control-input" id={this.state.data[i].id} />
                                                                        <Label className="custom-control-label" htmlFor={this.state.data[i].id}>&nbsp;</Label>
                                                                    </div>
                                                                </td>
                                                                <td><Link to="#" className="text-body font-weight-bold">{this.state.data[i].id}</Link></td>
                                                                <td>{this.state.data[i].title}</td>
                                                                <td>
                                                                    {this.state.data[i].text}
                                                                </td>
                                                                <td>
                                                                    {this.state.data[i].price}
                                                                </td>
                                                                <td>

                                                                        {this.state.data[i].discount}
                                                                      {// <Badge className={"font-size-12 badge-soft-" + this.state.data[i].badgeclass} color={this.state.data[i].badgeClass} pill>{this.state.data[i].paymentStatus}</Badge>
                                                                  }
                                                                </td>
                                                                <td>
                                                                        {this.state.data[i].rating}
                                                                    {
                                                                      // <i className={"fab " + this.state.data[i].methodIcon + " mr-1"}></i> {this.state.data[i].paymentMethod}
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <Button type="button" color="primary" className="btn-sm btn-rounded"  onClick={event =>  window.location.href='/ecommerce-product-detail'}>
                                                                        Ver Detalle
                                                                    </Button>
                                                                </td>
                                                                <td>
                                                                <Link to={`/ecommerce-edit-product/${this.state.data[i].id}`} onClick={()=>this.seleccionarProducto(this.state.data[i], i, 'Editar')}
                                                               className="mr-3 text-primary">
                                                                         <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip"></i>
                                                                        <UncontrolledTooltip placement="top" target="edittooltip">
                                                                            Editar
                                                                        </UncontrolledTooltip >
                                                                    </Link>
                                                                    <Link to="#" className="text-danger" onClick={()=>this.seleccionarProducto(this.state.data[i], i, 'Eliminar')}>
                                                                        <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip"></i>
                                                                        <UncontrolledTooltip placement="top" target="deletetooltip">
                                                                            Delete
                                                                        </UncontrolledTooltip >
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                          })}
                                                        </tbody>
                                            </Table>
                                        </div>
                                        {
                                    //     <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                                    //         <PaginationItem disabled>
                                    //             <PaginationLink previous href="#" />
                                    //         </PaginationItem>
                                    //         <PaginationItem>
                                    //             <PaginationLink href="#">
                                    //                 1
                                    //             </PaginationLink>
                                    //         </PaginationItem>
                                    //         <PaginationItem active>
                                    //             <PaginationLink href="#">
                                    //                 2
                                    //             </PaginationLink>
                                    //         </PaginationItem>
                                    //         <PaginationItem>
                                    //             <PaginationLink href="#">
                                    //                 3
                                    //             </PaginationLink>
                                    //         </PaginationItem>
                                    //         <PaginationItem>
                                    //             <PaginationLink href="#">
                                    //                 4
                                    //             </PaginationLink>
                                    //         </PaginationItem>
                                    //         <PaginationItem>
                                    //             <PaginationLink href="#">
                                    //                 5
                                    //             </PaginationLink>
                                    //         </PaginationItem>
                                    //         <PaginationItem>
                                    //             <PaginationLink next href="#" />
                                    //         </PaginationItem>
                                    //     </Pagination>
                                  }
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>



            </React.Fragment>
          );
    }
  };
export default EcommerceAdmProduct;
