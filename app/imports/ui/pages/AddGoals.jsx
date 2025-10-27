import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Goals } from '../../api/goals/Goals';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  shortTermGoal: String,
  longTermGoal: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddGoal page for adding a document. */
const AddGoal = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { shortTermGoal, longTermGoal } = data;
    const owner = Meteor.user().username;
    Goals.collection.insert(
      { shortTermGoal, longTermGoal, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2 id="page-titles">Add Goal</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <LongTextField id="shortGoal" name="shortTermGoal" />
                <LongTextField id="longGoal" name="longTermGoal" />
                <SubmitField id="submitGoal" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddGoal;
