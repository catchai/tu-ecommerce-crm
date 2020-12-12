import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import classnames from "classnames";

//Import Star Ratings
import StarRatings from "react-star-ratings";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

// Accion 1 Paso importar la libreria de Firebase
import * as firebase from "firebase";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class EcommerceProducts extends Component {


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
      firebase.database().ref("data").child("product").on("value", (products) => {
        if (products.val() !== null) {
          this.setState({ ...this.state.data, data: products.val() });
        } else {
          this.setState({ data: [] });
        }
      });
    };

    // Se carga al incio del componente
     componentDidMount() {
     this.peticionGet();
     }


 render() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Comercio" breadcrumbItem="Productos" />
          <Row>
            <Col lg="12">
              <Row>
                  {Object.keys(this.state.data).map(i=>{
                  return <Col xl="4" sm="6" key={"_col_" + i}>
                    <Card>
                      <CardBody>
                        <div className="product-img position-relative">
                          {this.state.data[i].isOffer ? (
                            <div className="avatar-sm product-ribbon">
                              <span className="avatar-title rounded-circle  bg-primary">
                                {this.state.data[i].offer + "%"}
                              </span>
                            </div>
                          ) : null}

                          <img
                            src={this.state.data[i].img}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <h5 className="mb-3 text-truncate">
                            <Link
                              to={"/ecommerce-product-detail/" + this.state.data[i].id}
                              className="text-dark"
                            >
                              {this.state.data[i].title}{" "}
                            </Link>
                          </h5>
                          <h6  className="mb-3 text-truncate">
                            <justify>{this.state.data[i].text}{" "}</justify>
                          </h6>
                          <div className="text-muted mb-3">
                            <StarRatings
                              rating={this.state.data[i].rating}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#2D363F"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="3px"
                            />
                          </div>
                          <h5 className="my-0">
                            <span className="text-muted mr-2">
                              <del>${this.state.data[i].price*1.6}</del>
                            </span>{" "}
                            <b>${this.state.data[i].price}</b>
                          </h5>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                })}
              </Row>

              {/* <Row>
                <Col lg="12">
                  <Pagination className="pagination pagination-rounded justify-content-center">
                    <PaginationItem disabled>
                      <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next href="#" />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
 }
}

export default EcommerceProducts;
