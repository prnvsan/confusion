import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const invalid = (val) => val && val.length;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    console.log("Current state is" + JSON.stringify(values));
    alert("Current state is" + JSON.stringify(values));
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  render() {
    return (
      <div className="container">
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment{" "}
        </Button>
        <div className="row row-content">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>
              Submit Comment
              <hr />
              <ModalBody>
                <div className="col-12 col-md-9">
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                      <Label htmlFor="rating">Rating</Label>

                      <Control.select
                        model=".rating"
                        name="rating"
                        className="form-control"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="yourname">Your name</Label>

                      <Control.text
                        model=".yourname"
                        id="yourname"
                        name="yourname"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                          invalid,
                          minLength: minLength(3),
                          maxLength: maxLength(15),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".yourname"
                        show="touched"
                        messages={{
                          invalid: "Invalid",
                          minLength: "Must be greater than 2 characters",
                          maxLength: "Must be 15 characters or less",
                        }}
                      />
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="comment">Comment</Label>

                      <Control.textarea
                        model=".message"
                        id="message"
                        name="message"
                        rows="6"
                        className="form-control"
                      ></Control.textarea>
                    </Row>
                    <Row className="form-group">
                      <Col>
                        <Button type="submit" value="submit" color="primary">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </div>
              </ModalBody>
            </ModalHeader>
          </Modal>
        </div>
      </div>
    );
  }
}

function RenderComments({ comments }) {
  if (comments === null) {
    return <div></div>;
  }
  const comms = comments.map((comm) => {
    return (
      <li key={comm.id}>
        <p>{comm.comment}</p>
        <p>
          -- {comm.author}, &nbsp;
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(comm.date))}
        </p>
      </li>
    );
  });
  return (
    <div className="col-12 col-md-5 m-1">
      <h4> Comments </h4>
      <ul className="list-unstyled">{comms}</ul>
      <CommentForm />
    </div>
  );
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const Dishdetail = (props) => {
  if (props.dish == null) {
    return <div></div>;
  }
  const dishItem = <RenderDish dish={props.dish} />;
  const commentItem = <RenderComments comments={props.comments} />;
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
        {dishItem}
        {commentItem}
      </div>
    </div>
  );
};

export default Dishdetail;
