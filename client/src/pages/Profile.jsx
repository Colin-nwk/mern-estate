import { useRef, useState, useEffect } from "react";

import { Alert, AlertIcon, Progress } from "@chakra-ui/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";

import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
} from "../redux/user/userSlice";
import DeleteAccount from "../components/DeleteAccount";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, `avatar/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // console.log(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUpdateSuccess(true);
        dispatch(updateUserSuccess(data));
      } else {
        dispatch(updateUserFailure(data.message));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <>
      <main className="relative py-6 bg-gray-900 h-screen">
        <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
          <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
            <h3 className="text-cyan-400 font-semibold">Profile</h3>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md  text-gray-600 space-y-2 bg-white px-10 my-5 rounded-md py-6">
              <div className="flex justify-center items-center flex-col ">
                <div
                  className="relative w-16 h-16 cursor-pointer "
                  onClick={() => fileRef.current.click()}
                >
                  <span className="absolute -bottom-px right-1 w-4 h-4 rounded-full border border-white bg-green-500"></span>
                  <img
                    src={formData.avatar || currentUser.avatar}
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>

              <p className="text-sm self-center text-center">
                {fileUploadError ? (
                  <span className="text-red-700">
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <Progress hasStripe value={filePerc} colorScheme="green" />
                ) : filePerc === 100 ? (
                  <span className="text-green-700">
                    Image successfully uploaded!
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p className="text-green-700 mt-5">
                {updateSuccess ? "User is updated successfully!" : ""}
              </p>

              {error ? (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* <input type="image" src="" alt="" /> */}
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  hidden
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div>
                  <label className="font-medium">Username</label>

                  <input
                    type="text"
                    required
                    name="username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                    id="username"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    required
                    name="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    id="email"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Password</label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    onChange={handleChange}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <button
                  className="w-full px-4 py-2 text-white font-medium bg-cyan-600 hover:bg-cyan-900 active:bg-indigo-700 rounded-lg duration-150 disabled:bg-cyan-300 uppercase"
                  disabled={loading}
                >
                  {loading ? "loading..." : "  update"}
                </button>
              </form>

              <DeleteAccount />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-screen mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </main>
    </>
  );
};

export default Profile;
