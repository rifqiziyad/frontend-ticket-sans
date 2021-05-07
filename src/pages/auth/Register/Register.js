import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import backgroundMarvel from "../../../assets/img/marvel.png";
import styles from "./Register.module.css";
import logoGoogle from "../../../assets/img/google-logo.png";
import logoFacebook from "../../../assets/img/facebook- logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userEmail: "",
        userPassword: "",
        userName: "",
      },
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleRegister = (event) => {
    event.preventDefault();
    this.props.register(this.state.form).then(() => {
      this.props.history.push("/login");
    });
  };

  render() {
    console.log(this.props);
    const { userEmail, userPassword, userName } = this.state;
    return (
      <>
        <Container fluid className={styles.container}>
          <Row className={styles.rowMain}>
            <Col md={7} className={styles.col1}>
              <img
                src={backgroundMarvel}
                alt="backgorund"
                className={styles.bgMarvel}
              />
            </Col>
            <Col md={5} className={styles.col2}>
              <Form onSubmit={this.handleRegister}>
                <p className={styles.text}>Fill your additional details</p>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className={styles.label}>Name</Form.Label>
                  <Form.Control
                    className={styles.input}
                    type="text"
                    placeholder="Write your email"
                    name="userName"
                    value={userName}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className={styles.label}>Email</Form.Label>
                  <Form.Control
                    className={styles.input}
                    type="email"
                    placeholder="Write your email"
                    name="userEmail"
                    value={userEmail}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className={styles.label}>Password</Form.Label>
                  <Form.Control
                    className={styles.input}
                    type="password"
                    placeholder="Write your password"
                    name="userPassword"
                    value={userPassword}
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
                <Button className={styles.submit} type="submit">
                  Join for free now
                </Button>
                {this.props.auth.isError && (
                  <Alert variant="danger">{this.props.auth.msg}</Alert>
                )}
                <p className={styles.forgot}>
                  Do you already have an account? <Link to="/login">Login</Link>
                </p>
                <p className={styles.or}>Or</p>
                <div className={styles.account}>
                  <div className={styles.google}>
                    <img src={logoGoogle} alt="" />
                    <p>Google</p>
                  </div>
                  <div className={styles.facebook}>
                    <img src={logoFacebook} alt="" />
                    <p>Facebook</p>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);