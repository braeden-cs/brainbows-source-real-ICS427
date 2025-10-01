import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Students } from '../../api/student/Student';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
/**
 * Current privacy and reliability controls
 *
 * 1. Selected Options: Scehma enforces limited options for some fields, limiting the
 * amount of fields that can be injected with malicious inputs
 *
 */
/**
 * Missing privacy and reliability controls
 * 1. Input Validation: Not all inputs are limited in selection. Those that have free input
 * should be sanitized/validated to ensure that they aren't malicious inputs like XSS
 * 2. Password Complexity/Length: There should be rule enforced on how complex and long an
 * acceptable password should be when signing up
 **/
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Schema restricts options for some fields like level, grasshopper, and sensei
  const schema = new SimpleSchema({
    // santinize/validate name, email, password, image, and description
    name: String,
    email: String,
    // Password should have a required complexity and length
    password: String,
    image: String,
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
    description: String,
  });

  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  /**
   * Current privacy and reliability controls
   *
   * 1. Limited Domain: users must be uh students/sign up with uh email restricting external
   * users from using the application
   * 2. Disabled Submit: Once the form is submitted, the submit button is disabled preventing
   * any further copies from being submitted into the database.
   */
  /**
   * Missing privacy and reliability controls
   * 1. Obfuscate error message: Purposefully make the error message of when there is an error
   * with the login credentials vague so that attackers can't gain further information on user
   * accounts
   * 2. Rollback Insert: There are currently two sequential inserts. If one insert fails,
   * there could be data inconsistencies. If insert fails, rollback insert
   *
   **/
  const submit = (doc) => {
    const { name, email, image, level, grasshopper, sensei, password, description } = doc;
    // restricts possible sign up emails to only uh students
    if (!email.includes('@hawaii.edu')) {
      setError('sign up with your @hawaii.edu email account');
      return;
    }
    setIsSubmitting(true);
    // err message should be vague to not release too much info about users
    // If one insert fails, then there should be a rollback to avoid data inconsistencies
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
    // err message should be vague to not release too much info about users
    // If one insert fails, then there should be a rollback to avoid data inconsistencies
    Students.collection.insert(
      { name, owner: email, image, level, grasshopper, sensei, description },
      (err) => {
        if (err) {
          swal('Error', err.message, 'error');
        } else {
          swal('Success', 'Student added successfully', 'success');
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
                <TextField name="image" placeholder="Enter file of your head shot" />
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
                <LongTextField name="description" placeholder="Enter a description about you" />
                <ErrorsField />
                <SubmitField disabled={isSubmitting} /> {/* Disable submit button when submitting. That way multiple copies aren't inserted into the database */}
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
