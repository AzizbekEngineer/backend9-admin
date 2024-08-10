import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Col, Row, Button, Modal, Form, Input, Select } from "antd";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../context/api/userApi";

const ManageUsers = () => {
  const { data } = useGetUsersQuery();
  const [deleteUsers] = useDeleteUserMutation();
  const [updateUsers] = useUpdateUserMutation();

  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("O'chirmoqchimisz")) {
      deleteUsers(id);
    }
  };

  const handleEdit = (user) => {
    setEdit(user);
    setOpen(true);
  };

  //////////edit
  const handleSubmit = (values) => {
    if (edit?._id) {
      const formData = {
        ...values,
      };
      updateUsers({ body: formData, id: edit._id });
      console.log(formData);
      setOpen(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4">
      <Modal
        title={<p>{edit ? `Edit User: ${edit.fname}` : "Loading Modal"}</p>}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          name="basic"
          layout="vertical"
          className="w-96 max-sm:w-full"
          labelCol={{ span: 8 }}
          initialValues={{
            fname: edit?.fname,
            lname: edit?.lname,
            username: edit?.username,
            url: edit?.url,
            age: edit?.age,
            budget: edit?.budget || 0,
            gender: edit?.gender,
          }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="fname"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lname"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, message: "Please input the budget!" }]}
          >
            <Input placeholder="Enter budget" />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input the age!" }]}
          >
            <Input placeholder="Enter age" />
          </Form.Item>

          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: "Please input the URL!" }]}
          >
            <Input placeholder="Enter URL" />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select placeholder="Select gender" style={{ width: "100%" }}>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Row gutter={[16, 16]} className="flex flex-wrap">
        {data?.payload?.map((el) => (
          <Col
            key={el?._id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="flex justify-center"
          >
            <Card
              bordered={false}
              className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 border-solid border-2 border-black-500"
            >
              <h2 className="text-lg font-semibold">{el?.fname}</h2>
              <p className="text-gray-600">{el?.lname ? el?.lname : "X.."}</p>
              <p className="text-gray-600">@{el?.username}</p>
              <p className="text-gray-600">{el?.budget}</p>
              <div className="flex justify-between gap-4 py-4">
                <button
                  className="text-green-500 font-bold text-xl"
                  onClick={() => handleEdit(el)} // edit tugmasi bosilganda Modalni ochamiz
                >
                  <EditOutlined />
                </button>
                <button
                  className="text-red-500 font-bold text-xl"
                  onClick={() => handleDelete(el?._id)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ManageUsers;
