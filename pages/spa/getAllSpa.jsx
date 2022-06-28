import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { spaAPI } from "../api/spa/spa";

const GetAllSpa = () => {
  const [adminSpa, setAdminSpa] = useState([]);
  const Router = useRouter();
  const [lgShow, setLgShow] = useState(false);
  const [idSpa, setIdSpa] = useState("");

  useEffect(() => {
    spaAPI
      .getAllSpa()
      .then((res) => {
        // console.log(res);
        // setArrayImage(res.data.image.split(";"));
        setAdminSpa(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateService = (e) => {
    e.preventDefault();
    Router.push("/service/createService");
  };

  const handleUpdateStatusSpa = (id) => (e) => {
    const body = {
      update: "1",
      spa: id,
    };
    console.log(body);
    spaAPI
      .updateStatusSpa(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatusSpaHide = (id) => (e) => {
    const body = {
      update: "0",
      spa: id,
    };
    console.log(body);
    spaAPI
      .updateStatusSpa(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => (e) => {
    console.log(id);
    spaAPI
      .deleteSpa(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="getall-spa">
      <div className="getplace">
        <div className="container alert alert-light">
          {" "}
          <h2>Tất cả các Spa</h2>
          <br />
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Search for name and email......"
          />
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Ảnh đại diện</th>
                <th>Status</th>
                <th style={{width: "30%"}}>Action</th>
              </tr>
            </thead>
            <tbody id="table">
              {adminSpa.map((spa) => (
                <tr key={spa.id}>
                  <td>{spa.name}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{spa.thongtinthem}</td>
                  <td style={{ width: "25%" }}>
                    <Image
                      src={spa.image.split(",")[0]}
                      alt="Loading..."
                      style={{ width: "100%" }}
                    />
                    <Image
                      src={spa.image.split(",")[1]}
                      alt="Loading..."
                      style={{ width: "100%" }}
                    />
                    <Image
                      src={spa.image.split(",")[2]}
                      alt="Loading..."
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td>
                    {spa.status == "0" ? (
                      <Button
                        variant="primary"
                        onClick={handleUpdateStatusSpa(spa.id)}
                      >
                        Ẩn
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleUpdateStatusSpaHide(spa.id)}
                      >
                        Hiển Thị
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button variant="primary" onClick={handleCreateService}>
                      Thêm dịch vụ
                    </Button>{" "}
                    <Button
                      variant="primary"
                      onClick={() => {
                        setIdSpa(spa.id);
                        setLgShow(true);
                      }}
                    >
                      Xóa Spa
                    </Button>
                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Bạn có muốn xóa Spa này không
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="place-delete">
                        <Button variant="primary" onClick={handleDelete(idSpa)}>
                          Xóa Spa
                        </Button>{" "}
                      </Modal.Body>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllSpa;
