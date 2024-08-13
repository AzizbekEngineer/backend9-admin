import { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminBlog from "./pages/dashboard/adminBlog/AdminBlog";
import CreateBlog from "./pages/dashboard/createBlog/CreateBlog";
import ManageUsers from "./pages/dashboard/manageUser/ManageUsers";
import CreateUsers from "./pages/dashboard/createUsers/CreateUsers";
import CreateProduct from "./pages/dashboard/createProduct/CreateProduct";
import ManageProduct from "./pages/dashboard/manageProduct/ManageProduct";

const Auth = lazy(() => import("./pages/auth/Auth"));
const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Login = lazy(() => import("./pages/login/Login"));

const App = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="adminBlog" element={<AdminBlog />} />
            <Route path="createBlog" element={<CreateBlog />} />
            <Route path="manageUsers" element={<ManageUsers />} />
            <Route path="createUsers" element={<CreateUsers />} />
            <Route path="createProducts" element={<CreateProduct />} />
            <Route path="manageProduct" element={<ManageProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
