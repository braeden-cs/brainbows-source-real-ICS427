import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Trash } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { UrgentNotification } from '../../api/urgent-notif/UrgentNotif';
import { StudyNotification } from '../../api/studynotif/StudyNotif';

function removeNotif(id) {
  return UrgentNotification.collection.remove({ _id: id });
}

function removeStudyNotif(id) {
  return StudyNotification.collection.remove({ _id: id });
}

const MakeCard = ({ urgentNotif }) => (
  <Col className="p-3">
    <Card className="h-100">
      <Card.Header>
        <Card.Title>URGENT</Card.Title>
        <Card.Subtitle>A student is in the ICSpace and needs your help</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Student: {urgentNotif.from}
        </Card.Text>
        <Card.Text>
          Course: {urgentNotif.course}
        </Card.Text>
        <Card.Text>
          Topic: {urgentNotif.topic}
        </Card.Text>
        <Card.Text>
          Time: {urgentNotif.startTime} - {urgentNotif.endTime}
        </Card.Text>
        <Card.Footer className="d-grid fluid">
          <Button
            className="fluid"
            variant="outline-danger"
            size="lg"
            onClick={() => removeNotif(urgentNotif._id)}
          >
            <Trash />
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  urgentNotif: PropTypes.shape({
    from: PropTypes.string,
    course: PropTypes.string,
    topic: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

const StudyCard = ({ studyNotif }) => (
  <Col className="p-3">
    <Card id="study-notif" className="h-100">
      <Card.Header>
        <Card.Title>Study Sesh</Card.Title>
        <Card.Subtitle>A student needs your help</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Student: {studyNotif.from}
        </Card.Text>
        <Card.Text>
          Course: {studyNotif.course}
        </Card.Text>
        <Card.Text>
          Topic: {studyNotif.topic}
        </Card.Text>
        <Card.Text>
          Time: {studyNotif.startTime} - {studyNotif.endTime}
        </Card.Text>
        <Card.Footer className="d-grid fluid">
          <Button
            className="fluid"
            variant="outline-danger"
            size="lg"
            onClick={() => removeStudyNotif(studyNotif._id)}
          >
            <Trash />
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  </Col>
);

StudyCard.propTypes = {
  studyNotif: PropTypes.shape({
    from: PropTypes.string,
    course: PropTypes.string,
    topic: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

/* Renders a table containing all of the Notification documents. Use <NotificationItem> to render each row. */
const ListNotifications = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, urgentNotifs, studyNotifs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Notification documents.
    const subscription = Meteor.subscribe(UrgentNotification.userPublicationName);
    const sub2 = Meteor.subscribe(StudyNotification.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && sub2.ready();
    // Get the Notification documents
    const urgentNotifItems = UrgentNotification.collection.find({}).fetch();
    const studyNotifItems = StudyNotification.collection.find({}).fetch();
    return {
      urgentNotifs: urgentNotifItems,
      studyNotifs: studyNotifItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row xs={1} md={2} lg={4} className="justify-content-start">
        {urgentNotifs.map((urgentNotif, _id) => <MakeCard key={_id} urgentNotif={urgentNotif} />)}
      </Row>
      <Row xs={1} md={2} lg={4} className="justify-content-start">
        {studyNotifs.map((studyNotif, _id) => <StudyCard key={_id} studyNotif={studyNotif} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListNotifications;
