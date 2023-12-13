import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const VSH = () => {
  const [dataQuestion, setDataQuestion] = useState([""]);
  const [file, setFile] = useState();
  const [idQuestion, setIdQuestion] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [show, setShow] = useState(false);
  const [showOpenFile, setShowOpenFile] = useState(false);
  const [openFile, setopenFile] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const { id2 } = useParams();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}game/participant/get_question_vsh/${id2}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setDataQuestion(res.data);
        setLoading(false);
      });
    // const interval = setInterval(() => {
    //   axios
    //     .get(
    //       `${process.env.REACT_APP_URL}game/participant/get_question_vsh/${id2}`,
    //       {
    //         headers: { Authorization: "Bearer " + token },
    //       }
    //     )
    //     .then((res) => {
    //       setDataQuestion(res.data);
    //     });
    // }, 3000);
    // return () => clearInterval(interval);
  }, []);

  const handleUpload = (idQuestion) => {
    setLoadingButton(true);
    const PPData = new FormData();
    PPData.append("dataUpload", file);
    axios
      .post(
        `${process.env.REACT_APP_URL}game/participant/save_answer_vsh/${id}/${id2}/${idQuestion}`,
        PPData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        window.location.reload(false);
        setErrorMessage("");
      })
      .catch((err) => {
        setShow(false);
        setLoadingButton(false);
        setErrorMessage("File is empty, please choose the file!");
      });
  };

  return (
    <div>
      {loading === true ? (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="p-4">
          <p className="fs-2 fw-bold text-center mt-4 mb-0">
            Virtual Scavenger Hunt
          </p>
          <p className="text-center fs-4">({dataQuestion.name_room})</p>
          {dataQuestion?.data?.map((item) => (
            <div className="card border-0 shadow-lg p-4 mt-3">
              <p className="mt-auto mb-1 fw-bold fs-5">
                {item.task} ({item.point})
              </p>
              {item.validate === "1" ? (
                <div
                  className="bg-success text-white p-1 text-center rounded mb-1 text-xs fw-bold"
                  style={{ width: "130px" }}
                >
                  Valid
                </div>
              ) : item.validate === "2" ? (
                <div
                  className="bg-danger text-white p-1 text-center rounded mb-1 text-xs fw-bold"
                  style={{ width: "130px" }}
                >
                  Tidak Valid
                </div>
              ) : item.updated_on !== "0" ? (
                <div
                  className="bg-warning text-white p-1 text-center rounded mb-1 text-xs fw-bold"
                  style={{ width: "130px" }}
                >
                  Sedang Divalidasi
                </div>
              ) : dataQuestion.started === false ? (
                ""
              ) : (
                <div
                  className="bg-info text-white p-1 text-center rounded mb-1 text-xs fw-bold"
                  style={{ width: "130px" }}
                >
                  Kumpulkan Tugasnya
                </div>
              )}
              {item.updated_on !== "0" ? (
                <p className="mb-1">Tanggal Upload: {item.updated_on}</p>
              ) : (
                ""
              )}
              {item.id_question === idQuestion ? (
                <p className="text-danger mb-1">{errorMessage}</p>
              ) : (
                ""
              )}
              {item.answer === "0" ? (
                ""
              ) : (
                <>
                  <button
                    className="btn bg-blue py-1 text-white d-none d-sm-block"
                    style={{ width: "10%" }}
                    onClick={() => {
                      setShowOpenFile(true);
                      setopenFile(item.answer);
                    }}
                  >
                    Open File
                  </button>
                  <button
                    className="btn bg-blue py-1 text-white w-50 d-block d-sm-none"
                    onClick={() => {
                      setShowOpenFile(true);
                      setopenFile(item.answer);
                    }}
                  >
                    Open File
                  </button>
                </>
              )}
              <input
                class="form-control input w-100 mt-2"
                type="file"
                accept=".jpg,.png,.mp4"
                defaultValue={file}
                onChange={(e) => {
                  e.preventDefault();
                  setFile(e.target.files[0]);
                }}
                disabled={
                  item.validate === "1" || dataQuestion.started === false
                }
              />
              <button
                className="btn bg-blue text-white fw-bold w-50 mt-3"
                onClick={() => {
                  setShow(true);
                  setIdQuestion(item.id_question);
                }}
                disabled={
                  item.validate === "1" || dataQuestion.started === false
                }
              >
                Upload
              </button>
            </div>
          ))}
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Body>
              <p className="fs-4 fw-bold mb-2 text-center">Confirmation</p>
              <p className="text-center">
                Are you sure you want to upload this file?
              </p>
              <div className="d-flex justify-content-center">
                <div
                  className="btn bg-blue mx-2 text-white px-4"
                  onClick={() => handleUpload(idQuestion)}
                >
                  {loadingButton === true ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Ya"
                  )}
                </div>
                <div
                  className="btn bg-blue mx-2 text-white px-4"
                  onClick={() => setShow(false)}
                >
                  Tidak
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={showOpenFile} onHide={() => setShowOpenFile(false)}>
            <Modal.Body>
              <div className="d-flex justify-content-center">
                {openFile?.slice(
                  ((openFile?.lastIndexOf(".") - 1) >>> 0) + 2
                ) === "mp4" ||
                openFile?.slice(
                  ((openFile?.lastIndexOf(".") - 1) >>> 0) + 2
                ) === "mov" ||
                openFile?.slice(
                  ((openFile?.lastIndexOf(".") - 1) >>> 0) + 2
                ) === "MOV" ? (
                  <video controls width="250px" height="auto">
                    <source src={openFile} type="video/mp4" />
                  </video>
                ) : (
                  <img src={openFile} width="300px" height="auto" />
                )}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default VSH;
