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
import {getProject} from "../api/getProject";
import {invest} from "../api/invest";
import {like, unlike} from "../api/like";

export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.params.id,
            item: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getProject();
    }

    getProject() {
        getProject(this.state.id)
            .then((response) => {
                this.setState({item: response.data, isLoading: false})
                console.log(response.data);
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
    }

    redirect(path) {
        browserHistory.push(path);
    };

    invest() {
        invest(this.state.id)
            .then((response) => {
                this.setState({items: response.data, isLoading: false})
                localStorage.setItem("notificationStatus", "success");
                localStorage.setItem("notificationMessage", "You will be contacted soon");
                this.redirect("/projects")
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

    like(positive) {
        if ((positive && this.state.item.likeData.liked) || (!positive && this.state.item.likeData.disliked)) {
            unlike(this.state.id, positive)
                .then((response) => {
                    this.getProject();
                })
                .catch(error => {
                    console.log("Error *** : " + error);
                });
        } else {
            like(this.state.id, positive)
                .then((response) => {
                    this.getProject();
                })
                .catch(error => {
                    console.log("Error *** : " + error);
                });
        }
    }

    render() {
        let _this = this;
        let investment = sessionStorage.getItem("roles").includes("INVESTOR") && this.state.item.investments != null ? this.state.item.investments.find(i => i.investorId == sessionStorage.getItem("id")) : null
        console.log("investment");
        console.log(investment);
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
                                            <Col sm={{span: 5}}><img src={this.state.item.logoUrl}
                                                                     className="project-logo-full"
                                                                     alt="Logo"/></Col>
                                            <Col sm={{span: 7}}>
                                                <Row>
                                                    <Col sm={{span: 4}}>
                                                        <b>{this.state.item.name}</b>
                                                        <br/>
                                                        <br/>
                                                    </Col>
                                                    <Col className={"cancel"} sm={{span: 4, offset: 4}}>
                                                        <Row
                                                            className={"cancel"}><i>${this.state.item.funds} {this.state.item.status !== "INVESTED" ? "needed" : "invested"}</i></Row>
                                                        <br/>
                                                        <br/>
                                                        {
                                                            investment != null ?
                                                                <Row
                                                                    className={"cancel"}><i>You invested ${investment.money}</i>
                                                                    <br/>
                                                                    <br/>
                                                                </Row>
                                                                : null
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={{span: 4}}>
                                                        by {this.state.item.companyUsername}
                                                        <br/>
                                                        <br/>
                                                    </Col>
                                                    <Col sm={{span: 4, offset: 4}}>
                                                        {this.state.item.investorUsername == null ?
                                                            sessionStorage.getItem("roles").includes("INVESTOR") ?
                                                                !this.state.item.interests.map(p => p.investorName).includes(sessionStorage.getItem("username")) ?
                                                                <Row><Button
                                                                    className="btn-primary cancel invest-button"
                                                                    onClick={function () {
                                                                        _this.invest()
                                                                    }}>I am interested!</Button></Row> :
                                                                    <Row><Button
                                                                        className="btn-primary cancel invest-button"
                                                                        onClick={function () {
                                                                            _this.redirect("/chats/" + _this.state.item.interests.find(p => p.investorName === sessionStorage.getItem("username")).id)
                                                                        }}>Open chat</Button></Row>
                                                                : null
                                                            : <><Row className={"cancel cursor-pointer"} onClick={function(){_this.redirect("/investors/" + _this.state.item.investorId)}}> by {this.state.item.investorUsername}</Row>
                                                                {this.state.item.investorUsername === sessionStorage.getItem("username") ?
                                                                <Row className={"cancel"}><Button
                                                                    className="btn-primary cancel mt-40"
                                                                    onClick={function () {
                                                                        _this.redirect("/chats/" + _this.state.item.interests.find(p => p.investorName === sessionStorage.getItem("username")).id)
                                                                    }}>Open chat</Button></Row>
                                                                    : null }
                                                                    </>}
                                                        <br/>
                                                        <br/>
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
                            <div>
                                <FontAwesomeIcon className="like" icon={faThumbsUp} onClick={function (){_this.like(true)}}/> {this.state.item.likeData.likes} people liked this project
                            </div>
                            <div>
                                <FontAwesomeIcon className="dislike" icon={faThumbsDown} onClick={function (){_this.like(false)}}/> {this.state.item.likeData.dislikes} people don't think it is cool
                            </div>
                            <hr/>
                            <div className="user-preview-no-border" key={this.state.item.id + " user-preview"}>
                                <b>Investors interested in this project: {this.state.item.interests.length}</b>
                                {
                                    !sessionStorage.getItem("roles").includes("INVESTOR") ?
                                    this.state.item.interests.map((interest) => {
                                        return (
                                            <div className="user-preview" key={interest.id + "-interest"}>
                                                <Col>
                                                    <Row>
                                                        <Col sm={{span: 2}}><img src={interest.investorPhoto} className="project-logo"
                                                                                 alt="Logo"/></Col>
                                                        <Col sm={{span: 2}}>
                                                            <Row className={"cursor-pointer"} onClick={function() {_this.redirect('/investors/' + interest.investorId)}}><b>{interest.investorName}</b></Row>
                                                        </Col>
                                                        {
                                                            sessionStorage.getItem("roles").includes("COMPANY") && this.state.item.companyUsername === sessionStorage.getItem("username")
                                                        }
                                                            <Col><Button className="btn-primary cancel"
                                                                                              onClick={function () {
                                                                                                  _this.redirect(`/chats/${interest.id}`)
                                                                                              }}>Open Chat</Button>
                                                            </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        );
                                    }) : null
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
