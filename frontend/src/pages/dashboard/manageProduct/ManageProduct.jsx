import React from "react";
import { Card, Button } from "antd";
const { Meta } = Card;
import {
  useDeleteProductsMutation,
  useGetProductsQuery,
} from "../../../context/api/productApi";

const ManageProduct = () => {
  const { data } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductsMutation();
  console.log(data);

  const handleDelete = (id) => {
    if (window.confirm("ochirishni xoxlaysizmi")) {
      deleteProduct(id);
    }
  };
  return (
    <div className="flex flex-wrap gap-5">
      {data?.payload?.map((el) => (
        <Card
          key={el?._id}
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={el?.urls[0]} />}
        >
          <div className="flex flex-col gap-2">
            <Meta title={el?.title} />
            <h3>{el?.desc}</h3>
          </div>
          <div className="flex justify-between pt-2">
            <Button type="primary">Edit</Button>
            <Button onClick={() => handleDelete(el?._id)} danger>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ManageProduct;
