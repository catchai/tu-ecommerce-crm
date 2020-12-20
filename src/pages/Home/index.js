import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, CardSubtitle, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Media, Table } from "reactstrap";
import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
import Calendar from '../Calendar';

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

 const Home = (props) => {

     const [modal, setmodal] = useState(false);

          const reports = [
                { title: "VENTAS", iconClass: "bx-money", description: "1,235" },
                { title: "BODEGAS", iconClass: "bx-store", description: "$35, 723" },
                { title: "DELIVERY", iconClass: "bx-moto", description: "$16.2" }
            ];
         const email = [
                { title: "Week", linkto: "#", isActive: false },
                { title: "Month", linkto: "#", isActive: false },
                { title: "Year", linkto: "#", isActive: true }
            ];

          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>



                        <Row>
                                <Col xl={4} md={4}>
                                <Link to="/resumen">
                                    <div className="card">
                                        <div className="card-body bg-success text-center rounded">
                                            <div className="color-box bg-success p-4 rounded">
                                                <h5 style={{ fontSize: 20 }} className="my-3 text-white">V E N T A S</h5>
                                            </div>

                                        </div>
                                    </div>
                                    </Link>
                                </Col>
                                  <Col xl={4} md={4}>
                                      <div className="card">
                                          <div className="card-body bg-warning text-center rounded">
                                              <div className="color-box bg-warning p-4 rounded">
                                                  <h5 style={{ fontSize: 20 }} className="my-3  text-white">B O D E G A</h5>
                                              </div>
                                          </div>
                                      </div>
                                  </Col>
                                  <Col xl={4} md={4}>
                                      <div className="card">
                                          <div className="card-body bg-danger text-center rounded">
                                              <div className="color-box bg-danger p-4 rounded">
                                                  <h5  style={{ fontSize: 20 }} className="my-3 text-white"> D E L I V E R Y</h5>
                                              </div>

                                          </div>
                                      </div>
                                  </Col>
                        </Row>
                        {/* Render Breadcrumb */}
                        <Breadcrumbs title="Home" breadcrumbItem="Módulos" />
                        <Row>

                            <Col xl={12}>

                              <Calendar />
                            </Col>

                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
        }

export default withNamespaces()(Home);
