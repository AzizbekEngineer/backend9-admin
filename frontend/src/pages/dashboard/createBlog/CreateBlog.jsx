import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useCreateBlogsMutation } from "../../../context/api/blogApi";

const CreateBlog = () => {
  const [createBlog, { data }] = useCreateBlogsMutation();
  const handleSubmit = (values) => {
    createBlog(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        label="title"
        name="title"
        rules={[
          {
            required: true,
            message: "Title",
          },
        ]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item
        label="desc"
        name="desc"
        rules={[
          {
            required: true,
            message: "Desc",
          },
        ]}
      >
        <Input placeholder="Enter desc" />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;
