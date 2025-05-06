import { Button } from "../ui/button";
import FormControls from "./form-controls";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
  loading = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        disabled={isButtonDisabled || loading}
        type="submit"
        className="mt-5 w-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          buttonText || "Submit"
        )}
      </Button>
    </form>
  );
}

export default CommonForm;
