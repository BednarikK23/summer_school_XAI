import "./selectInput.css";

interface selectInputProps {
    name: string,
    register: any;
    label?: string;
    errorMessage?: string;
    options: string[];
}

const SelectInput = ({name, register, label, errorMessage, options}: selectInputProps) => {
    return (
        <div className="form-select-container">
            <label>{label}</label>
            <select className="form-select-container__select" {...register(name)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {errorMessage && <span className="form-select-container__error">{errorMessage}</span>}
        </div>
    );
};

export default SelectInput;