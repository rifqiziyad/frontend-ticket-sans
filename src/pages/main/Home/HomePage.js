import React, { Component } from "react";
import Navbar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import styles from "./home.module.css";
import img1 from "../../../assets/img/image-1.png";
import img2 from "../../../assets/img/image-2.png";
import img3 from "../../../assets/img/image-3.png";
import Cards from "../../../components/Cards/Card";
import Cards2 from "../../../components/Cards2/Card2";
// import axiosApiIntances from "../../../utils/axios";
import { connect } from "react-redux";
import { getAllMovie } from "../../../redux/actions/movie";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        movieName: "",
        movieCategory: "",
        movieReleaseDate: "",
      },
      data: [],
      movieMonth: [],
      pagination: {},
      page: 1,
      limit: 100,
      isLoading: false,
      isUpdate: false,
      id: "",
      month: [
        {
          nameMonth: "January",
          numMonth: "01",
        },
        {
          nameMonth: "February",
          numMonth: "02",
        },
        {
          nameMonth: "March",
          numMonth: "03",
        },
        {
          nameMonth: "April",
          numMonth: "04",
        },
        {
          nameMonth: "May",
          numMonth: "05",
        },
        {
          nameMonth: "Juny",
          numMonth: "06",
        },
        {
          nameMonth: "July",
          numMonth: "07",
        },
        {
          nameMonth: "August",
          numMonth: "08",
        },
        {
          nameMonth: "Sepetember",
          numMonth: "09",
        },
        {
          nameMonth: "October",
          numMonth: "10",
        },
        {
          nameMonth: "November",
          numMonth: "11",
        },
        {
          nameMonth: "Desember",
          numMonth: "12",
        },
      ],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { page, limit } = this.state;
    this.props.getAllMovie(page, limit);
    //   this.setState({ isLoading: true });
    //   axiosApiIntances
    //     .get(`movie?page=${page}&limit=${limit}&search=&sort=movie_id ASC`)
    //     .then((res) => {
    //       this.setState({ data: res.data.data, pagination: res.data.pagination });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       setTimeout(() => {
    //         this.setState({ isLoading: false });
    //       }, 500);
    //     });
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getData();
    });
  };

  handleMonth = (num) => {
    const { dataMovie } = this.props.movie;
    const newData = dataMovie.filter(
      (e) => e.movie_release_date.split("-")[1] === num
    );
    this.setState({ movieMonth: newData });
  };

  handleViewAll = () => {
    console.log("View All");
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Navbar {...this.props} />
        <Container fluid className={styles.container}>
          <Row className={styles.row1}>
            <Col sm={6} className={styles.col1}>
              <p> Nearest Cinema, Newest Movie,</p>
              <p className={styles.textCol1}>Find out now!</p>
            </Col>
            <Col sm={6} className={styles.col2}>
              <img className={styles.img1} src={img1} alt="img-1" />
              <img className={styles.img2} src={img2} alt="img-2" />
              <img className={styles.img3} src={img3} alt="img-3" />
            </Col>
          </Row>
          <div className={styles.content1}>
            <div className={styles.showing}>
              <div className={styles.nowShowing}>
                <h1>Now Showing</h1>
                <div className={styles.borderBottom}></div>
              </div>
              <p onClick={this.handleViewAll}>View all</p>
            </div>
            <div className={styles.cards}>
              {isLoading ? (
                <Col md={12}>
                  <Spinner animation="border" variant="warning" />
                </Col>
              ) : (
                this.props.movie.dataMovie.map((item, index) => {
                  return (
                    <Col md={3} key={index}>
                      <Cards data={item} />
                    </Col>
                  );
                })
              )}
            </div>
            {/* <Row>
              <ReactPaginate
                previousLabel={`prev`}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage} // Total page
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </Row> */}
          </div>

          <div className={styles.content2}>
            <div className={styles.upcoming}>
              <p className={styles.upcomingMovies}>Upcoming Movies</p>
              <p>View all</p>
            </div>

            <div className={styles.month}>
              {this.state.month.map((item, index) => {
                return (
                  <Button
                    key={index}
                    variant="light"
                    className={styles.buttonMonth}
                    onClick={() => this.handleMonth(item.numMonth)}
                  >
                    {`${item.nameMonth}`}
                  </Button>
                );
              })}
            </div>

            <div className={styles.cards}>
              {isLoading ? (
                <Col md={12}>
                  <Spinner animation="border" variant="warning" />
                </Col>
              ) : (
                this.state.movieMonth.map((item, index) => {
                  return (
                    <Col md={3} key={index}>
                      <Cards2 data={item} />
                    </Col>
                  );
                })
              )}
            </div>
            {/* <Row>
              <ReactPaginate
                previousLabel={`prev`}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage} // Total page
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </Row> */}
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
});

const mapDispatchProps = { getAllMovie };

export default connect(mapStateToProps, mapDispatchProps)(HomePage);
