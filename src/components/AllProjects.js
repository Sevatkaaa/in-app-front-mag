import React, {Component} from "react";
import {Button, Col, Nav, Navbar, Row} from "react-bootstrap";

import '../App.css';
import {browserHistory} from "react-router";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers, faUserTag, faBriefcase, faUserPlus, faCommentDollar} from "@fortawesome/free-solid-svg-icons";
import {getProjects} from "../api/getProjects";

export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: true,
            isDisableModalShown: false,
            isPaneOpen: true
        }
    }

    showDisableModal = () => {
        this.setState({isDisableModalShown: true})
    };

    hideDisableModal = () => {
        this.setState({isDisableModalShown: false})
    };

    sendInvitation(userEmail) {
        this.showNotification("success", `Invitation was re-sent to ${userEmail}`);
    };

    redirect(path) {
        browserHistory.push(path);
    };


    componentDidMount() {
        getProjects()
            .then((response) => {
                console.log(response.data);
                this.setState({items: response.data, isLoading: false})
                let status = localStorage.getItem("notificationStatus");
                let message = localStorage.getItem("notificationMessage");
                if (status && message) {
                    this.showNotification(status, message);
                }
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
    }

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
                <Col>
                <h2 className="text-center mt-20">Manage Projects</h2>
                <Navbar className="content-center" bg="none" variant="primary">
                    <Nav>
                        {sessionStorage.getItem("roles").includes("INVESTOR") ?
                            <Nav.Link  href="/projects">
                                <FontAwesomeIcon icon={faBriefcase}/> My Investments
                            </Nav.Link>
                            :
                            <Nav.Link  href="/projects">
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
                        <Nav.Link  className="nav-link-active">
                            <FontAwesomeIcon icon={faUsers}/> All Start-Ups
                        </Nav.Link>
                    </Nav>
                </Navbar>
                </Col>
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
                        {!sessionStorage.getItem("roles").includes('COMPANY') ? null :
                            <Row>
                                <Col sm={{span: 10, offset: 1}}>
                                    <Button onClick={function () {
                                        _this.redirect("/project")
                                    }}>
                                        <FontAwesomeIcon icon={faUserPlus}/> Add Project
                                    </Button>
                                </Col>
                                <br/>
                                <br/>
                            </Row>
                        }
                        <Col sm={{span: 10, offset: 1}}>
                            {this.state.items.map((project) => {
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
                            })}
                        </Col>
                    </div>
                }
                <NotificationContainer/>
            </div>
        );
    }
}
