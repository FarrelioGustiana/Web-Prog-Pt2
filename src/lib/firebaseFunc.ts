import { auth, db, googleProvider } from "@/config/firebase";
import {
	createUserWithEmailAndPassword,
	getAdditionalUserInfo,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

/** ********SOME REGISTER FUNCTIONS********  */
export const signUp = async (
	username: string,
	email: string,
	password: string
): Promise<void> => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);

		await setDoc(doc(db, "users", res.user.uid), {
			username,
			email,
			id: res.user.uid,
		});

		await setDoc(doc(db, "userCarts", res.user.uid), {
			carts: [],
		});
	} catch (error) {
		throw error;
	}
};

export const signUpWithGoogle = async (): Promise<void> => {
	try {
		const res: UserCredential = await signInWithPopup(auth, googleProvider);

		const additionalInfo = getAdditionalUserInfo(res);
		if (additionalInfo?.isNewUser) {
			await setDoc(doc(db, "users", res.user.uid), {
				username: res.user.displayName,
				email: res.user.email,
				id: res.user.uid,
			});

			await setDoc(doc(db, "userCarts", res.user.uid), {
				carts: [],
			});
		} else {
			auth.signOut();
			throw new Error("Email is already registered");
		}
	} catch (error) {
		throw error;
	}
};

/** SOME LOGIN FUNCTIONS  */
export const signIn = async (
	email: string,
	password: string
): Promise<string> => {
	try {
		const res: UserCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const userSnap = await getDoc(doc(db, "users", res.user.uid));
		const userInfo = userSnap.data();

		return userInfo?.username;
	} catch (error) {
		throw error;
	}
};

export const signInWithGoogle = async (): Promise<string> => {
	try {
		const res: UserCredential = await signInWithPopup(auth, googleProvider);

		const additionalInfo = getAdditionalUserInfo(res);
		if (additionalInfo?.isNewUser) {
			res.user.delete();
			throw new Error("Email has not been registered!");
		} else {
			const userSnap = await getDoc(doc(db, "users", res.user.uid));
			const userInfo = userSnap.data();

			return userInfo?.username;
		}
	} catch (error) {
		throw error;
	}
};
