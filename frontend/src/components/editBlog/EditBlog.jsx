import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useUpdateBlogsMutation } from "../../context/api/blogApi";

const EditBlog = ({ setEdit, blog }) => {
  const [formData, setFormData] = useState(blog);
  const [updateBlog, { data }] = useUpdateBlogsMutation();

  console.log(blog);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (formData) => {
    updateBlog({ body: formData, id: blog._id });
    setEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      className="w-96 max-sm:w-full"
      initialValues={{
        title: formData?.title,
        desc: formData?.desc,
      }}
      labelCol={{
        span: 8,
      }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,

            message: "Please enter a title",
          },
        ]}
      >
        <Input
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: "Please enter a description",
          },
        ]}
      >
        <Input
          placeholder="Enter description"
          value={formData.desc}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Save
        </Button>
        <Button
          type="primary"
          danger
          className="w-full mt-2"
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditBlog;
