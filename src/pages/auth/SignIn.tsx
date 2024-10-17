import { signIn, signInWithGoogle } from "@/lib/firebaseFunc";
import AuthForm from "@components/AuthForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const login = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		setIsLoading(true);

		toast.promise(() => signIn(email, password), {
			loading: "Please Wait....",
			success: (username: string) => {
				setEmail("");
				setPassword("");
				navigate("/home");
				return `Login Succeed! Welcome back ${username.split(" ")[0]}!`;
			},
			error: (err: Error) => err.message,
			finally: () => {
				setIsLoading(false);
				setTimeout(() => toast.dismiss(this), 1000);
			},
		});
	};

	const loginWithGoogle = async (): Promise<void> => {
		setIsLoading(true);
		toast.promise(signInWithGoogle, {
			loading: "Please Wait....",
			success: (username: string) => {
				navigate("/");
				return `Login Succeed! Welcome back ${username.split(" ")[0]}!`;
			},
			error: (err: Error) => err.message,
			finally: () => setIsLoading(false),
		});
	};

	return (
		<div className="relative flex flex-col items-center p-2 py-20">
			<div className="title-container flex justify-center items-center flex-col gap-4">
				<h1 className="title font-bold text-2xl tracking-[2px]">
					BLUESHOP.COM
				</h1>
				<p className="font-bold text-lg">Welcome!</p>
			</div>

			<div className="mt-5 flex flex-col items-center">
				<div>
					<p className="font-bold mb-2">Login to Your Account</p>
				</div>
				<AuthForm
					type="login"
					handleSubmit={login}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					disabled={isLoading}
					withGoogle={loginWithGoogle}
				/>
			</div>

			<p className="mt-6 text-center">
				Don't have account?{" "}
				<Link to="/register" className="text-sky-800 underline">
					Sign Up here!
				</Link>
				<br /> or{" "}
				<Link to="/" className="text-sky-800 underline">
					forgot password?
				</Link>
			</p>
		</div>
	);
};
export default SignIn;
