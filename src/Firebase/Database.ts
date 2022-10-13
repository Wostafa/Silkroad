import app from './App'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import type { Product } from '../Constants';

export const db = getFirestore(app);

export async function addData(product: Product):Promise<void>{
  const userId = getAuth().currentUser?.uid as string;
  return await setDoc(doc(db, "users", userId, 'products', product.key), {...product});
}


