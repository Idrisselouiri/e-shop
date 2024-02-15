import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import styles from "../../style/style";

const Profile = () => {
  const [file, setFile] = useState(undefined);
  const [filePres, setFilePres] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const inputRef = useRef(null);

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
            src={currentUser.avatar}
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
        <form className={`${styles.form}`}>
          <div>
            <label htmlFor="username">User Name</label>
            <input type="text" className={`${styles.input}`} id="username" />
          </div>
          <div className="mt-2">
            <label htmlFor="email">Email address</label>
            <input type="text" className={`${styles.input}`} id="email" />
          </div>
          <div className="mt-2">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              className={`${styles.input} appearance-none`}
              id="password"
            />
          </div>
          <button
            className="py-2 bg-blue-600 text-white text-[18px] rounded-md mt-3 mb-3"
            type="submit"
          >
            Update
          </button>
          <div className={`${styles.FlexSection}`}>
            <p>Delete Account</p>
            <p>Sign Out</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
