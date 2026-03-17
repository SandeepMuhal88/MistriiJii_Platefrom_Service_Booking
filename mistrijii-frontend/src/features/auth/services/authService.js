import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export const logoutUser = async () => {
  await signOut(auth);
};