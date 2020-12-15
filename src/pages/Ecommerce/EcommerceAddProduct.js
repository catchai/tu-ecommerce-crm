import React, { Component, useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import  firebase from "../../firebase";
import * as firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class EcommerceAddProduct extends Component {




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
          count = 0;
          peticionGet = () => {

            firebase.database().ref(`data/products`).once('value').then((snapshot) => {

                this.count  = (snapshot.numChildren()) + 1;
            });

          };

          // Se carga al incio del componente
          componentDidMount() {
             this.peticionGet();
           }


        peticionPost=()=>{
           alert(this.count);
           this.state.form.id = this.count;
           firebase.database().ref(`data/products`).push().set(this.state.form);
           this.setState({modalInsertar: false});

       };

       onSelectCategoryChange=e=>{
           this.setState({categories: e});

           this.setState({
             form:{...this.state.form,
                   categories: e
             }});

        };

       onSelectFlavorsChange=e=>{
            this.setState({flavors: e});

            this.setState({
              form:{...this.state.form,
                    flavors: e
              }});
        };


       handleChange=e=>{
          this.setState({
            form:{...this.state.form,
                  [e.target.name]: e.target.value
            }});

       };


render() {


  let catego = [];
  firebase.database().ref("data/category").on("child_added", (snap) => {
    catego.push(snap.val());

  });
  let flavors = [];
  firebase.database().ref("data/flavor").on("child_added", (snap) => {
    flavors.push(snap.val());
  });

  return (

    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Comercio" breadcrumbItem="Agregar Producto" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Información Básica</CardTitle>
                  <CardSubtitle className="mb-3">
                    Completar toda la información requerida
                  </CardSubtitle>

                  <Form>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="productname">Nombre del Producto</Label>
                          <Input
                            id="title"
                            name="title"
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="dicount">
                            Descuento %
                          </Label>
                          <Input
                            id="discount"
                            name="discount"
                            type="text"
                            className="form-control"
                              onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="rating">
                          Rating
                          </Label>
                          <Input
                            id="rating"
                            name="rating"
                            type="text"
                            className="form-control"
                              onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="price">Precio</Label>
                          <Input
                            id="price"
                            name="price"
                            type="text"
                            className="form-control"
                              onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="6">

                        <FormGroup>

                        </FormGroup>
                        <Label htmlFor="text">
                        Categoría
                        </Label>
                         <Select  options={catego}  value={this.state.categories} onChange={this.onSelectCategoryChange} />

                        <FormGroup>
                        </FormGroup>
                        <Label htmlFor="text">
                          Ingredientes
                        </Label>
                        <Select options={flavors}  value={this.state.flavors} onChange={this.onSelectFlavorsChange}/>

                        <FormGroup>
                          <Label htmlFor="text">
                            Descripción Producto
                          </Label>
                          <textarea
                            className="form-control"
                            id="text"
                            name="text"
                            rows="5"
                            onChange={this.handleChange}
                          ></textarea>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      color="primary"
                      onClick={()=>this.peticionPost()}
                      className="mr-1 waves-effect waves-light"
                    >
                      Guardar Cambios
                    </Button>
                    <Button
                      type="submit"
                      color="secondary"
                      className="waves-effect"
                    >
                      Cancelar
                    </Button>
                  </Form>
                </CardBody>
              </Card>


            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
};

export default EcommerceAddProduct;
