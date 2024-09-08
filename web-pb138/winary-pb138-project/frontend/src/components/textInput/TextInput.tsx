import "./textInput.css";

interface textInputProps {
    name: string,
    register: any;
    label?: string;
    errorMessage?: string;
    type?: string;
}

const TextInput = ({name, register, label, errorMessage, type}: textInputProps) => {
    return (
        <div className="form-input-container">
            <label>{label}</label>
            <input className="form-input-container__input" type={type ?? "text"} {...register(name)} />
            {errorMessage && <span className="form-input-container__error">{errorMessage}</span>}
      </div>
    );
};

export default TextInput;