import Config from './Config'
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, DocumentData } from "firebase/firestore";

const app = initializeApp(Config);
const db = getFirestore(app);

interface Product {
  key: string,
  name: string,
  price: number,
  image: string,
  category: string,
  description: string,
}

export async function addData(product: Product):Promise<DocumentData>{
  return await new Promise((resolve, reject)=>{
    addDoc(collection(db, "users"), {
      ...product
    }).then((result)=>{
      resolve(result);
      console.log("Data added to Database: ", result);

    }).catch((e)=>{
      console.error("Error adding to Database: ", e);
      reject(new Error('Failed to add data to Database'));
    })
  })

}
