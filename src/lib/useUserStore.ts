import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

type Product = {
	id: number;
	name: string;
	price: number;
	image: string | File;
};

export type User = {
	username: string;
	id: string;
	email: string;
	isAdmin?: boolean;
	avatar?: string | File;
	location?: string;
	products?: Product[];
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
			set({ currentUser: null, isLoading: false });
			throw error as Error;
		}
	},
}));

export default useUserStore;
