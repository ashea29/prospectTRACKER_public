import './FormInput.css'


interface FormInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  type: undefined;
  onChange: () => void;
  onBlur: () => void;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  // console.log(props);
  return (
    <div>
      <div>
        <div>
          <h3 
            className="form-input-label"
          >
            {props.placeholder}
          </h3>
          <input 
            id={props.id} 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            type={props.type}
          >
          </input>
        </div>
      </div>
    </div>
    
  );
};

export default FormInput;

