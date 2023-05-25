import React, {Component} from "react";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {browserHistory} from "react-router";
import {login} from "../api/login";
import {NotificationManager, NotificationContainer} from "react-notifications";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            id: null,
            errors: {}
        }
    }

    componentDidMount() {
        let status = localStorage.getItem("notificationStatus");
        let message = localStorage.getItem("notificationMessage");
        if (status && message) {
            this.showNotification(status, message);
        }
    }

    redirect(path) {
        browserHistory.push(path);
    };

    validateEmail(email) {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(String(email).toLowerCase());
    }

    async loginReq () {
        this.setState({isLoading: true});

        let username = this.user.username.value;
        let password = this.user.password.value;
        let errors = {};

        this.validateUser(errors, username, password);

        if (Object.entries(errors).length === 0) {
            this.login(username, password);
        } else {
            this.setState({isLoading: false, errors: errors});
        }
    }

    validateUser(errors, username, password) {
        if (!username) {
            errors["username"] = "This field is required"
        }
        if (!password) {
            errors["password"] = "This field is required"
        }
    }

    login(username, password) {
        this.setState({isLoading: true});
        login(username, password)
            .then((response) => {
                let data = response.data;
                if (response.status === 200) {
                    this.setState({isLoading: false});
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("roles", data.roles);
                    sessionStorage.setItem("username", data.username);
                    sessionStorage.setItem("id", data.id);
                    localStorage.setItem("notificationStatus", "success");
                    localStorage.setItem("notificationMessage", "Logged in as " + username);
                    this.redirect("/projects")
                } else {
                    console.log(123);
                    this.setState({isLoading: false});
                    this.showNotification("error", "Invalid credentials")
                }
            })
            .catch(error => {
                this.showNotification("error", "Invalid credentials")
                this.setState({isLoading: false});
                console.log("Error *** : " + error);
            });
    }

    render() {
        let _this = this;
        return (
            <div className="Login">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <Col sm={{span: 8, offset: 2}} className="page-header">
                    <h2>Login</h2>
                </Col>
                <Col sm={{span: 8, offset: 2}} className={"page"}>
                    <Form>
                        <Row>
                            <Col sm={{span: 4, offset: 1}}>
                                <FormGroup controlId="formGroupFirstName" data-testid="formGroupFirstName">
                                    Username
                                    <FormControl ref={ref => {this.user.username = ref}} type="text"/>
                                    <span id="firstName-error" style={{color: "red"}}>{this.state.errors["username"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{span: 4, offset: 1}}>
                                <FormGroup controlId="formGroupTelephone" data-testid="formGroupTelephone">
                                    Password
                                    <FormControl ref={ref => {this.user.password = ref}} type="password"/>
                                    <span id="telephone-error" style={{color: "red"}}>{this.state.errors["password"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-40">
                            <Col sm={{span: 4, offset: 2}}>
                                <Button className="btn-secondary cancel" onClick={function() {
                                    _this.redirect(`/`)
                                }}>Cancel</Button>
                            </Col>
                            <Col sm={{span: 4}}>
                                <Button className="save" size="large" onClick={function() {_this.loginReq()}}>Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <NotificationContainer/>
            </div>
        );
    }

    showNotification(status, message) {
        console.log(status);
        console.log(message);
        if (status === "success") {
            NotificationManager.success(message, "Success");
        } else if (status === "error") {
            NotificationManager.error(message, "Error");
        }
        localStorage.removeItem("notificationStatus");
        localStorage.removeItem("notificationMessage");
    };
}
