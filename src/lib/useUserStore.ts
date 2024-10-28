import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

export type User = {
	username: string;
	id: string;
	email: string;
	isAdmin?: boolean;
	avatar?: string;
};

export type UserStoreState = {
	currentUser: User | null;
	isLoading: boolean;
	fetchUserInfo: (uid: string) => Promise<void>;
};

const useUserStore = create<UserStoreState>((set) => ({
	currentUser: null,
	isLoading: true,
	fetchUserInfo: async (uid: string) => {
		if (!uid) return set({ currentUser: null, isLoading: false });

		try {
			const docRef = doc(db, "users", uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				set({
					currentUser: docSnap.data() as User,
					isLoading: false,
				});
			} else {
				set({ currentUser: null, isLoading: false });
			}
		} catch (error) {
			console.log(error);
			set({ currentUser: null, isLoading: false });
		}
	},
}));

export default useUserStore;
