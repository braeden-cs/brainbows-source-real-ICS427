import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Students } from '../../api/student/Student';
import LoadingSpinner from '../components/LoadingSpinner';
import { StudyNotification } from '../../api/studynotif/StudyNotif';
import { StudySesh } from '../../api/studysesh/StudySesh';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  course: {
    type: String,
    allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
  },
  topic: String,
  startTime: {
    type: String,
    allowedValues: ['7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm'],
  },
  endTime: {
    type: String,
    allowedValues: ['7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStudySesh page for adding a document. */
const AddStudySesh = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditProfile', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Students.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    return {
      ready: rdy,
    };
  }, [_id]);
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { course, topic, startTime, endTime } = data;
    const owner = Meteor.user().username;
    const sensei = Students.collection.findOne(_id);
    const theSensei = sensei ? sensei.owner : null;
    StudyNotification.collection.insert(
      { from: owner, to: theSensei, owner: theSensei, course, topic, startTime, endTime },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Study Sesh created successfully, Sensei has been notified', 'success');
          formRef.reset();
        }
      },
    );
    StudySesh.collection.insert(
      { sensei: theSensei, grasshopper: owner, owner: theSensei, course, topic, startTime, endTime },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Study Sesh created successfully, Sensei has been notified', 'success');
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return ready ? (
    <Container id="recruit" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Study Sesh</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField id="course" name="course" />
                <LongTextField id="topic" name="topic" />
                <SelectField id="start-time" name="startTime" />
                <SelectField id="end-time" name="endTime" />
                <SubmitField id="submit-recruit" value="Submit" />
                <ErrorsField id="sesh-error" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AddStudySesh;
