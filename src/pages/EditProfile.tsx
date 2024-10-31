import React, { useEffect, useState } from "react";
import { User as UserIcon, MapPin, Camera, Loader2 } from "lucide-react";
import useUserStore, { User } from "@lib/useUserStore";
import { useNavigate } from "react-router";
import InputField from "@components/editProfile/InputField";
import { updateUser } from "@lib/firebaseFunc";
import { auth } from "@/config/firebase";

// New InputField component

const EditProfile = () => {
	const { currentUser, fetchUserInfo } = useUserStore();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState<User>({
		username: "",
		id: "",
		email: "",
		isAdmin: false,
		avatar: "",
		location: "",
	});

	console.log(profile);

	useEffect(() => {
		if (currentUser) {
			setProfile((prev) => ({
				...prev,
				...currentUser,
			}));
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await updateUser(profile);
			fetchUserInfo(auth.currentUser?.uid as string);
			navigate("/profile");
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setProfile((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="min-h-screen bg-[#fafafa]">
			<div className="container mx-auto px-4 py-8">
				<form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
					{/* Avatar Section */}
					<div className="mb-8 flex flex-col items-center">
						<div className="relative">
							{profile?.avatar ? (
								<img
									src={
										profile.avatar instanceof File
											? URL.createObjectURL(
													profile.avatar
											  )
											: (profile.avatar as string)
									}
									alt={profile.username}
									className="w-32 h-32 rounded-full border-4 border-[#E8F1F5] shadow-lg object-cover"
								/>
							) : (
								<div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-[#E8F1F5] shadow-lg">
									<UserIcon className="h-16 w-16 text-[#005691]" />
								</div>
							)}
							<label
								htmlFor="avatar-upload"
								className="absolute bottom-0 right-0 bg-yy[#005691] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-[#004a7c] transition-colors"
							>
								<Camera className="w-5 h-5" />
								<input
									id="avatar-upload"
									type="file"
									className="hidden"
									accept="image/*"
									onChange={(e) =>
										setProfile({
											...profile,
											avatar: e.target.files?.[0],
										})
									} // Update handleChange to handle file input
								/>
							</label>
						</div>
					</div>

					{/* Form Fields */}
					<div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-[#E8F1F5]">
						<InputField
							placeholder="Your username"
							label="Username"
							type="text"
							id="username"
							name="username"
							value={profile?.username}
							onChange={handleChange}
							required
						/>
						<InputField
							placeholder="Your email address"
							label="Email Address"
							type="email"
							id="email"
							name="email"
							value={profile?.email as string}
							disabled
							onChange={handleChange}
							required
						/>
						<InputField
							label={
								<>
									<MapPin className="w-4 h-4 mr-1" /> Location
								</>
							}
							type="text"
							id="location"
							name="location"
							value={profile?.location as string}
							placeholder="Your address"
							onChange={handleChange}
						/>

						<div className="flex justify-end space-x-4 pt-4 border-t border-[#E8F1F5]">
							<button
								type="button"
								onClick={() => navigate("/profile")}
								className="px-6 py-2 border border-[#005691] text-[#005691] rounded-md hover:bg-[#E8F1F5] transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isLoading}
								className="px-6 py-2 bg-[#005691] text-white rounded-md hover:bg-[#004a7c] transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
							>
								{isLoading ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Saving...
									</>
								) : (
									"Save Changes"
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
