import React from 'react';
import { Row, Col, Alert, Card, CardBody,Container } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

  const ForgetPasswordPage = (props) => {

  function handleValidSubmit(event, values) {
    props.userForgetPassword(values, props.history);
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
                          <p>Ingrese sus datos para entrar a Tu-Commerce.</p>
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

                      {props.forgetError && props.forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {props.forgetError}
                        </Alert>
                      ) : null}
                      {props.forgetSuccessMsg ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {props.forgetSuccessMsg}
                        </Alert>
                      ) : null}

                      <AvForm
                        className="form-horizontal mt-4"
                        onValidSubmit={(e,v) => handleValidSubmit(e,v)}
                      >

                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Correo"
                            className="form-control"
                            placeholder="Ingrese su correo"
                            type="email"
                            required
                          />
                        </div>
                        <Row className="form-group">
                          <Col className="text-right">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Restablecer
                              </button>
                          </Col>
                        </Row>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                  Volver a {" "}
                    <Link
                      to="login"
                      className="font-weight-medium text-primary"
                    >
                      Ingresar
                      </Link>{" "}
                  </p>
                  <p>© {new Date().getFullYear()} Tu-Ecommerce. Desarrollado <i className="mdi mdi-heart text-danger"></i> por Eserp</p>
                  </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
      );
    }

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  return { forgetError, forgetSuccessMsg };
};

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
);
