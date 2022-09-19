import Config from './Config'
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const app = initializeApp(Config);
const db = getFirestore(app);

interface Product {
  name: string,
  price: number,
  image: string,
  category: string,
  description: string,
}

async function addData(product: Product): Promise<any>{
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...product
    });
    console.log("Document written with ID: ", docRef.id);
  } 
  catch (e) {
    console.error("Error adding document: ", e);
  }

}
// addData().then(
//   (result)=>{},
//   (error)=> {
//     console.log(error);
//   }
//   );