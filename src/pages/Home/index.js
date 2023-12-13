import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [dataTest, setDataTest] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}game/participant/list/10/1`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataTest(res.data.data);
      });
    // const interval = setInterval(() => {
    //   axios
    //     .get(`${process.env.REACT_APP_URL}game/participant/list/10/1`, {
    //       headers: { Authorization: "Bearer " + token },
    //     })
    //     .then((res) => {
    //       setDataTest(res.data.data);
    //     });
    // }, 3000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="d-none d-sm-block">
        <Row className="mt-4 gap-3 row-cols-6 d-flex justify-content-center">
          {dataTest?.map((item) => (
            <Col
              className={`card border-0 shadow-lg p-3 text-center ${
                item.active === 0 && `d-none`
              }`}
            >
              <img src={item.image} width="auto" />
              <p className="my-3 fw-bold">{item.name}</p>
              {item.id === 2 && <p className="">({item.name_room})</p>}
              <button
                className="btn bg-blue text-white fw-bold w-100 mt-auto"
                onClick={() => {
                  if (item.id === 3) {
                    window.open(
                      "https://onegml.com/game_wof/index_scorm.html",
                      "_blank"
                    );
                  } else if (item.id === 2) {
                    navigate(`/${item.slug}/${item.id}/${item.id_room}`);
                  } else {
                    navigate(`/${item.slug}/${item.id}`);
                  }
                }}
                disabled={item.active === 0}
              >
                Mulai Bermain
              </button>
            </Col>
          ))}
        </Row>
      </div>
      <div className="d-block d-sm-none">
        {dataTest?.map((item) => (
          <div
            className={`card border-0 shadow-lg p-3 text-center mt-3 ${
              item.active === 0 && `d-none`
            }`}
          >
            <img src={item.image} width="auto" />
            <p className="mt-auto mb-2 fw-bold">{item.name}</p>
            {item.id === 2 && <p className="">({item.name_room})</p>}
            <button
              className="btn bg-blue text-white fw-bold w-50 mx-auto"
              onClick={() => {
                if (item.id === 3) {
                  window.open(
                    "https://onegml.com/game_wof/index_scorm.html",
                    "_blank"
                  );
                } else if (item.id === 2) {
                  navigate(`/${item.slug}/${item.id}/${item.id_room}`);
                } else {
                  navigate(`/${item.slug}/${item.id}`);
                }
              }}
            >
              Mulai Bermain
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
