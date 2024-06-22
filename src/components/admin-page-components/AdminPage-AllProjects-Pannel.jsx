import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import toast from 'react-hot-toast';

const AdminPageAllProjectsPannel = () => {
  const [imgUrl, setImgUrl] = useState('');

  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [per, setPerc] = useState(null);

  const allProjectsDataCollectionRef = collection(db, 'AllProjectsData');

  useEffect(() => {
    const uploadFile = () => {
      const uploadedImageName = new Date().getTime() + uploadedImage.name;
      const projectsPhotoFolderRef = ref(
        storage,
        `project-photos/${uploadedImageName}`
      );
      const uploadTask = uploadBytesResumable(
        projectsPhotoFolderRef,
        uploadedImage
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
    };
    uploadedImage && uploadFile();
  }, [uploadedImage]);

  const handleAddProjectData = async (e) => {
    e.preventDefault();
    const newProjectData = {
      title: newProjectTitle,
      description: newProjectDescription,
      img: imgUrl,
      startDate: startDate,
      endDate: endDate,
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(allProjectsDataCollectionRef, newProjectData);
      setNewProjectTitle('');
      setNewProjectDescription('');
      setStartDate('');
      setEndDate('');
      setUploadedImage(null);
      setPerc(null);
      toast.success('Project Added Successfully');
      document.getElementById('myForm').reset();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-xl text-center">Add Project</h2>
      {/* Adding Projects Data Form */}
      <form
        id="myForm"
        className="flex my-4 p-4  mx-auto flex-col gap-5 justify-center items-center bg-blue-100 text-black"
        onSubmit={handleAddProjectData}
      >
        <input
          type="text"
          required
          value={newProjectTitle}
          placeholder="Project Title"
          onChange={(e) => {
            setNewProjectTitle(e.target.value);
          }}
        />
        <textarea
          type="text"
          required
          placeholder="Project Description"
          value={newProjectDescription}
          onChange={(e) => {
            setNewProjectDescription(e.target.value);
          }}
        />
        <input
          type="text"
          required
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        <input
          type="text"
          required
          placeholder="End Date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <input
          type="file"
          required
          onChange={(e) => {
            setUploadedImage(e.target.files[0]);
          }}
        />
        {per}
        <img
          height={'200px'}
          width={'200px'}
          src={
            uploadedImage
              ? URL.createObjectURL(uploadedImage)
              : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
          }
          alt=""
        />
        <button
          disabled={per !== null && per < 100}
          className={`border-2 bg-green-100 px-4 ${per !== null && per < 100 ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AdminPageAllProjectsPannel;