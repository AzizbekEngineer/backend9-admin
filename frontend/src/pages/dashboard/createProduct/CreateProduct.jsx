import React from "react";
import { Button, Form, Input, Select, Switch, Upload, message } from "antd";
import { useCreateProductsMutation } from "../../../context/api/productApi";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateProduct = () => {
  const [createProduct] = useCreateProductsMutation();

  const handleCreate = (values) => {
    const files = values.urls?.fileList?.map((file) => file.originFileObj);

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "urls" && files) {
        files.forEach((file) => formData.append("urls", file));
      } else {
        formData.append(key, values[key]);
      }
    });

    // Serverga yuboramiz
    createProduct(formData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-sm:p-2 flex mx-6 flex-col gap-2">
      <h2 className="text-xl font-medium">Create Product</h2>
      <Form
        name="basic"
        layout="vertical"
        className="w-96"
        initialValues={{
          remember: true,
          available: true, // Default value for available
        }}
        onFinish={handleCreate}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input the title",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input the description",
            },
          ]}
        >
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input the price",
            },
          ]}
        >
          <Input type="number" placeholder="Price" />
        </Form.Item>

        <Form.Item
          label="Old Price"
          name="oldPrice"
          rules={[
            {
              required: true,
              message: "Please input the old price",
            },
          ]}
        >
          <Input type="number" placeholder="Old Price" />
        </Form.Item>

        <Form.Item
          label="Info"
          name="info"
          rules={[
            {
              required: true,
              message: "Please input additional info",
            },
          ]}
        >
          <Input placeholder="Info" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select a category",
            },
          ]}
        >
          <Select placeholder="Select a category">
            <Option value="electronics">Electronics</Option>
            <Option value="clothing">Clothing</Option>
            <Option value="home">Home</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          rules={[
            {
              required: true,
              message: "Please select a rating",
            },
          ]}
        >
          <Select placeholder="Select a rating">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Upload Images"
          name="urls"
          valuePropName="fileList"
          getValueFromEvent={({ fileList }) => fileList}
          extra="Select images to upload"
          rules={[
            {
              required: true,
              message: "Please upload your images",
            },
          ]}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess(null, file);
                message.success(`${file.name} file uploaded successfully`);
              }, 1000);
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Available"
          name="available"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Please select availability",
            },
          ]}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            {
              required: true,
              message: "Please input the stock quantity",
            },
          ]}
        >
          <Input type="number" placeholder="Stock" />
        </Form.Item>

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
