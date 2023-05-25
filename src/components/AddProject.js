import React, {Component} from "react";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {browserHistory} from "react-router";
import {createProject} from "../api/createProject";
import {NotificationContainer} from "react-notifications";

export default class AddProject extends Component {

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

    async createUser () {
        this.setState({isLoading: true});

        let name = this.user.name.value;
        let funds = this.user.funds.value;
        let description = this.user.description.value;
        let sphere = this.user.sphere.value;
        let errors = {};

        this.validateProject(errors, name, funds, description, sphere);

        if (Object.entries(errors).length === 0) {
            this.createProjectRequest(name, funds, description, sphere);
        } else {
            this.setState({isLoading: false, errors: errors});
        }
    }

    validateProject(errors, name, funds, description, sphere) {
        if (!name) {
            errors["name"] = "This field is required"
        }
        if (!funds) {
            errors["funds"] = "This field is required"
        }
        if (!description) {
            errors["description"] = "This field is required"
        }
        if (!sphere) {
            errors["sphere"] = "This field is required"
        }
    }

    createProjectRequest(name, funds, description, sphere) {
        this.setState({isLoading: true});
        createProject(name, funds, description, sphere)
            .then((response) => {
                if (response.status === 200) {
                    this.redirect("/projects/" + response.data.id + "/logo");
                }
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
    }

    render() {
        let _this = this;
        return (
            <div className="Project">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <Col sm={{span: 8, offset: 2}} className="page-header">
                    <h2>Create Project</h2>
                </Col>
                <Col sm={{span: 8, offset: 2}} className={"page"}>
                    <Form>
                        <Row>
                            <Col sm={{span: 4, offset: 1}}>
                                <FormGroup controlId="formGroupFirstName">
                                    Name
                                    <FormControl ref={ref => {this.user.name = ref}} type="text"/>
                                    <span id="firstName-error" style={{color: "red"}}>{this.state.errors["name"]}</span>
                                </FormGroup>
                            </Col>

                            <Col sm={{span: 4, offset: 2}}>
                                <FormGroup controlId="formGroupLastName">
                                    Funds
                                    <FormControl ref={ref => {this.user.funds = ref}}  type="text"/>
                                    <span id="funds-error" style={{color: "red"}}>{this.state.errors["funds"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{span: 4, offset: 1}}>
                                <FormGroup controlId="formGroupTelephone">
                                    Description
                                    <FormControl ref={ref => {this.user.description = ref}} type="text"/>
                                    <span id="description-error" style={{color: "red"}}>{this.state.errors["description"]}</span>
                                </FormGroup>
                            </Col>
                            <Col sm={{span: 4, offset: 2}}>
                                <FormGroup controlId="formGroupEmail">
                                    Sphere
                                    <FormControl ref={ref => {this.user.sphere = ref}} type="text"/>
                                    <span id="sphere-error" style={{color: "red"}}>{this.state.errors["sphere"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-40">
                            <Col sm={{span: 4, offset: 2}}>
                                <Button className="btn-secondary cancel" onClick={function() {_this.redirect(document.referrer ? document.referrer : `/`)}}>Cancel</Button>
                            </Col>
                            <Col sm={{span: 4}}>
                                <Button className="save" size="large" onClick={function() {_this.createUser()}}>Create</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <NotificationContainer/>
            </div>
        );
    }
}
