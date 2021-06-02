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
        <div className='input-container'>
          <div 
            className='form-input-label'
          >
            {props.placeholder}
          </div>
          <input 
            id={props.id}
            className='form-input' 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            type={props.type}
          >
          </input>
    </div>
    
  );
};

export default FormInput;

