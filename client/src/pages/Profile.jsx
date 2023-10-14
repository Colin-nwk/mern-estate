import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert, AlertIcon, Progress } from "@chakra-ui/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

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

              {error ? (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
              <form className="space-y-5">
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
                    // value={currentUser.username}
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
                    // value={currentUser.email}
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
                    required
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

              <p className="text-right cursor-pointer text-red-600 hover:text-red-900 pt-6">
                Delete Acccount
              </p>
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
