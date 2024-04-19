import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateEmployee() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { employeeId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employee/getemployees?employeeId=${employeeId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) { // Check if employee data is not empty
          setPublishError(null);
          setFormData(data.employee[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmployee(); // Move fetchEmployee function outside of try-catch block

  }, [employeeId]); // Close useEffect dependency array with square brackets

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
    try {
      const res = await fetch(`/api/employee/updateemployee/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
        navigate(`/employee/${formData._id}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Employee</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Enter Secret Key'
            required
            id='secreteKey'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, secreteKey: e.target.value })}
            value={formData.secreteKey}
          />
          <Select
            defaultValue='uncategorized'
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category}
          >
            <option value='uncategorized'>Select a user category</option>
            <option value='operator'>Operator</option>
            <option value='supervisor'>Supervisor</option>
            <option value='textileArtist'>Textile Artist</option>
          </Select>
        </div>
        {/* Additional input fields */}
        <div className='flex flex-col gap-4'>
          <TextInput
            type='text'
            placeholder='Register Number'
            id='registerNumber'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={(e) => setFormData({ ...formData, registerNumber: e.target.value })}
            value={formData.registerNumber}
          />
          <TextInput
            type='text'
            placeholder='Username'
            id='username'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            value={formData.username}
          />
          <TextInput
            type='email'
            placeholder='Email'
            id='email'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
          />
          <TextInput
            type='text'
            placeholder='Phone Number'
            id='phoneNumber'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            value={formData.phoneNumber}
          />
        </div>
        {/* File input for image upload */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            className='bg-blue-500'
            size='sm'
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
        {/* Submit button */}
        <Button type='submit' className='bg-blue-500'>
          Update Employee
        </Button>
        {/* Error alert */}
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}
