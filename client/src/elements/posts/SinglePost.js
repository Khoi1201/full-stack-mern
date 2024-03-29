import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Card
      className="shadow"
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                className={
                  status === "LEARNED"
                    ? "bg-success"
                    : status === "LEARNING"
                    ? "bg-warning"
                    : "bg-danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id}></ActionButtons>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
