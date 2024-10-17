const AuthInput = ({ ...props }) => {
	return (
		<div className="relative flex items-center justify-center">
			<div className="shadow-[3px_2px_4px_1px_rgba(0,0,0,0.2)] mr-[-12%] relative z-10 h-[70px] w-[70px] bg-slate-300 rounded-full"></div>
			<input
				{...props}
				className="bg-slate-300 rounded-full py-3 px-3 pl-12 shadow-[3px_2px_4px_1px_rgba(0,0,0,0.2)] outline-none"
			/>
		</div>
	);
};
export default AuthInput;
