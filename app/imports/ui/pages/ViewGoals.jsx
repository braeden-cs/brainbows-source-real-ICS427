import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Goals } from '../../api/goals/Goals';
import LoadingSpinner from '../components/LoadingSpinner';

const ViewGoals = () => {
  const { goals, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Goals.userPublicationName);
    const rdy = subscription.ready();
    const fetchedGoals = Goals.collection.find().fetch();
    return {
      goals: fetchedGoals,
      ready: rdy,
    };
  });

  return (ready ? (
    <Container className="fluid justify-content-center">
      <h2 id="page-titles">View Goals</h2>
      <Row>{goals.map((goal) => (
        <div key={goal._id}>
          <Card id="goal">
            <Col>
              <h3>Short Term Goal: {goal.shortTermGoal}</h3>
              <h3>Long Term Goal: {goal.longTermGoal}</h3>
            </Col>
            <Col>
              <Button id="removeGoal" variant="danger" onClick={() => Goals.collection.remove({ _id: goal._id })}>
                <Trash />
              </Button>
            </Col>
          </Card>
        </div>
      ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ViewGoals;
