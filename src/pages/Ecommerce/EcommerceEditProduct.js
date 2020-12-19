import React, { Component  } from 'react';
import { Link, useParams , useHistory } from "react-router-dom";
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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
// Rating Plugin
import RatingTooltip from "react-rating-tooltip";

class EcommerceEditProduct extends Component {

  starStyle = {};

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

        let idx = localStorage.getItem('id');
        alert('dentro de editar idx:'+idx);
        this.setState({id:idx});
        firebase.database().ref(`data/products/${idx}`).once("value").then((prdto) => {

          if (prdto.val() !== null) {
            this.setState({ ...this.state.data.form, form: prdto.val() });
          } else {
            this.setState({ form: [] });
          }



        });
      };



      // Se carga al incio del componente
      componentDidMount() {
         this.peticionGet();
       }


      peticionPut=()=>{
      firebase.database().ref(`data/products/${this.state.id}`).set(
       this.state.form,
       error=>{
         if(error)console.log(error)
       });
       this.setState({modalEditar: false});
      }

       onSelectCategoryChange=e=>{
           this.setState({category: e});

           this.setState({
             form:{...this.state.form,
                   category: e
             }});

        };

       onSelectFlavorsChange=e=>{
            this.setState({flavors: e});

            this.setState({
              form:{...this.state.form,
                    flavors: e
              }});
        };

        onRatingChange=e=>{
             this.setState({rating: e});

             this.setState({
               form:{...this.state.form,
                     rating: e
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
          <Breadcrumbs title="Comercio" breadcrumbItem="Editar Producto" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Edición Producto</CardTitle>
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
                            value={this.state.form.title}
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
                            value={this.state.form.discount}
                            type="text"
                            className="form-control"
                              onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="rating">
                          Rating
                          </Label>

                            <RatingTooltip
                              max={5}
                              value={this.state.form.rating}
                              onChange={this.onRatingChange}
                              ActiveComponent={
                                <i
                                  key={"active_1"}
                                  className="mdi mdi-star text-primary"
                                  style={this.starStyle}
                                />
                              }
                              InActiveComponent={
                                <i
                                  key={"active_01"}
                                  className="mdi mdi-star-outline text-muted"
                                  style={this.starStyle}
                                />
                              }
                            />


                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="price">Precio</Label>
                          <Input
                            id="price"
                            name="price"
                            type="text"
                            value={this.state.form.price}
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
                         <Select  options={catego}  value={this.state.form.category} onChange={this.onSelectCategoryChange} />

                        <FormGroup>
                        </FormGroup>
                        <Label htmlFor="text">
                          Ingredientes
                        </Label>
                        <Select options={flavors}  value={this.state.form.flavors} onChange={this.onSelectFlavorsChange}/>

                        <FormGroup>
                          <Label htmlFor="text">
                            Descripción Producto
                          </Label>
                          <textarea
                            className="form-control"
                            id="text"
                            name="text"
                            value={this.state.form.text}
                            rows="5"
                            onChange={this.handleChange}
                          ></textarea>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      color="primary"
                      onClick={()=>this.peticionPut()}
                      className="mr-1 waves-effect waves-light"
                    >
                      Guardar Cambios
                    </Button>
                    <Link to="/ecommerce-admin-product">
                    <Button
                      type="button"
                      color="secondary"
                      className="waves-effect"

                    >
                      Cancelar
                    </Button>
                    </Link>
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

export default EcommerceEditProduct;
