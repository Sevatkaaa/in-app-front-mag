import React, {Component} from "react";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {browserHistory} from "react-router";
import {createUser} from "../api/createUser";
import {NotificationContainer} from "react-notifications";

export default class RegisterCompany extends Component {

    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            errors: {}
        }
    }

    redirect(path) {
        browserHistory.push(path);
    };

    validateEmail(email) {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(String(email).toLowerCase());
    }

    async createUser () {
        this.setState({isLoading: true});

        // let firstName = this.user.firstName.value;
        // let middleName = this.user.middleName.value;
        // let lastName = this.user.lastName.value;
        let username = this.user.username.value;
        let password = this.user.password.value;
        let password2 = this.user.password2.value;
        let email = this.user.email.value;
        let errors = {};

        this.validateUser(errors, username, password, password2, email);

        if (Object.entries(errors).length === 0) {
            this.createUserRequest(username, password, email);
        } else {
            this.setState({isLoading: false, errors: errors});
        }
    }

    validateUser(errors, username, password, password2, email) {
        if (!username) {
            errors["username"] = "This field is required"
        }
        if (!password) {
            errors["password"] = "This field is required"
        } else if (password !== password2) {
            errors["password"] = "Passwords should match"
        }
        if (!email) {
            errors["email"] = "This field is required"
        }
    }

    createUserRequest(username, password, email) {
        this.setState({isLoading: true});
        createUser(username, password, email, 'COMPANY')
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("notificationStatus", "success");
                    localStorage.setItem("notificationMessage", "Created company " + username);
                    this.redirect("/login")
                }
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
    }

    render() {
        let _this = this;
        return (
            <div className="RegisterCompany">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <Col sm={{span: 8, offset: 2}} className="page-header">
                    <h2>Register Company</h2>
                </Col>
                <Col sm={{span: 8, offset: 2}} className={"page"}>
                    <Form>
                        <Row>
                            <Col sm={{span: 4, offset: 1}}>
                                <FormGroup controlId="formGroupFirstName">
                                    Company name
                                    <FormControl ref={ref => {this.user.username = ref}} type="text"/>
                                    <span id="firstName-error" style={{color: "red"}}>{this.state.errors["username"]}</span>
                                </FormGroup>
                            </Col>

                            <Col sm={{span: 4, offset: 2}}>
                                <FormGroup controlId="formGroupLastName">
                                    Email
                                    <FormControl ref={ref => {this.user.email = ref}}  type="email"/>
                                    <span id="lastName-error" style={{color: "red"}}>{this.state.errors["email"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{span: 4, offset: 1}}>
                                <FormGroup controlId="formGroupTelephone">
                                    Password
                                    <FormControl ref={ref => {this.user.password = ref}} type="password"/>
                                    <span id="telephone-error" style={{color: "red"}}>{this.state.errors["password"]}</span>
                                </FormGroup>
                            </Col>
                            <Col sm={{span: 4, offset: 2}}>
                                <FormGroup controlId="formGroupEmail">
                                    Repeat Password
                                    <FormControl ref={ref => {this.user.password2 = ref}} type="password"/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-40">
                            <Col sm={{span: 4, offset: 2}}>
                                <Button className="btn-secondary cancel" onClick={function() {_this.redirect(`/`)}}>Cancel</Button>
                            </Col>
                            <Col sm={{span: 4}}>
                                <Button className="save" size="large" onClick={function() {_this.createUser()}}>Register</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <NotificationContainer/>
            </div>
        );
    }
}
