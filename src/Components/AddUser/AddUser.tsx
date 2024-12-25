import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { moment } from 'moment';
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}
export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const addUser = async (data:UserData)=>{
    try {
      const response = await axios.post("https://dummyjson.com/users/add", data);
      toast.success("User Added Successfuly");
      navigate("/dashboard/users-list");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }
  const updateUser = async (data:UserData)=>{
    try {
      const response = await axios.put(`https://dummyjson.com/users/${id}`, data);
      toast.success("User Updated Successfuly");
      navigate("/dashboard/users-list");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }
  
  const onSumbmit = (data:UserData) => {
    if (id) {
      updateUser(data);
    } else {
      addUser(data);
    }
  };
  const getUserById = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      const userData = response?.data
      const formattedDate = moment(userData?.birthDate).format('YYYY-MM-DD');
      console.log(formattedDate);
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("email", userData.email);
      setValue("age", userData.age);
      setValue("phone", userData.phone);
      setValue("birthDate", formattedDate);
      await trigger();
    
    } catch (error) {
      toast.error("user not found");
    }
  };
  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id]);
  return (
    <>
      <div className="mt-2">
        <div className="d-flex justify-content-between mx-3 ">
          <h3>Add User</h3>
        </div>
        <hr />
        <Card className="text-left shadow-lg p-4 m-4 rounded border border-0">
          <Card.Body>
            <form
              className="text-left rounded"
              onSubmit={handleSubmit(onSumbmit)}
            >
              <div className="row g-4">
                <div className=" col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your First Name"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <span className="text-danger mt-2">
                      This field is required
                    </span>
                  )}
                </div>
                <div className=" col-md-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Last Name"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <span className="text-danger mt-2">
                      This field is required
                    </span>
                  )}
                </div>
                <div className=" col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Email"
                    {...register("email", { required: "This field is required" ,pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,message:"this email not valid"}})}
                  />
                  {errors.email && (
                    <span className="text-danger mt-2">
                      {errors?.email?.message }
                    </span>
                  )}
                </div>
                <div className=" col-md-6">
                  <label>Age</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Age"
                    {...register("age", { required: true })}
                  />
                  {errors.age && (
                    <span className="text-danger mt-2">
                      This field is required
                    </span>
                  )}
                </div>
                <div className=" col-md-6">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Phone Number"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <span className="text-danger mt-2">
                      This field is required
                    </span>
                  )}
                </div>
                <div className=" col-md-6">
                  <label>Birth Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputPassword1"
                    {...register("birthDate", { required: true })}
                  />
                  {errors.birthDate && (
                    <span className="text-danger mt-2">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <button
                disabled={!isValid}
                type="submit"
                className="btn btn-primary login-btn w-50 m-auto mt-4 d-block"
              >
                {id?'Update':'Submit'}
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
