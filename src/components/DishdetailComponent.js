import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import Menu from "./MenuComponent";

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.renderDish = this.renderDish.bind(this);
    this.renderComments = this.renderComments.bind(this);
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg src={this.props.dish.image} alt={this.props.dish.name} />
        <CardBody>
          <CardTitle>{this.props.dish.name}</CardTitle>
          <CardText>{this.props.dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    if (comments != null) {
      const comms = this.props.dish.comments.map((comm) => {
        return (
          <div>
            <h1>Comments</h1>
            <ul key={comm.id} className="list-unstyled">
              <li className="comment">{comm.comment}</li>
              <li className="author">
                {comm.author},{comm.date}
              </li>
            </ul>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      </div>
    );
  }
}
export default DishDetail;
