import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Media,
} from "reactstrap";
import classnames from "classnames";

//Import Star Ratings
import StarRatings from "react-star-ratings";

//Import Product Images
import img7 from "../../assets/images/product/img-7.png";
import img8 from "../../assets/images/product/img-8.png"; 

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


import * as firebase from "firebase";

const EcommerceProductDetail = (props) => {
  const [activeTab, setactiveTab] = useState("3");

  let Comments = [];
  let commentsRef = firebase.database().ref("data").child("product").child("1").child("comment");
  commentsRef.on("child_added", (snap) => {
    Comments.push(snap.val());
  });
  console.log(Comments);

  function imageShow(img, id) {
    var expandImg = document.getElementById("expandedImg" + id);
    expandImg.src = img;
  }

  // Carga de Productos Firebase
  let Producto = [];
  let productsRef = firebase.database().ref("data").child("product").child("1");
  productsRef.on("child_added", (snap) => {
    Producto.push(snap.val());
  });
  console.log(Producto);

  /////////////////////////////////////


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Detalle del Producto" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col xl="6">
                      <div className="product-detai-imgs">
                        <Row>
                          <Col md="2" xs="3">
                            <Nav className="flex-column" pills>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "1",
                                  })}
                                  onClick={() => {
                                    setactiveTab("1");
                                  }}
                                >
                                  <img
                                    src={img7}
                                    alt=""
                                    onClick={() => {
                                      imageShow(img7, 1);
                                    }}
                                    className="img-fluid mx-auto d-block rounded"
                                  />
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "2",
                                  })}
                                  onClick={() => {
                                    setactiveTab("2");
                                  }}
                                >
                                  <img
                                    src={img8}
                                    alt=""
                                    onClick={() => {
                                      imageShow(img8, 2);
                                    }}
                                    className="img-fluid mx-auto d-block rounded"
                                  />
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "3",
                                  })}
                                  onClick={() => {
                                    setactiveTab("3");
                                  }}
                                >
                                  <img
                                    src={img7}
                                    alt=""
                                    onClick={() => {
                                      imageShow(img7, 3);
                                    }}
                                    className="img-fluid mx-auto d-block rounded"
                                  />
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: activeTab === "4",
                                  })}
                                  onClick={() => {
                                    setactiveTab("4");
                                  }}
                                >
                                  <img
                                    src={img8}
                                    alt=""
                                    onClick={() => {
                                      imageShow(img8, 4);
                                    }}
                                    className="img-fluid mx-auto d-block rounded"
                                  />
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </Col>
                          <Col md={{ size: 7, offset: 1 }} xs="9">
                            <TabContent activeTab={activeTab}>
                              <TabPane tabId="1">
                                <div>
                                  <img
                                    src={img7}
                                    alt=""
                                    id="expandedImg1"
                                    className="img-fluid mx-auto d-block"
                                  />
                                </div>
                              </TabPane>
                              <TabPane tabId="2">
                                <div>
                                  <img
                                    src={img8}
                                    id="expandedImg2"
                                    alt=""
                                    className="img-fluid mx-auto d-block"
                                  />
                                </div>
                              </TabPane>
                              <TabPane tabId="3">
                                <div>
                                  <img
                                    src={img7}
                                    id="expandedImg3"
                                    alt=""
                                    className="img-fluid mx-auto d-block"
                                  />
                                </div>
                              </TabPane>
                              <TabPane tabId="4">
                                <div>
                                  <img
                                    src={img8}
                                    id="expandedImg4"
                                    alt=""
                                    className="img-fluid mx-auto d-block"
                                  />
                                </div>
                              </TabPane>
                            </TabContent>
                            <div className="text-center">
                              <Button
                                type="button"
                                color="primary"
                                className="btn waves-effect waves-light mt-2 mr-1"
                              >
                                <i className="bx bx-cart mr-2"></i> Add to cart
                              </Button>
                              <Button
                                type="button"
                                color="success"
                                className="ml-1 btn waves-effect  mt-2 waves-light"
                              >
                                <i className="bx bx-shopping-bag mr-2"></i>Buy
                                now
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col xl="6">
                      <div className="mt-4 mt-xl-3">
                        <Link to="#" className="text-primary">
                          {Producto.img}
                        </Link>
                        <h4 className="mt-1 mb-3">
                          Wireless Headphone (Black)
                        </h4>

                        <div className="text-muted float-left mr-3 mb-3">
                          <StarRatings
                            rating={4}
                            starRatedColor="#F1B44C"
                            starEmptyColor="#2D363F"
                            numberOfStars={5}
                            name="rating"
                            starDimension="14px"
                            starSpacing="3px"
                          />
                        </div>
                        <p className="text-muted mb-4">
                          ( 152 Customers Review )
                        </p>

                        <h6 className="text-success text-uppercase">
                          20 % Off
                        </h6>
                        <h5 className="mb-4">
                          Price :{" "}
                          <span className="text-muted mr-2">
                            <del>$240 USD</del>
                          </span>{" "}
                          <b>$225 USD</b>
                        </h5>
                        <p className="text-muted mb-4">
                          To achieve this, it would be necessary to have uniform
                          grammar pronunciation and more common words If several
                          languages coalesce
                        </p>
                        <Row className="mb-3">
                          <Col md="6">
                            <div>
                              <p className="text-muted">
                                <i className="bx bx-unlink font-size-16 align-middle text-primary mr-1"></i>{" "}
                                Wireless
                              </p>
                              <p className="text-muted">
                                <i className="bx bx-shape-triangle font-size-16 align-middle text-primary mr-1"></i>{" "}
                                Wireless Range : 10m
                              </p>
                              <p className="text-muted">
                                <i className="bx bx-battery font-size-16 align-middle text-primary mr-1"></i>{" "}
                                Battery life : 6hrs
                              </p>
                            </div>
                          </Col>
                          <Col md="6">
                            <div>
                              <p className="text-muted">
                                <i className="bx bx-user-voice font-size-16 align-middle text-primary mr-1"></i>{" "}
                                Bass
                              </p>
                              <p className="text-muted">
                                <i className="bx bx-cog font-size-16 align-middle text-primary mr-1"></i>{" "}
                                Warranty : 1 Year
                              </p>
                            </div>
                          </Col>
                        </Row>

                        <div className="product-color">
                          <h5 className="font-size-15">Color :</h5>
                          <Link to="#" className="active">
                            <div className="product-color-item border rounded">
                              <img src={img7} alt="" className="avatar-md" />
                            </div>
                            <p>Black</p>
                          </Link>
                          <Link to="#">
                            <div className="product-color-item border rounded">
                              <img src={img7} alt="" className="avatar-md" />
                            </div>
                            <p>Blue</p>
                          </Link>
                          <Link to="#">
                            <div className="product-color-item border rounded">
                              <img src={img7} alt="" className="avatar-md" />
                            </div>
                            <p>Gray</p>
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-5">
                    <h5 className="mb-3">Specifications :</h5>

                    <div className="table-responsive">
                      <Table className="table mb-0 table-bordered">
                        <tbody>
                          <tr>
                            <th scope="row" style={{ width: "400px" }}>
                              Category
                            </th>
                            <td>Headphone</td>
                          </tr>
                          <tr>
                            <th scope="row">Brand</th>
                            <td>JBL</td>
                          </tr>
                          <tr>
                            <th scope="row">Color</th>
                            <td>Black</td>
                          </tr>
                          <tr>
                            <th scope="row">Connectivity</th>
                            <td>Bluetooth</td>
                          </tr>
                          <tr>
                            <th scope="row">Warranty Summary</th>
                            <td>1 Year</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h5 className="mb-4">Comentarios :</h5>
                    {Comments.map((comment, k) => (
                      <Media
                        className={
                          comment.id === 1
                            ? "border-bottom"
                            : "border-bottom mt-3"
                        }
                        key={"__media__" + k}
                      >
                        {comment.img !== "Null" ? (
                          <img
                            src={comment.img}
                            className="avatar-xs mr-3 rounded-circle"
                            alt="img"
                          />
                        ) : (
                          <div className="avatar-xs mr-3">
                            <span className="avatar-title bg-soft-primary text-primary rounded-circle font-size-16">
                              N
                            </span>
                          </div>
                        )}
                        <Media body>
                          <h5 className="mt-0 mb-1 font-size-15">
                            {comment.name}
                          </h5>
                          <p className="text-muted">{comment.description}</p>
                          <ul className="list-inline float-sm-right">
                            <li className="list-inline-item">
                              <Link to="#">
                                <i className="far fa-thumbs-up mr-1"></i> Like
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link to="#">
                                <i className="far fa-comment-dots mr-1"></i>{" "}
                                Comment
                              </Link>
                            </li>
                          </ul>
                          <div className="text-muted font-size-12">
                            <i className="far fa-calendar-alt text-primary mr-1"></i>
                            {comment.date}
                          </div>
                          {comment.childComment
                            ? comment.childComment.map((child, key) => (
                                <Media className="mt-4" key={"_media_" + key}>
                                  <img
                                    src={child.img}
                                    className="avatar-xs mr-3 rounded-circle"
                                    alt="img"
                                  />
                                  <Media body>
                                    <h5 className="mt-0 mb-1 font-size-15">
                                      {child.name}
                                    </h5>
                                    <p className="text-muted">
                                      {child.description}
                                    </p>
                                    <ul className="list-inline float-sm-right">
                                      <li className="list-inline-item">
                                        <Link to="#">
                                          <i className="far fa-thumbs-up mr-1"></i>{" "}
                                          Like
                                        </Link>
                                      </li>
                                      <li className="list-inline-item">
                                        <Link to="#">
                                          <i className="far fa-comment-dots mr-1"></i>{" "}
                                          Comment
                                        </Link>
                                      </li>
                                    </ul>
                                    <div className="text-muted font-size-12">
                                      <i className="far fa-calendar-alt text-primary mr-1"></i>{" "}
                                      {child.date}
                                    </div>
                                  </Media>
                                </Media>
                              ))
                            : null}
                        </Media>
                      </Media>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceProductDetail;
