import { ref } from 'firebase/storage'
import { useEffect, useState } from 'react';
import { storage } from './config/fb-config';
import { getDownloadURL, listAll } from 'firebase/storage';

function DisplayImage({filename}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try{
        const listRef = await listAll(ref(storage, 'images'));
        const fileRef = listRef.items.find(item => item.name === filename);
        const tempurl = await getDownloadURL(fileRef);
        setUrl(tempurl)
      }catch(e){
          console.log(e.message)
      }
    };
    fetchImage();
  }, [filename]);

  return (
    <>
      <h4>Displaying Image</h4>
      <img src={url} alt="not found" width={300} height={200}/>
    </>
  );
}

export default DisplayImage;