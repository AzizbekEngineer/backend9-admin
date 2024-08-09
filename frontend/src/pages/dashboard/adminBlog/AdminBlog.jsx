import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Card, Col, Row } from "antd";

import {
  useDeleteBlogsMutation,
  useGetBlogsQuery,
} from "../../../context/api/blogApi";
import EditBlog from "../../../components/editBlog/EditBlog";

const AdminBlog = () => {
  const { data } = useGetBlogsQuery();
  const [DelateBlog] = useDeleteBlogsMutation();

  const [currentBlog, setCurrentBlog] = useState(null);
  const [edit, setEdit] = useState(false);
  const handleDelete = (id) => {
    if (window.confirm("yes")) {
      DelateBlog(id);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, [edit]);
  const handleEdit = (el) => {
    setCurrentBlog(el);
    setEdit(true);
  };

  return (
    <div className="p-4">
      {edit ? <EditBlog blog={currentBlog} setEdit={setEdit} /> : <></>}
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
              className="w-full shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold">{el?.title}</h2>
              <p className="text-gray-600">{el?.desc}</p>
              <div className="flex justify-between gap-4 py-4">
                <button
                  className="text-green-500 font-bold text-xl"
                  onClick={() => handleEdit(el)}
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

export default AdminBlog;
