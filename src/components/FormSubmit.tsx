import './FormSubmit.css'

interface FormSubmitProps {
  submitButtonText: string
  cancelButtonText: string
  cancelNav: () => void
  conditional: boolean
}

const FormSubmit: React.FC<FormSubmitProps> = ({ conditional, submitButtonText, cancelButtonText, cancelNav }) => {
  return (
    <div className="ion-padding-top ion-margin-top ion-text-center">
    <div>
      <button className="submit-button-custom"
        type="submit"
        disabled={conditional}
        style={{ borderRadius: '50% !important' }}
      >
        {submitButtonText}
      </button>
      <button onClick={cancelNav}>
        {cancelButtonText}
      </button>
    </div>
  </div>
  );
};

export default FormSubmit;
