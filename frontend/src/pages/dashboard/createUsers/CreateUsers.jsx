import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../context/api/userApi";

const CreateUsers = () => {
  const navigate = useNavigate();
  const [createBlog, { data, isSuccess }] = useRegisterUserMutation();
  const [gender, setGender] = useState("");

  const handleSubmit = (values) => {
    const formData = {
      ...values,
      gender: gender,
    };
    createBlog(formData);
    console.log(formData);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    setGender(value);
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/manageUsers");
    }
  }, [isSuccess]);

  return (
    <Form
      name="basic"
      layout="vertical"
      className="w-96 max-sm:w-full"
      labelCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="fname"
        name="fname"
        rules={[
          {
            required: true,
            message: "fname",
          },
        ]}
      >
        <Input placeholder="Enter fname" />
      </Form.Item>

      <Form.Item
        label="lname"
        name="lname"
        rules={[
          {
            required: true,
            message: "lname",
          },
        ]}
      >
        <Input placeholder="Enter lname" />
      </Form.Item>

      <Form.Item
        label="username"
        name="username"
        rules={[
          {
            required: true,
            message: "username",
          },
        ]}
      >
        <Input placeholder="Enter username" />
      </Form.Item>

      <Form.Item
        label="password"
        name="password"
        rules={[
          {
            required: true,
            message: "password",
          },
        ]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item
        label="budget"
        name="budget"
        rules={[
          {
            required: true,
            message: "budget",
          },
        ]}
      >
        <Input placeholder="Enter budget" />
      </Form.Item>
      <Form.Item
        label="age"
        name="age"
        rules={[
          {
            required: true,
            message: "age",
          },
        ]}
      >
        <Input placeholder="Enter age" />
      </Form.Item>
      <Form.Item
        label="url"
        name="url"
        rules={[
          {
            required: true,
            message: "url",
          },
        ]}
      >
        <Input placeholder="Enter url" />
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Select
          placeholder="Select gender"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUsers;
