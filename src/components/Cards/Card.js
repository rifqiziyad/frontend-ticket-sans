import React, { Component } from "react";
import styles from "./Card.module.css";
import imgDefault from "../../assets/img/default.jpg";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Button, Col } from "react-bootstrap";

class Cards extends Component {
  handleMovieDetail = (id) => {
    this.props.history.push(`/movie-detail/${id}`);
  };

  render() {
    const { movie_id, movie_name, movie_category, movie_image } =
      this.props.data;

    return (
      <>
        <Col className={styles.imgCard}>
          {movie_image.length > 0 ? (
            <img
              src={
                "https://ticket-sans.herokuapp.com/backend1/api/" + movie_image
              }
              alt=""
            />
          ) : (
            <img src={imgDefault} alt="" />
          )}
          <p className={styles.movieName}>{movie_name}</p>
          <p className={styles.genre}>{movie_category}</p>
          <div className={styles.button}>
            <Button
              className={styles.buttonBookNow}
              onClick={() => this.handleMovieDetail(movie_id)}
            >
              Book Now
            </Button>
          </div>
        </Col>
      </>
    );
  }
}

export default withRouter(Cards);
