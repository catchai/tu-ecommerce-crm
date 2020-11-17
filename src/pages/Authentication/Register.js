import React, { useEffect } from 'react';
import { Row, Col, CardBody, Card, Alert,Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { registerUser,apiError,registerUserFailed } from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

const Register = (props) => {

    // handleValidSubmit
  function handleValidSubmit(event, values) {
    props.registerUser(values);
  }

   useEffect(() => {
        props.registerUserFailed("");
      });

    return (
         <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
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
                        <h5 className="text-primary">Regístrese Gratis</h5>
                        <p>Obtenga Ahora mismo Gratis su cuenta TU+Ecommerce !!!.</p>
                      </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={(e,v) => {handleValidSubmit(e,v)}}
                      >
                        {props.user && props.user ? (
                          <Alert color="success">
                            Ingreso de Registro Satisfactorio!!!
                          </Alert>
                        ) : null}
                        {props.registrationError &&
                          props.registrationError ? (
                            <Alert color="danger">
                              {props.registrationError}
                            </Alert>
                          ) : null}

                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Correo"
                            className="form-control"
                            placeholder="Ingrese su Correo"
                            type="email"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="username"
                            label="Nombre de Usuario"
                            type="text"
                            required
                            placeholder="Ingrese su nombre de usuario"
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Contraseña"
                            type="password"
                            required
                            placeholder="Ingrese su contraseña"
                          />
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Registrar
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            Para registrarse e ingresar a Tu+Ecommerce  {" "}
                            <Link to="#" className="text-primary">
                                Términos y Condiciones
                            </Link>
                          </p>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Ud. ya tiene una cuenta ?{" "}
                    <Link
                      to="/login"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Ingresar
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Tu-Ecommerce. Desarrollado{" "}
                    <i className="mdi mdi-heart text-danger"></i> por Eserp Agency
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
      );
    }

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStatetoProps, { registerUser,apiError,registerUserFailed })(Register);
