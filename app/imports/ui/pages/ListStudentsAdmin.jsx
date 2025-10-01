import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Students } from '../../api/student/Student';
import StudentsAdmin from '../components/StudentsAdmin';

/* Renders a table containing all of the Admin documents. Use <AdminItem> to render each row. */

/**
 * Current privacy and reliability controls
 *
 * 1. The data is only rendered on the page when the data is ready
 *
 */
const ListStudentsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Admin documents.
    const subscription = Meteor.subscribe(Students.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Student documents
    const studentItems = Students.collection.find({}).fetch();
    return {
      students: studentItems,
      ready: rdy,
    };
  }, []);
  // Determines if the data is ready. If it is ready, then the data is rendered on the page
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2 id="page-titles">List Students</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {students.map((student) => (<Col key={student._id}><StudentsAdmin studentsAdmin={student} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStudentsAdmin;
