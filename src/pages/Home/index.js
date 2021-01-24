import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//import Charts
import Calendar from '../Calendar';
//i18n
import { withNamespaces } from 'react-i18next';
import * as firebase from "firebase";


//
// var DefaultEvents = [{
//     title: '45 Ingresos Productos',
//     date: '2021-01-01'
// }
// ,
// {
//     id: 2,
//     title: '10 Delivery',
//     start: new Date(),
//     end: new Date(),
//     className: 'bg-danger text-white'
// },
// {
//     id: 3,
//     title: '45 Notificaciones',
//     start: new Date().setDate(new Date().getDate() + 8),
//     className: 'bg-info text-white'
// },
// {
//     id: 4,
//     title: '15 Ventas',
//     start: new Date().setDate(new Date().getDate() + 7),
//     className: 'bg-success text-white'
// }
// ];




var DefaultEvents = [];
class Home extends Component {

  constructor(props) {
     super(props);
     this.state = { data : ""};

   }
   componentDidMount() {

    }


   render() {
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
                                          <div className="card-body bg-secondary text-center rounded">
                                              <div className="color-box bg-secondary p-4 rounded">
                                                  <h5 style={{ fontSize: 20 }} className="my-3  text-white">B O D E G A</h5>
                                              </div>
                                          </div>
                                      </div>
                                  </Col>
                                  <Col xl={4} md={4}>
                                      <div className="card">
                                          <div className="card-body bg-secondary text-center rounded">
                                              <div className="color-box bg-secondary p-4 rounded">
                                                  <h5  style={{ fontSize: 20 }} className="my-3 text-white"> D E L I V E R Y</h5>
                                              </div>

                                          </div>
                                      </div>
                                  </Col>
                        </Row>
                        {/* Render Breadcrumb */}
                        {/*<Breadcrumbs title="Home" breadcrumbItem="Módulos" /> */}
                        <Row>

                            <Col xl={12}>

                              <Calendar eventos={this.state.data}/>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
        }
      }

export default  Home;
