import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Students } from '../../api/student/Student';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = new SimpleSchema({
    name: String,
    email: String,
    password: String,
    level: {
      type: String,
      allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    },
    grasshopper: {
      type: Array,
    },
    'grasshopper.$': {
      type: String,
      allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
    },
    sensei: {
      type: Array,
    },
    'sensei.$': {
      type: String,
      allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
    },
  });

  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { name, email, level, grasshopper, sensei, password } = doc;
    if (!email.includes('@hawaii.edu')) {
      setError('sign up with your @hawaii.edu email account');
      return;
    }
    setIsSubmitting(true);
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
    Students.collection.insert(
      { name, owner: email, level, grasshopper, sensei },
      (err) => {
        if (err) {
          swal('Error', err.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
        }
      },
    );
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/home-page' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="name" placeholder="Enter your first and last name" />
                <TextField name="email" placeholder="Enter your .edu email" />
                <TextField name="password" placeholder="Password" type="password" />
                <SelectField name="level" showInlineError />
                <SelectField
                  name="grasshopper"
                  showInlineError
                  help="Select all classes you need help in"
                  multiple
                  checkboxes
                  inline
                />
                <SelectField
                  name="sensei"
                  showInlineError
                  help="Select all classes you need help in"
                  multiple
                  checkboxes
                  inline
                />
                <ErrorsField />
                <SubmitField disabled={isSubmitting} /> {/* Disable submit button when submitting */}
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
