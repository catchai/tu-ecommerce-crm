import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Card, CardBody, Table, Label, Badge, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import  firebase from "../../firebase";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import img4 from "../../assets/images/product/img-4.png";
import img7 from "../../assets/images/product/img-7.png";

class EcommerceAdmProduct extends Component {

  // Paso1 : Definicion
  state = {
      data: [],
      modalInsertar: false,
      modalEditar: false,
      form: {
        calories: '',
        categories: '',
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
      firebase.child("data").child("products").on("value", (prdto) => {
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
       firebase.child('data').child("products").once('value', function(snapshot)
       {
           count  =(snapshot.numChildren() + 1);
           alert('Count: ' + count);

       });

        this.state.form.id = count;
        firebase.child('data').child("products").push().set(this.state.form);
        this.setState({modalInsertar: false});


    }

    handleChange=e=>{
      this.setState({
        form:{...this.state.form,
              [e.target.name]: e.target.value
      }})
      console.log(this.state.form);
    }


    peticionPut=()=>{
    firebase.child(`data/products/${this.state.id}`).set(
     this.state.form,
     error=>{
       if(error)console.log(error)
     });
     this.setState({modalEditar: false});
    }

    peticionDelete=()=>{
        if(window.confirm(`Estás seguro que deseas eliminar el producto ${this.state.form && this.state.form.title}?`))
        {
        firebase.child(`data/products/${this.state.id}`).remove(
         error=>{
           if(error)console.log(error)
         });
        }
    }

    seleccionarProducto=async(producto, id, caso)=>{

    await this.setState({form: producto, id: id});

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
                                                        console.log(i);

                                                          return  <tr key={"_product_" + i}>
                                                                <td>
                                                                    <div className="custom-control custom-checkbox">
                                                                        <Input type="checkbox" className="custom-control-input" id={this.state.data[i].id} />
                                                                        <Label className="custom-control-label" htmlFor={this.state.data[i].id}>&nbsp;</Label>
                                                                    </div>
                                                                </td>
                                                                <td><Link to="#" className="text-body font-weight-bold">{this.state.data[i].title}</Link></td>
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
                                                                    <Link to="#" className="mr-3 text-primary" onClick={()=>this.seleccionarProducto(this.state.data[i], i, 'Editar')}>
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






                <Modal isOpen={this.state.modalEditar} role="dialog"  className="exampleModal" tabindex="-1" >
                    <div className="modal-content">
                        <ModalHeader >
                             Editar Detalle Producto
                            </ModalHeader >
                        <ModalBody>
                            <p className="mb-2">ID Producto: <span className="text-primary">{this.state.id}</span></p>
                            <p className="mb-4">Nombre: <span className="text-primary">{this.state.title}</span></p>

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
                            <Button type="button" color="secondary" onClick={()=>this.setState({modalEditar: false})}>Close</Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </React.Fragment>
          );
    }
  };
export default EcommerceAdmProduct;
