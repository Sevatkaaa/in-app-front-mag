import React, {Component} from "react";
import {Button, Col, FormControl, FormGroup, Nav, Navbar, Row} from "react-bootstrap";

import '../App.css';
import {browserHistory} from "react-router";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUsers, faUserTag, faBriefcase, faCommentDollar, faBan, faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import {getMessages} from "../api/getMessages";
import {sendMessage} from "../api/sendMessage";
import {confirm} from "../api/confirm";
import Modal from "react-bootstrap/Modal";
import {investMoney} from "../api/invest";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.params.id,
            item: {},
            isLoading: true,
            showModal: false
        }
    }

    componentDidMount() {
        this.getMessages();
    }

    getMessages() {
        getMessages(this.state.id)
            .then((response) => {
                this.setState({item: response.data, isLoading: false});
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
    }

    redirect(path) {
        browserHistory.push(path);
    };

    showModal = () => {
        this.setState({showModal: true})
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    confirm() {
        confirm(this.state.id)
            .then((response) => {
                console.log(123);
                if (response.status === 200) {
                    localStorage.setItem("notificationStatus", "success");
                    localStorage.setItem("notificationMessage", "You confirmed investor");
                }
                this.setState({showModal: false});
                this.getMessages();
            })
            .catch(error => {
                this.setState({isLoading: false});
                this.showNotification("error", "Invalid file")
                console.log("Error *** : " + error);
            });
    }

    invest() {
        investMoney(this.state.item.projectData.id, this.funds.value)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("notificationStatus", "success");
                    localStorage.setItem("notificationMessage", "You invested into the project");
                }
                this.funds.value = 0;
                this.redirect("/projects");
            })
            .catch(error => {
                this.setState({isLoading: false});
                this.showNotification("error", "Invalid file")
                console.log("Error *** : " + error);
            });
    }

    sendMessage() {
        if (!this.message.value) {
            return;
        }
        sendMessage(this.state.id, this.message.value)
            .then((response) => {
                this.setState({items: response.data, isLoading: false})
                this.message.value = null;
                this.getMessages();
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
    }

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
                    <i className={"cancel"}>Logged in as <b>{sessionStorage.getItem("username")}</b></i>
                </Col>
                <hr/>
                {this.state.isLoading ? <div className="application-loading"/>
                    :
                    <div>
                        <Col sm={{span: 8, offset: 2}}>
                                    <div className="chatbox-holder">
                                        {this.state.item.messages.map((message) => {
                                            let right = sessionStorage.getItem("roles").includes("INVESTOR") && message.fromId === this.state.item.investorData.id ||
                                                sessionStorage.getItem("roles").includes("COMPANY") && message.fromId !== this.state.item.investorData.id ;
                                            return (
                                                <div className={right ? "msg-preview text-right" : "msg-preview"} key={message.id}>
                                                    {message.text}
                                                </div>
                                            );
                                        })}
                                        <Row>
                                        <Col sm={{span: 10}}>
                                        <FormGroup className={"message-input"} controlId="formGroupMessage">
                                                <FormControl ref={ref => {this.message = ref}} type="text"/>
                                        </FormGroup>
                                        </Col>
                                        <Col sm={{span: 2}}>
                                            <Button
                                                className="btn-primary button-send cancel"
                                                onClick={function () {
                                                    _this.sendMessage()
                                                }}>Send</Button>
                                        </Col>
                                        </Row>
                                    </div>
                        </Col>
                        {
                            sessionStorage.getItem("roles").includes("INVESTOR") && _this.state.item.confirmed ?
                                <Col>
                                    <Row className={"interest-confirmation"}>
                                        <FontAwesomeIcon className={"interest-confirmation-true"} icon={faCheckCircle}/>
                                        <b>Your interest is confirmed</b>
                                    </Row>
                                    <Row className={"interest-confirmation"}>
                                        <Button className={"btn-success confirm-button"} onClick={function () {_this.setState({showModal:true})}}>Invest</Button>
                                    </Row>
                                </Col>
                                :
                                sessionStorage.getItem("roles").includes("INVESTOR") ?
                                    <Row className={"interest-confirmation"}>
                                        <FontAwesomeIcon className={"interest-confirmation-false"} icon={faBan}/> <b>Your
                                        interest is not confirmed yet</b>
                                    </Row>
                                    :
                                    sessionStorage.getItem("roles").includes("COMPANY") ?
                                        _this.state.item.confirmed ?
                                            <Row className={"interest-confirmation"}>
                                                <FontAwesomeIcon className={"interest-confirmation-true"} icon={faCheckCircle}/>
                                                <b>You confirmed investor</b>
                                            </Row>
                                            :
                                            <Col>
                                            <Row className={"interest-confirmation"}>
                                                <FontAwesomeIcon className={"interest-confirmation-false"} icon={faBan}/>
                                                <b>You have not confirmed investor yet</b>
                                            </Row>
                                                <Row className={"interest-confirmation"}>
                                                <Button className={"btn-success confirm-button"} onClick={function(){_this.confirm()}}>Confirm</Button>
                                                <Button className={"btn-danger confirm-button"}>Refuse</Button>
                                                </Row>
                                            </Col>
                                        : null
                        }
                    </div>
                }
                <Modal show={this.state.showModal} onHide={this.hideModal}>
                    <Modal.Body>
                        How much do you want to invest?
                        <br/>
                        <br/>
                        <FormGroup controlId="formGroupLastName">
                            <FormControl ref={ref => {this.funds = ref}} type="number"/>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={function (){_this.invest()}}>
                            Invest
                        </Button>
                    </Modal.Footer>
                </Modal>
                <NotificationContainer/>
            </div>
        );
    }
}
