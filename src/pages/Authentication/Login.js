import React from 'react';

import { Row, Col, CardBody, Card, Alert,Container } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { loginUser,apiError } from '../../store/actions';

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

 const Login = (props) => {

    // handleValidSubmit
  function  handleValidSubmit(event, values) {
        props.loginUser(values, props.history);
    }
          return (
             <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark"><i className="fas fa-home h2"></i></Link>
                </div>
                <div className="account-pages my-5 pt-sm-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="overflow-hidden">
                                    <div className="bg-soft-primary">
                                        <Row>
                                            <Col className="col-7">
                                              <div className="text-primary p-4">
                                                  <h5 className="text-primary">Bienvenido!</h5>
                                                  <p>Ingrese sus Datos para continuar con TU-ECOMMERCE!</p>
                                              </div>
                                            </Col>
                                            <Col className="col-5 align-self-end">
                                                <img src={profile} alt="" className="img-fluid" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <CardBody className="pt-0">
                                        <div>
                                            <Link to="/">
                                                <div className="avatar-md profile-user-wid mb-4">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        <img src={logo} alt="" className="rounded-circle" height="34" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="p-2">

                                            <AvForm className="form-horizontal" onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>

                                                {props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}

                                                <div className="form-group">
                                                    <AvField name="email" label="Correo" value="admin@tu-ecommerce.cl" className="form-control" placeholder="Ingrese Correo" type="email" required />
                                                </div>

                                                <div className="form-group">
                                                    <AvField name="password" label="Contraseña" value="123456" type="password" required placeholder="Ingrese Contraseña" />
                                                </div>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" htmlFor="customControlInline">Recordar Datos</label>
                                                </div>

                                                <div className="mt-3">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Ingresar</button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i>  Olvido su Contraseña?</Link>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                                {
                                  /**
                                 <div className="mt-5 text-center">
                                     <p>No tienes cuenta ? <Link to="register" className="font-weight-medium text-primary"> Registrate Ahora</Link> </p>
                                     <p>© new Date().getFullYear() Tu-Ecommerce. Desarrollado <i className="mdi mdi-heart text-danger"></i> por Eserp</p>
                                 </div>
                                 **/
                               }
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
        }

const mapStatetoProps = state => {
    const { error } = state.Login;
    return { error };
}

export default withRouter(connect(mapStatetoProps, { loginUser,apiError })(Login));
