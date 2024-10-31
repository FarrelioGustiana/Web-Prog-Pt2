import { auth, db, googleProvider, storage } from "@/config/firebase";
import { User } from "@lib/useUserStore";
import {
	createUserWithEmailAndPassword,
	getAdditionalUserInfo,
	signInWithEmailAndPassword,
	signInWithPopup,
	UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// REGISTER FUNCTIONS
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

		// await addDoc(collection(db, `users/${res.user.uid}/userCarts`), {
		// 	userCarts: [],
		// });
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

			// await setDoc(doc(db, "userCarts", res.user.uid), {
			// 	carts: [],
			// });
		} else {
			auth.signOut();
			throw new Error("Email is already registered");
		}
	} catch (error) {
		throw error;
	}
};

// LOGIN FUNCTIONS
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

// UPDATE USER

export const updateUser = async (user: User) => {
	let avatarUrl = user.avatar; // Keep the original avatar URL

	// Check if a new avatar is uploaded
	if (user.avatar instanceof File) {
		const avatarRef = ref(storage, `user/${user.id}`); // Create a reference for the avatar
		await uploadBytes(avatarRef, user.avatar); // Upload the avatar
		avatarUrl = await getDownloadURL(avatarRef); // Get the download URL
	}

	// Update user user in Firestore
	await updateDoc(doc(db, "users", user.id), {
		...user,
		avatar: avatarUrl, // Update avatar URL
	});
};
