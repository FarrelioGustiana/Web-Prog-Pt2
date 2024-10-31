type InputFieldProps = {
	label: React.ReactNode;
	type: string;
	id: string;
	name: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	required?: boolean;
	disabled?: boolean;
	placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
	label,
	type,
	id,
	name,
	value,
	onChange,
	required,
	disabled,
	placeholder,
}) => (
	<div>
		<label
			htmlFor={id}
			className="flex items-center text-sm font-medium text-[#004a7c] mb-2"
		>
			{label}
		</label>
		<input
			type={type}
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			className={`w-full px-4 py-2 rounded-md border border-[#E8F1F5] focus:outline-none focus:ring-2 focus:ring-[#005691] focus:border-transparent ${
				disabled ? "disabled:text-fourth cursor-not-allowed" : ""
			}`}
			required={required}
			disabled={disabled}
			placeholder={placeholder}
		/>
	</div>
);

export default InputField;
