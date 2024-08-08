import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useSignInMutation } from "../../context/api/userApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../context/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signIn, { data, isSuccess, error }] = useSignInMutation();
  console.log(data);
  console.log(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.payload.token));
      dispatch(setUser(data.payload.user));
      navigate("/dashboard");
    }
  }, [isSuccess]);

  const handleSubmit = (values) => {
    signIn(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-sm:p-4 flex items-center justify-center min-h-screen flex-col gap-4">
      <h2 className="text-2xl font-medium">Sign in</h2>
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="aziz07" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="12345678" />
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
export default SignIn;
