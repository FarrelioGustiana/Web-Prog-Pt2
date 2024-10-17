import googleImg from "@assets/images/google.png";
import facebookImg from "@assets/images/facebook.png";
import AuthInput from "@components/AuthInput";

type AuthFormProps = {
	type: string;
	username?: string;
	setUsername?: React.Dispatch<React.SetStateAction<string>>;
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	reEnterPassword?: string;
	setReEnterPassword?: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	disabled: boolean;
	withGoogle: () => Promise<void>;
};

const AuthForm = ({
	type,
	username,
	setUsername,
	email,
	setEmail,
	password,
	setPassword,
	reEnterPassword,
	setReEnterPassword,
	handleSubmit,
	disabled,
	withGoogle,
}: AuthFormProps) => {
	return (
		<div className="flex flex-col">
			<form
				className="flex-col flex gap-2 justify-center items-center"
				onSubmit={handleSubmit}
			>
				{type === "register" && (
					<AuthInput
						value={username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUsername?.(e.target.value)
						}
						placeholder="Username"
						type="text"
						autoComplete="new-username"
					/>
				)}
				<AuthInput
					placeholder="Email"
					type="email"
					value={email}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					autoComplete="new-email"
				/>
				<AuthInput
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					autoComplete="new-password"
				/>
				{type === "register" && (
					<AuthInput
						placeholder="Re-enter your password"
						type="password"
						value={reEnterPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setReEnterPassword?.(e.target.value)
						}
						autoComplete="new-password"
					/>
				)}
				<button
					className="mt-6 bg-fourth text-white font-medium px-6 py-3 rounded-full shadow-[1px_2px_4px_3px_rgba(0,0,0,0.2)] capitalize cursor-pointer disabled:cursor-not-allowed hover:bg-thrid transition-all"
					disabled={disabled}
				>
					{type === "register" ? "create" : "login"}
				</button>
			</form>

			<div className="flex flex-col gap-3 justify-center items-center">
				<div className="flex justify-center items-center gap-2 mt-7">
					<div className="h-[3px] w-[90px] bg-black rounded-full"></div>
					<p className="font-bold text-center capitalize">
						Or {type === "register" ? "sign up" : "sign in"} with:
					</p>
					<div className="h-[3px] w-[90px] bg-black rounded-full"></div>
				</div>

				<div className="flex justify-center gap-x-3">
					<button
						onClick={withGoogle}
						className="py-2 px-6 border-solid border-[1px] border-slate-300 rounded-full shadow-[0.5px_2px_5px_2px_rgba(0,0,0,0.3)] cursor-pointer disabled:cursor-not-allowed"
						disabled={disabled}
					>
						<img src={googleImg} className="w-6 h-6" />
					</button>
					<button
						className="py-2 px-6 border-solid border-[1px] border-slate-300 rounded-full shadow-[0.5px_2px_5px_2px_rgba(0,0,0,0.3)] cursor-pointer disabled:cursor-not-allowed"
						disabled={disabled}
					>
						<img src={facebookImg} className="w-6 h-6" />
					</button>
				</div>
			</div>
		</div>
	);
};
export default AuthForm;
