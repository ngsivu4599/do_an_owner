import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
  Input,
} from "antd";
import { searchAPI } from "../api/search/search";

import omit from "lodash/omit";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 6,
  },
};

const initialParams = {
  dienTich: "",
  price: "",
  search: "",
  service: "",
  minPrice: "",
  upload: "",
};

const CreateApartment = () => {
  const [form] = Form.useForm();

  const [tinh, setTinh] = useState([]);
  const [idTinh, setIdTinh] = useState("");
  const [nameTinh, setNameTinh] = useState("");
  const [huyen, setHuyen] = useState([]);
  const [idHuyen, setIdHuyen] = useState("");
  const [nameHuyen, setNameHuyen] = useState("");
  const [xa, setXa] = useState([]);
  const [idXa, setIdXa] = useState("");
  const [nameXa, setNameXa] = useState("");
  const [search, setSearch] = useState("");
  const [params, setParams] = useState(initialParams);
  const [diachi, setDiachi] = useState("");

  useEffect(() => {
    searchAPI
      .getTinh()
      .then((res) => {
        setTinh(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeTinh = (value) => {
    setIdTinh(value);
  };

  useEffect(() => {
    searchAPI
      .getHuyen(idTinh)
      .then((res) => {
        setHuyen(res.data.results);
      })
      .catch((err) => console.log(err));

    searchAPI
      .getTinhById(idTinh)
      .then((res) => {
        setNameTinh(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idTinh]);

  const handleChangeHuyen = (value) => {
    setIdHuyen(value);
  };

  useEffect(() => {
    searchAPI
      .getXa(idHuyen)
      .then((res) => {
        setXa(res.data.results);
      })
      .catch((err) => console.log(err));

    searchAPI
      .getHuyenById(idHuyen)
      .then((res) => {
        setNameHuyen(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idHuyen]);

  const handleChangeXa = (value) => {
    setIdXa(value);
  };

  useEffect(() => {
    searchAPI
      .getXaById(idXa)
      .then((res) => {
        setNameXa(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idXa]);

  useEffect(() => {
    if (nameXa == null) {
      setNameXa("");
    }
    if (nameHuyen == null) {
      setNameHuyen("");
    }
    if (nameTinh == null) {
      setNameTinh("");
    }
    setSearch(diachi + " " + nameXa + " " + nameHuyen + " " + nameTinh);
  }, [nameTinh, nameHuyen, nameXa, diachi]);

  const onFinish = (values) => {
    const newValues = omit(values, [
      "tinhThanhpho",
      "quanHuyen",
      "xaPhuong",
      "diachi",
    ]);
    setParams({ ...initialParams, ...newValues, search });
  };

  const onReset = () => {
    console.log("params :>> ", params);
    form.resetFields();
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChangeDiaChi = (e) => {
    setDiachi(e?.target?.value);
  };

  return (
    <Form
      className="form-create"
      {...formItemLayout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
    >
      <Form.Item
        name="tinhThanhpho"
        label="T???nh/Th??nh ph???"
        rules={[
          {
            required: true,
            message: "Vui l??ng nh???p ?????a ch???!",
          },
        ]}
      >
        <Select defaultValue="Ch???n 1 th??nh ph???" onChange={handleChangeTinh}>
          {tinh.map((tinh) => (
            <Option key={tinh.province_id} value={tinh.province_id}>
              {tinh.province_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="quanHuyen"
        label="Qu??n/Huy???n"
        rules={[
          {
            required: true,
            message: "Vui l??ng nh???p ?????a ch???!",
          },
        ]}
      >
        <Select defaultValue="Ch???n 1 Qu???n/Huy???n" onChange={handleChangeHuyen}>
          {huyen.map((huyen) => (
            <Option key={huyen.district_id} value={huyen.district_id}>
              {huyen.district_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="xaPhuong"
        label="X??/Ph?????ng"
        rules={[
          {
            required: true,
            message: "Vui l??ng nh???p ?????a ch???!",
          },
        ]}
      >
        <Select defaultValue="Ch???n 1 Ph?????ng/X??" onChange={handleChangeXa}>
          {xa.map((xa) => (
            <Option key={xa.ward_id} value={xa.ward_id}>
              {xa.ward_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="diachi" label="?????a ch???">
        <Input placeholder="S??? nh??, ???????ng/Ph???" onChange={handleChangeDiaChi} />
      </Form.Item>
      <Form.Item
        name="dienTich"
        label="Di???n t??ch"
        rules={[
          {
            required: true,
            message: "Vui l??ng nh???p di???n t??ch!",
          },
        ]}
      >
        <InputNumber
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          addonAfter="m??"
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="Gi??"
        rules={[
          {
            required: true,
            message: "Vui l??ng nh???p gi??!",
          },
        ]}
      >
        <InputNumber
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          addonAfter="VN??"
        />
      </Form.Item>
      <Form.Item name="minPrice" label="S??? ti???n c???c">
        <InputNumber
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          addonAfter="VN??"
        />
      </Form.Item>
      <Form.Item name="service" label="D???ch v???">
        <Checkbox.Group>
          <Row justify="space-between">
            <Col>
              <Checkbox value="dieu-hoa" style={{ lineHeight: "32px" }}>
                ??i???u ho??
              </Checkbox>
            </Col>
            <Col>
              <Checkbox value="may-giat" style={{ lineHeight: "32px" }}>
                M??y gi???t
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item name="description" label="Th??ng tin chi ti???t">
        <Input.TextArea showCount maxLength={3000} style={{ height: 120 }} />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="????ng t???i 3 ?????n 5 ???nh"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Th??m ph??ng
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateApartment;
