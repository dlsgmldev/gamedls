import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const NHIE = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [question, setQuestion] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const idCompany = localStorage.getItem("id_company");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}game/participant/get_current_question`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { id_company: idCompany },
        }
      )
      .then((res) => {
        setQuestion(res.data.data);
        setLoading(false);
      });
    const interval = setInterval(() => {
      axios
        .get(
          `${process.env.REACT_APP_URL}game/participant/get_current_question`,
          {
            headers: { Authorization: "Bearer " + token },
            params: { id_company: idCompany },
          }
        )
        .then((res) => {
          setQuestion(res.data.data);
          setLoading(false);
        });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePernah = () => {
    setLoadingButton(true);
    axios
      .post(
        `${process.env.REACT_APP_URL}game/participant/save_answer/${id}`,
        { id_question: question.id, answer: "1" },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        axios
          .get(
            `${process.env.REACT_APP_URL}game/participant/get_current_question`,
            {
              headers: { Authorization: "Bearer " + token },
              params: { id_company: idCompany },
            }
          )
          .then((res) => {
            setLoadingButton(false);
            setQuestion(res.data.data);
          });
      });
  };

  const handleTidakPernah = () => {
    setLoadingButton(true);
    axios
      .post(
        `${process.env.REACT_APP_URL}game/participant/save_answer/${id}`,
        { id_question: question.id, answer: "2" },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        axios
          .get(
            `${process.env.REACT_APP_URL}game/participant/get_current_question`,
            {
              headers: { Authorization: "Bearer " + token },
              params: { id_company: idCompany },
            }
          )
          .then((res) => {
            setLoadingButton(false);
            setQuestion(res.data.data);
          });
      });
  };

  return (
    <>
      {loading === true ? (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      ) : question.islastquestion === true && question.answered === "1" ? (
        <div className="card border-0 mt-5">
          <p className="text-center fw-bold mb-0 fs-5">
            Thank you for participating.
          </p>
          <div
            className="btn mx-auto text-white bg-blue mt-3"
            style={{ width: "150px" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </div>
        </div>
      ) : (
        <div>
          <p className="fs-2 fw-bold text-center mt-4">Never Have I Ever</p>
          <div className="card shadow-lg border-0 mx-5 p-4">
            {question.answered === "1" ? (
              <p className="text-center text-secondary mb-0 fs-5">
                Menunggu pertanyaan selanjutnya...
              </p>
            ) : (
              <div className="card border-0">
                <p className="text-center fs-5">{question?.question}</p>
                <button
                  className="btn bg-success text-white fw-bold w-75 mx-auto my-3 p-2"
                  onClick={handlePernah}
                  disabled={question.answered === "1"}
                >
                  {loadingButton === true ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Pernah"
                  )}
                </button>
                <button
                  className="btn bg-danger text-white fw-bold w-75 mx-auto p-2"
                  onClick={handleTidakPernah}
                  disabled={question.answered === "1"}
                >
                  {loadingButton === true ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Tidak Pernah"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NHIE;
