import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './rating';

/** Renders a single row in the List Students table. */
const Student = ({ students }) => {
  const [rating, setRating] = useState(null);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <Col>
      <Card id="user-card" className="h-100">
        <Card.Header>
          <Image src={students.image} width={75} />
          <Card.Title>{students.name}</Card.Title>
          <Card.Subtitle>Year: {students.level} </Card.Subtitle>
          <Card.Subtitle>Grasshopper Class: <Badge bg="primary">{students.grasshopper}</Badge> </Card.Subtitle>
          <Card.Subtitle>Can Teach: <Badge bg="primary">{students.sensei}</Badge> </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>{students.description}</Card.Text>
          <Rating defaultValue={rating} id={students._id} onChange={handleRatingChange} />
          <p>Selected Rating: {rating}</p>
          <Link to={`/chat?studentId=${students._id}`}>
            <button type="submit">chat with student</button>
          </Link>
        </Card.Body>
        <Card.Footer className="d-grid fluid">
          <Link to={`/add-sesh/${students._id}`}><Button id="recruit" type="submit">Recruit!!!</Button></Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

// Require a document to be passed to this component.
Student.propTypes = {
  students: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.string,
    image: PropTypes.string,
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
    description: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Student;
