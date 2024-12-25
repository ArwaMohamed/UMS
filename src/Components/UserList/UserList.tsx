import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteUser, setdeleteUser] = useState({});

  const getUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate()
  const addNewUser = ()=>{
    navigate('/dashboard/add-user')
  }
  const onEditUser = (id:string)=>{
    navigate(`/dashboard/add-user/${id}`)
  }
  const onDeleteUser = async(id:string)=>{
    try {
      const response = await axios.delete(`https://dummyjson.com/users/${id}`)
      const userData =response?.data
      toast.success(`User  ${userData?.firstName} ${userData?.lastName} is Deleted`)
      const updatedData =users.filter((user) => user?.id !== userData?.id);
      setUsers(updatedData)
      setModalShow(false)
    } catch (error) {
      toast.success(`Something Went Wrong`)
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
    <div className="mt-2">
      <div className="d-flex justify-content-between mx-3 ">
        <h3>Users List</h3>
        <button className="btn btn-warning text-white" onClick={addNewUser}>Add New User</button>
      </div>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>#</th>
          <th></th>
          <th>Name</th>
          <th>Email</th>
            <th>Phone</th>
            <th>BirthDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user:any) => (
            <tr key={user?.id}>
              <td>{user?.id}</td>
              <td> <img
                  src={user?.image}
                  alt={user?.firstName}
                  className="rounded-circle w-25"
                /></td>
              <td>
                {user?.firstName} {user?.lastName}
              </td>
              <td>{user?.email}</td>
              <td>{user?.phone}</td>
              <td>{user?.birthDate}</td>
              <td>
                <MdModeEdit onClick={()=>onEditUser(user?.id)} className="text-warning" size={30} />
                <MdDelete  onClick={() => {setModalShow(true); setdeleteUser(user)}} className="text-warning" size={30} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
          <DeleteConfirmation
            show={modalShow}
            user={deleteUser}
            onHide={() => setModalShow(false)}
            onDelete={()=>onDeleteUser(deleteUser?.id)}
          />
    </>
  );
}
