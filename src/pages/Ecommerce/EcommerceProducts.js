import React, { useState } from "react";
import { Messaging } from "../../src/client/Messaging";
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

axios.defaults.baseURL = "http://localhost:3001/v1";

var admin = require("firebase-admin");

var serviceAccount = require("src/integrations/tuecommerce-9aca3-firebase-adminsdk-ubez1-6eecd1f71d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tuecommerce-9aca3.firebaseio.com",
});

const EcommerceProducts = (props) => {
  const [activeTab, setactiveTab] = useState(false);

  // Accion 2 : Lectura desde el nivel empresa json
  let catalogoRef = firebase
    .database()
    .ref()
    .child("Detalle")
    .child("descripcion");
  let label_clothe = "prueba";
  catalogoRef.on("value", (snapshot) => {
    addLabel(snapshot.val());
  });
  function addLabel(valu) {
    label_clothe = valu;
    console.log(label_clothe);
  }

  // Carga de Filtros
  let FilterClothes = [];
  let filtersRef = firebase.database().ref("Filters");
  filtersRef.on("child_added", (snap) => {
    FilterClothes.push(snap.val());
  });
  console.log(FilterClothes);

  function loadFilters(valu) {
    FilterClothes.push(valu);
  }
  /////////////////////////////////////

  // Carga de Productos Firebase
  let Products = [];
  let productsRef = firebase.database().ref("Products");
  productsRef.on("child_added", (snap) => {
    Products.push(snap.val());
  });
  console.log(Products);

  function loadProducts(valu) {
    Products.push(valu);
  }
  /////////////////////////////////////

  function toggleTab(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  return (
    <React.Fragment>
      <Messaging />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Comercio" breadcrumbItem="Productos" />
          <Row>
            <Col lg="12">
              <Row>
                {Products.map((product, key) => (
                  <Col xl="4" sm="6" key={"_col_" + key}>
                    <Card>
                      <CardBody>
                        <div className="product-img position-relative">
                          {product.isOffer ? (
                            <div className="avatar-sm product-ribbon">
                              <span className="avatar-title rounded-circle  bg-primary">
                                {product.offer + "%"}
                              </span>
                            </div>
                          ) : null}

                          <img
                            src={product.image}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <h5 className="mb-3 text-truncate">
                            <Link
                              to={"/ecommerce-product-detail/" + product.id}
                              className="text-dark"
                            >
                              {product.name}{" "}
                            </Link>
                          </h5>
                          <div className="text-muted mb-3">
                            <StarRatings
                              rating={product.rating}
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
                              <del>${product.oldPrice}</del>
                            </span>{" "}
                            <b>${product.newPrice}</b>
                          </h5>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
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
  );
};

export default EcommerceProducts;
