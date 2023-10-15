// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const notify = () =>
    toast.info("Account deleted successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDelete = async () => {
    dispatch(deleteUserStart());

    // console.log("start");
    try {
      await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(deleteUserSuccess());
      notify();
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <p
        className="text-right cursor-pointer text-red-600 hover:text-red-900 pt-6"
        onClick={handleDelete}
      >
        Delete Acccount
      </p>
    </>
  );
};

export default DeleteAccount;
