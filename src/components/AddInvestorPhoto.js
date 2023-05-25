import React, {Component} from "react";
import {Button, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {browserHistory} from "react-router";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {addInvestorPhoto, addProjectLogo} from "../api/addProjectLogo";

export default class AddProjectLogo extends Component {

    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            id: props.params.id
        }
    }

    changeHandler(event) {
        this.user.logo = event.target.files[0];
        console.log(this.user.logo);
    };

    redirect(path) {
        browserHistory.push(path);
    };

    async createLogo () {
        this.setState({isLoading: true});
        addInvestorPhoto(this.user.logo, this.state.id)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("notificationStatus", "success");
                    localStorage.setItem("notificationMessage", "Photo updated");
                    this.redirect("/investors/" + sessionStorage.getItem("id"))
                }
            })
            .catch(error => {
                this.setState({isLoading: false});
                this.showNotification("error", "Invalid file")
                console.log("Error *** : " + error);
            });
    }

    render() {
        let _this = this;
        return (
            <div className="ProjectLogo">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <Col sm={{span: 8, offset: 2}} className="page-header">
                    <h2>Add photo</h2>
                </Col>
                <Col sm={{span: 8, offset: 2}} className={"page"}>
                    <Form>
                        <Row>
                            <Col sm={{span: 4, offset: 1}}>
                                <FormGroup controlId="formGroupFirstName">
                                    Upload photo
                                    <br/>
                                    <input type="file" name="file" onChange={function (event){_this.changeHandler(event)}} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        </Row>

                        <Row className="mt-40">
                            <Col sm={{span: 4, offset: 2}}>
                                <Button className="btn-secondary cancel" onClick={function() {_this.redirect(`/projects`)}}>Cancel</Button>
                            </Col>
                            <Col sm={{span: 4}}>
                                <Button className="save" size="large" onClick={function() {_this.createLogo()}}>Set logo</Button>
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
