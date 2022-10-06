import app from './App'
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
  return await setDoc(doc(db, "users", userId, 'products', product.key), {...product});
}


