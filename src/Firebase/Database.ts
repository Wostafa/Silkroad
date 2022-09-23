import app from './App'
import { collection, addDoc, getFirestore, DocumentData } from "firebase/firestore";

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
  return await addDoc(collection(db, "users"), {...product});
}

// export function readData()