import React, { useState } from "react";
import { Alert, TextInput, Button, Select, FileInput } from "flowbite-react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const requiredFields = ['secreteKey', 'registerNumber', 'username', 'email', 'phoneNumber'];
    const isFormValid = requiredFields.every(field => formData[field]);
    if (!isFormValid) {
      setPublishError('Please fill all the fields');
      return;
    }

    try {
      const res = await fetch("/api/employee/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setSuccessMessage("Employee created successfully"); // Set success message
        navigate(`/employees}`);      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [id]: value
  //   }));
  // };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Add an Employee
      </h1>
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Enter Secret Key"
            required
            id="secreteKey"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, secreteKey: e.target.value })}
          />
          <Select
            defaultValue="uncategorized"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="uncategorized">Select a user category</option>
            <option value="fabricSupplier">Fabric Suppliers</option>
            <option value="chemicalSupplier">Chemical Suppliers</option>
            <option value="fiberSupplier">Fiber Suppliers</option>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            placeholder="Register Number"
            id="registerNumber"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={(e) => setFormData({ ...formData, registerNumber: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="Username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <TextInput
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextInput
            type="text"
            placeholder="Phone Number"
            id="phoneNumber"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-blue-500"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        <Button type="submit" className="bg-blue-500">
          Create a User
        </Button>
        {publishError && <Alert className="mt-5" color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}