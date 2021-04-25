import React, { Component } from "react";
import styles from "./Card2.module.css";
import imgDefault from "../../assets/img/default.jpg";
import { Col, Button } from "react-bootstrap";

class Cards2 extends Component {
  handleMovieDetail = (id) => {
    this.props.history.push(`/movie-detail/${id}`);
  };
  render() {
    const { movie_id, movie_name, movie_category } = this.props.data;
    return (
      <>
        <Col className={styles.imgCard}>
          <img src={imgDefault} alt="" />
          <p className={styles.movieName}>{movie_name}</p>
          <p className={styles.genre}>{movie_category} </p>
          <div className={styles.button}>
            <Button
              variant="light"
              className={styles.buttonDetail}
              onClick={() => this.handleMovieDetail(movie_id)}
            >
              Details
            </Button>
          </div>
        </Col>
      </>
    );
  }
}

export default Cards2;