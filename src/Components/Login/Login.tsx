import { useForm } from "react-hook-form";
import "../../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let {saveUserData} = useContext(AuthContext)
  const onSumbmit = async (data) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        data
      );
      localStorage.setItem('userToken',response?.data?.accessToken)
      saveUserData()
      toast.success("Login Sussessfuly");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login Faild");
    }
  };

  return (
    <>
      <div className="container-fluid login-contianer">
        <div className="row vh-100 justify-content-center align-items-center ">
          <div className="col-md-4 bg-white rounded p-5 w-sm-100">
            <div className="login-info">
              <h1 className="login-header">User Management System</h1>
              <p className="login-signIn pb-0 pt-4">SIGN IN</p>
              <span className="">
                Enter your credentials to access your account
              </span>
            </div>
            <form className="text-left" onSubmit={handleSubmit(onSumbmit)}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-danger mt-2">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger mt-2">
                    This field is required
                  </span>
                )}
              </div>
              <button type="submit" className="btn btn-primary login-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
