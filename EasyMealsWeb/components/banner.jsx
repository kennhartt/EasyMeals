import React, { Component } from "react";
import Image from "react-bootstrap/Image";

class Banner extends Component {
  state = {};
  render() {
    return (
      <div
        class="jumbotron"
        style={{
          marginTop: "30px",
          backgroundImage: "url(/images/background.jpeg)",
          backgroundSize: "cover",
        }}
      >
        <div class="container">
          <h1
            class="display-3"
            style={{
              marginBottom: "20px",
              color: "#000000",
              fontWeight: "normal",
            }}
          >
            Stay Hungry!
          </h1>
          <table class="justify-content-md-around">
            <tr>
              <td>
                <input
                  type="text"
                  class="form-control"
                  id="searchData"
                  placeholder="What are you looking for?"
                  value=""
                  required=""
                  style={{
                    marginBottom: "18px",
                    width: "800px",
                    height: "47px",
                    marginRight: "10px",
                  }}
                />
              </td>
              <td>
                <p>
                  <a
                    id="searchBtn"
                    class="btn btn-primary btn-lg"
                    role="button"
                    style={{ width: "150px", color: "#ffffff" }}
                  >
                    Search &raquo;
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Banner;
