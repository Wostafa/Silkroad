import app from './App'
import { collection, addDoc, getFirestore, DocumentData, doc, setDoc, getDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

export const db = getFirestore(app);

interface Product {
  key: string,
  name: string,
  price: number,
  image: string,
  category: string,
  description: string,
}

export async function addData(product: Product):Promise<void>{
  const userId = getAuth().currentUser?.uid as string;
  // return await addDoc(collection(db, "users", ''), {...product});
  // const addProduct = await addDoc(collection(db, "users", ''), {...product});
  return await setDoc(doc(db, "users", userId, 'products', product.key), {...product});
}

// async function pp(){
//   const userId = auth.currentUser?.uid as string;
//   const ref = doc(db, "users", userId)
// }

// export function readData()

