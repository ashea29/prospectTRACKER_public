import './FormSubmit.css'

interface FormSubmitProps {
  submitButtonText: string
  cancelButtonText: string
  cancelNav: () => void
  conditional: boolean
}

const FormSubmit: React.FC<FormSubmitProps> = ({ conditional, submitButtonText }) => {
  return (
    <div id="submit_container">
     <button className="submit-button"
        type="submit"
        disabled={conditional}
      >
        {submitButtonText}
      </button>
    </div>
  );
};

export default FormSubmit;
