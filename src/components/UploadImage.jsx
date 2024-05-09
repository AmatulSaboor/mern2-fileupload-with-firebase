import { useState } from 'react';
import { storage } from './config/fb-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import DisplayImage from './DisplayImage';
import './UploadImage.css';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    setIsUploaded(false)
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setIsUploaded(true);
        });
      });
    }
  };

  return (
    <div>
      <p>Note: Don't forget to click Uplaod to save and view the image</p>
      <h4>Upload Image</h4>
      <input type="file" onChange={handleChange} /><br />
      <button onClick={handleUpload}>Upload</button>
      <br /><hr />
      {isUploaded && <DisplayImage filename ={file.name} />}
    </div>
  );
}

export default UploadImage;