import app from './App'
import { nanoid } from 'nanoid/non-secure';
import { addData } from './Database';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

interface FormData {
  name: string;
  price: number;
  category: string;
  image: FileList;
  description: string;
}

export async function Upload(data: FormData): Promise<string> {

  const imageFile = data.image['0'];
  const fileType = imageFile.name.split('.').pop();
  const fileName = nanoid();
  const storageRef = ref(storage, `products/${data.category}/${fileName}.${fileType ?? 'unknown'}`);

  return await new Promise<string>((resolve, reject) => {
    uploadBytes(storageRef, imageFile).then((snapshot) => {
      console.log(`${imageFile.name} Uploaded `, snapshot);

      getDownloadURL(snapshot.ref).then((url) => {
        console.log('URL: ', url);

        addData({
          ...data,
          key: nanoid(8),
          image: url,
        }).then(result => {
          console.log('Data added to Database: ', result);
          resolve('Upload & Download URL & Add to Database OK');
        }).catch(e => {
          console.log('Fail to add to database ', e);
        })

      }).catch((e) => {
        console.log('Fail to get download URL ', e);
      })

    }).catch((e) => {
      console.log('Fail to upload ', e)
      reject(new Error('Upload or Download URL Failed'))
    });


  });
}

