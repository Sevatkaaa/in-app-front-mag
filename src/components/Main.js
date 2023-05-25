import React, {Component} from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {faUserPlus, faUsers, faUserTag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NotificationContainer} from "react-notifications";

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    redirect(path) {
        browserHistory.push(path);
    };

    render() {
        let _this = this;
        return (
            <div className="text-center">
                <h2 className="mt-20">Welcome to InApp</h2>
                <div className="text-secondary pb-100">
                    <br/>
                    You can add your projects<br/>
                    or invest into start-ups
                </div>
                <div className="main">
                    <Container className="text-center">
                        <Row>
                            <Col sm={{span: 4}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    _this.redirect(`/company/register`)
                                }}>
                                <Button>
                                    <FontAwesomeIcon icon={faUsers}/> Register Company
                                </Button>
                                <div className="text-secondary mt-20">
                                </div>
                                </div>
                            </Col>
                            <Col sm={{span: 4}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    _this.redirect(`/investor/register`)
                                }}>
                                <Button>
                                    <FontAwesomeIcon icon={faUserTag}/> Register Investor
                                </Button>
                                <div className="text-secondary mt-20">
                                </div>
                                </div>
                            </Col>
                            <Col sm={{span: 4}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    _this.redirect(`/login`)
                                }}>
                                <Button>
                                    <FontAwesomeIcon icon={faUserPlus}/> Log in
                                </Button>
                                <div className="text-secondary mt-20">
                                </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
