import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import moment from "moment";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const { register, setValue, trigger } = useForm();
  const setUserData = async () => {
    try {
      const formattedDate = moment(userData?.birthDate).format("YYYY-MM-DD");
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
    if (userData) {
      console.log(userData);
      
      setUserData();
    }
  }, [userData]);
  return (
    <>
      <div className="mt-2">
        <div className="d-flex justify-content-between mx-3 ">
          <h3>Profile</h3>
        </div>
        <hr />
        <Card className="text-left shadow-lg p-4 m-4 rounded border border-0 cardFormProfile">
           <div className="profileImage">
             <img src={userData?.image}/>
            </div>
          <Card.Body className="mt-5">
            <form
              className="text-left rounded"
            >
              <div className="row g-4">
                <div className=" col-md-6">
                  <label>First Name</label>
                  <input disabled
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your First Name"
                    {...register("firstName", { required: true })}
                  />
                </div>
                <div className=" col-md-6">
                  <label>Last Name</label>
                  <input disabled
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Last Name"
                    {...register("lastName", { required: true })}
                  />
                </div>
                <div className=" col-md-6">
                  <label>Email</label>
                  <input disabled
                    type="email"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Email"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "this email not valid",
                      },
                    })}
                  />
                </div>
                <div className=" col-md-6">
                  <label>Age</label>
                  <input disabled
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Age"
                    {...register("age", { required: true })}
                  />
                </div>
                <div className=" col-md-6">
                  <label>Phone Number</label>
                  <input disabled
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Phone Number"
                    {...register("phone", { required: true })}
                  />
                </div>
                <div className=" col-md-6">
                  <label>Birth Date</label>
                  <input disabled 
                    type="date"
                    className="form-control"
                    id="exampleInputPassword1"
                    {...register("birthDate", { required: true })}
                  />
                </div>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
