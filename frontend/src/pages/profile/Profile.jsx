import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/user/userSlice.js";
import { app } from "../../firebase.js";
import styles from "../../style/style";

const Profile = () => {
  const [file, setFile] = useState(undefined);
  const [filePres, setFilePres] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  console.log(formData);
  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);
  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePres(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "Delete",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const signoutUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <section
      className={`${styles.normalFlex} justify-center min-h-screen w-full bg-slate-100`}
    >
      <div className="w-2/5">
        <h1 className="py-3 text-center text-3xl font-bold">Profile</h1>
        <div className={`${styles.normalFlex} justify-center mb-2`}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            ref={inputRef}
            accept="image/*"
            className="hidden"
          />
          <img
            src={formData.avatar || currentUser.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full"
            onClick={() => inputRef.current.click()}
          />
          <p>
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePres > 0 && filePres < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePres}%`}</span>
            ) : filePres === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        <form onSubmit={updateUser} className={`${styles.form}`}>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              onChange={handleChange}
              type="text"
              className={`${styles.input}`}
              id="username"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="email">Email address</label>
            <input
              onChange={handleChange}
              type="text"
              className={`${styles.input}`}
              id="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password">Password </label>
            <input
              onChange={handleChange}
              type="password"
              className={`${styles.input} appearance-none`}
              id="password"
              defaultValue={currentUser.password}
            />
          </div>
          <button
            disabled={loading}
            className="py-2 bg-blue-600 text-white text-[18px] rounded-md mt-3 mb-3"
            type="submit"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <div className={`${styles.FlexSection}`}>
            <button onClick={deleteUser}>Delete Account</button>
            <button onClick={signoutUser}>Sign Out</button>
          </div>
          <p className="text-red-700 mt-5">{error ? error : ""}</p>
          <p className="text-green-700 mt-5">
            {updateSuccess ? "User is updated successfully!" : ""}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Profile;
