import React, {Component} from "react";
import {Button, Col, Nav, Navbar, Row} from "react-bootstrap";

import '../App.css';
import {browserHistory} from "react-router";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUsers, faUserTag, faBriefcase, faCommentDollar, faThumbsUp, faThumbsDown
} from "@fortawesome/free-solid-svg-icons";
import {getInvestor} from "../api/getInvestor";

export default class Investor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.params.id,
            item: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getInvestor();
    }

    getInvestor() {
        getInvestor(this.state.id)
            .then((response) => {
                this.setState({item: response.data, isLoading: false})
                console.log(response.data);
                console.log(this.state.item);
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
    }

    redirect(path) {
        browserHistory.push(path);
    };

    showNotification(status, message) {
        if (status === "success") {
            NotificationManager.success(message, "Success");
        } else if (status === "error") {
            NotificationManager.error(message, "Error");
        }
        localStorage.removeItem("notificationStatus");
        localStorage.removeItem("notificationMessage");
    };

    render() {
        let _this = this;

        return (

            <div className="Users">

                <h2 className="text-center mt-20">Manage Projects</h2>
                <Navbar className="content-center" bg="none" variant="primary">
                    <Nav>
                        {sessionStorage.getItem("roles").includes("INVESTOR") ?
                            <Nav.Link href="/projects">
                                <FontAwesomeIcon icon={faBriefcase}/> My Investments
                            </Nav.Link>
                            :
                            <Nav.Link href="/projects">
                                <FontAwesomeIcon icon={faUserTag}/> My Projects
                            </Nav.Link>
                        }
                    </Nav>
                    {sessionStorage.getItem("roles").includes("INVESTOR") ?
                        <Nav>
                            <Nav.Link href="/interests">
                                <FontAwesomeIcon icon={faCommentDollar}/> My Interests
                            </Nav.Link>
                        </Nav>
                        :
                        null
                    }
                    <Nav>
                        <Nav.Link href="/all-projects">
                            <FontAwesomeIcon icon={faUsers}/> All Start-Ups
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Col className={"logout"}>
                    <Button className="btn-secondary cancel" onClick={function() {
                        sessionStorage.clear();
                        _this.redirect(`/`)}
                    }>Log out</Button>
                    <i className={"cancel cursor-pointer"} onClick={function () {
                        if (sessionStorage.getItem("roles").includes("INVESTOR")) {
                            _this.redirect('/investors/' + sessionStorage.getItem("id"))
                        }
                    }
                    }>Logged in as <b>{sessionStorage.getItem("username")}</b></i>
                </Col>
                <hr/>
                {this.state.isLoading ? <div className="application-loading"/>
                    :
                    <div>
                        <Col sm={{span: 10, offset: 1}}>
                                    <div className="user-preview-no-border" key={this.state.item.id}>
                                        <Row>
                                            <Col sm={{span: 5}}><img src={this.state.item.photoUrl}
                                                                     className="project-logo-full"
                                                                     alt="Logo"/></Col>
                                            <Col sm={{span: 7}}>
                                                <Row>
                                                    <Col sm={{span: 4}}>
                                                        <b>{this.state.item.user.username}</b>
                                                        <br/>
                                                        <br/>
                                                    </Col>
                                                    <Col sm={{span: 4}}>
                                                        {
                                                            sessionStorage.getItem("username") === this.state.item.user.username ?
                                                                <Row>
                                                                    <Button className="primary cancel" onClick={function() {
                                                                        _this.redirect(`/investors/${_this.state.id}/photo`)}
                                                                    }>Edit photo</Button>
                                                                </Row>
                                                                : null
                                                        }
                                                    </Col>
                                                    <Col sm={{span: 4}}>
                                                        {
                                                            sessionStorage.getItem("username") === this.state.item.user.username ?
                                                                <Row>
                                                                    <Button className="primary cancel" onClick={function() {
                                                                        _this.redirect(`/investors/${_this.state.id}/description`)}
                                                                    }>Edit description</Button>
                                                                </Row>
                                                                : null
                                                        }
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <br/>
                                                <Row>
                                                    {this.state.item.description}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                            <div className="user-preview-no-border" key="projects-inv">
                                <b>Investments</b>
                                {
                                    this.state.item.investments.map((project) => {
                                        return (
                                            <div className="user-preview" key={project.id}>
                                                <Col>
                                                    <Row>
                                                        <Col sm={{span: 2}}><img src={project.logoUrl} className="project-logo"
                                                                                 alt="Logo"/></Col>
                                                        <Col sm={{span: 2}}>
                                                            <Row><b>{project.name}</b></Row>
                                                            <br/>
                                                            <br/>
                                                            <Row>by {project.companyUsername}</Row>
                                                        </Col>
                                                        <Col sm={{span: 5}}>
                                                            {project.description}
                                                        </Col>
                                                        <Col sm={{span: 2}}>
                                                            <Row
                                                                className={"cancel"}><i>${project.funds} {project.status !== "INVESTED" ? "needed" : "invested"}</i></Row>
                                                            <br/>
                                                            <br/>
                                                            <br/>
                                                            <Row className={"cancel"}><Button className="btn-primary cancel"
                                                                                              onClick={function () {
                                                                                                  _this.redirect(`/projects/${project.id}`)
                                                                                              }}>View Details</Button></Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="user-preview-no-border" key="projects-inv">
                                <b>Interests</b>
                                {
                                    this.state.item.interests.map((project) => {
                                        return (
                                            <div className="user-preview" key={project.id}>
                                                <Col>
                                                    <Row>
                                                        <Col sm={{span: 2}}><img src={project.logoUrl} className="project-logo"
                                                                                 alt="Logo"/></Col>
                                                        <Col sm={{span: 2}}>
                                                            <Row><b>{project.name}</b></Row>
                                                            <br/>
                                                            <br/>
                                                            <Row>by {project.companyUsername}</Row>
                                                        </Col>
                                                        <Col sm={{span: 5}}>
                                                            {project.description}
                                                        </Col>
                                                        <Col sm={{span: 2}}>
                                                            <Row
                                                                className={"cancel"}><i>${project.funds} {project.status !== "INVESTED" ? "needed" : "invested"}</i></Row>
                                                            <br/>
                                                            <br/>
                                                            <br/>
                                                            <Row className={"cancel"}><Button className="btn-primary cancel"
                                                                                              onClick={function () {
                                                                                                  _this.redirect(`/projects/${project.id}`)
                                                                                              }}>View Details</Button></Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Col>
                    </div>
                }
                <NotificationContainer/>
            </div>
        );
    }
}
