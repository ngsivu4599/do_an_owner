import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { placeAPI } from "../api/place/place";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/dist/client/router";
import { Image } from "react-bootstrap";

const GetAllPlace = () => {
  const Router = useRouter();
  const [idPlace, setIdPlace] = useState("");
  const [message, setMessage] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [status, setStatus] = useState("");
  var initPlace = [];
  const [adminPlace, setAdminPlace] = useState([]);
  const [updataStatus, setUpdateStatus] = useState("");
  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        console.log(res.data);
        setAdminPlace(res.data);
        initPlace.push(res.data);
        console.log(res.data);
        console.log(initPlace[0][1].name);
        setAdminPlace(initPlace[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  //   console.log(initPlace);

  const handleToCreatePt = () => {
    Router.replace("/pt/creatept");
  };

  const handleToCreateCourse = () => {
    Router.replace("/course/createCourse");
  };

  const handleDelete = (id) => (e) => {
    placeAPI
      .deletePlace(id)
      .then((res) => {
        // console.log(res)
        setMessage(res.data.message);
        // Router.replace("/place/getAllPlace");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setMessage("Bạn không được quyền xóa");
      });
  };
  const handleUpdateStatus = (id) => (e) => {
    const body = {
      update: "1",
      place: id,
    };
    console.log(body);
    placeAPI
      .updataStatus(body)
      .then((res) => {
        console.log(res);
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatusShow = (id) => (e) => {
    const body = {
      update: "0",
      place: id,
    };
    console.log(body);
    placeAPI
      .updataStatus(body)
      .then((res) => {
        console.log(res);
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các địa điểm</h2>
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
              <th>Ảnh</th>
              <th>Status</th>
              <th>Tạo mới</th>
            </tr>
          </thead>
          <tbody id="table">
            {adminPlace.map((place) => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.diachi}</td>
                <td>
                <Image
                      src={place.image.split(",")[0]}
                      alt="Loading..."
                      style={{ width: "100%" }}
                    />
                    <Image
                      src={place.image.split(",")[1]}
                      alt="Loading..."
                      style={{ width: "100%" }}
                    />
                    <Image
                      src={place.image.split(",")[2]}
                      alt="Loading..."
                      style={{ width: "100%" }}
                    />
                </td>
                <td  style={{width: "11%"}}>
                  {place.status === "0" ? (
                    <Button
                      variant="primary"
                      onClick={handleUpdateStatus(place.id)}
                    >
                      Ẩn
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleUpdateStatusShow(place.id)}
                    >
                      Hiển Thị
                    </Button>
                  )}
                </td>
                <td style={{width: "35%"}}>
                  <Button variant="primary" onClick={handleToCreatePt}>
                    Thêm PT
                  </Button>{" "}
                  <Button variant="primary" onClick={handleToCreateCourse}>
                    Thêm Course
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIdPlace(place.id);
                      setLgShow(true);
                      setMessage("");
                    }}
                  >
                    Xóa Place
                  </Button>
                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Bạn có muốn xóa địa điểm này không
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="place-delete">
                      <p>{message}</p>
                      <Button variant="primary" onClick={handleDelete(idPlace)}>
                        Xóa địa điểm
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
  );
};

export default GetAllPlace;
