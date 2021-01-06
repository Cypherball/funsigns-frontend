import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import '../../../scss/studentDash.scss'
import { connect } from 'react-redux'
import {
  createAssignment,
  getAssignment,
  getAssignments,
} from '../../../actions'

import { Tab, Row, Col, Nav } from 'react-bootstrap'
import Badge from '../../Badge'
import AssignmentCard from '../../AssignmentCard'

class StudentDash extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getAssignments()
  }

  renderAssignment = () =>
    this.props.assignments.map((assig) => {
      return <p>{assig.id}</p>
    })

  render() {
    return (
      <Container>
        <section id="studentDash">
          <h1>Student Dashboard</h1>
          <div className="dash-greeting">Welcome <b>{'username'}</b>.</div>
          <div className="dash-section">
            <div className="dash-subtitle">Assignments</div>
            <div className="dash-assignments-container">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Machine Learning</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Blockchain</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="assignment-card-container">
                          <AssignmentCard name="Assign 1" />
                          <AssignmentCard name="Assign 2" />
                          <AssignmentCard name="Assign 3" />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="assignment-card-container">
                          <AssignmentCard name="Assign 1" />
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>

            <div className="dash-subtitle">Badges</div>
            <div className="dash-badge-container">
              <Badge name="Badge 1" description="This is a nice description" icon="https://pawankolhe.com/img/pawankolhe.jpg" />
              <Badge name="Badge 1" description="This is a description" icon="https://pawankolhe.com/img/pawankolhe.jpg" />
              <Badge name="Badge 1" description="This is a awesome description" icon="https://pawankolhe.com/img/pawankolhe.jpg" />
            </div>
          </div>
        </section>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Object.values(state.assignments))
  return { assignments: Object.values(state.assignments) }
}

export default connect(mapStateToProps, { getAssignments })(StudentDash)
