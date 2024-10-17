import { signUp, signUpWithGoogle } from "@/lib/firebaseFunc";
import AuthForm from "@components/AuthForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [reEnterPassword, setReEnterPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const register = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		if (
			username.trim() === "" ||
			email.trim() === "" ||
			reEnterPassword.trim() === "" ||
			password.trim() === ""
		) {
			toast.warning("Fill the form correctly");
			return;
		}
		if (password !== reEnterPassword) {
			toast.warning("Passwords don't match");
			return;
		}

		setIsLoading(true);

		toast.promise(() => signUp(username, email, password), {
			loading: "Please wait....",
			success: () => {
				navigate("/");
				return `Account Created! Welcome to BlueShop ${username}!`;
			},
			error: (err: Error) => {
				if (
					err.message ===
					"Firebase: Error (auth/email-already-in-use)."
				) {
					return "Email already registered";
				}
				return err.message;
			},
			finally: () => {
				setIsLoading(false);
			},
		});
	};

	const registerWithGoogle = async (): Promise<void> => {
		setIsLoading(true);
		toast.promise(signUpWithGoogle, {
			loading: "Please wait....",
			success: () => {
				"Account Created!";
				return "Account Created!";
			},
			error: (err: Error) => err.message,
			finally: () => setIsLoading(false),
		});
	};

	return (
		<div className="relative flex flex-col items-center justify-center p-2 py-10">
			<div className="title-container flex justify-center items-center flex-col gap-4">
				<h1 className="title font-bold text-2xl tracking-[2px]">
					BLUESHOP.COM
				</h1>
				<p className="font-bold text-lg">Welcome!</p>
			</div>

			<div className="mt-2 flex flex-col items-center">
				<p className="font-bold mb-2">Create your account</p>
				<AuthForm
					type="register"
					username={username}
					setUsername={setUsername}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					setReEnterPassword={setReEnterPassword}
					reEnterPassword={reEnterPassword}
					handleSubmit={register}
					disabled={isLoading}
					withGoogle={registerWithGoogle}
				/>
			</div>

			<p className="mt-6">
				Already have account?{" "}
				<Link to="/login" className="text-sky-800 underline">
					Sign In here!
				</Link>
			</p>
		</div>
	);
};
export default SignUp;
