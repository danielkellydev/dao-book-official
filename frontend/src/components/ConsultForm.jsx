import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import MemoFormInput from "../molecules/FormInput";

function ConsultForm({
  handleSubmit,
  handleChange,
  formData,
  isSaved,
  isDisabled,
}) {
  const actionButtonText = "Save";

  return (
    <div className="flex flex-col flex-wrap content-center justify-center gap-4">
      <form
        className="px-15 flex max-w-2xl flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <MemoFormInput
          type="date"
          name="sessionDate"
          labelText="Session date"
          onChange={handleChange}
          defaultValue={formData.sessionDate}
        ></MemoFormInput>
        <MemoFormInput
          type="text"
          name="mainComplaint"
          labelText="Main Complaint"
          onChange={handleChange}
          defaultValue={formData.mainComplaint}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="sessionNotes"
          labelText="Session notes"
          onChange={handleChange}
          defaultValue={formData.sessionNotes}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="tongue"
          labelText="Tongue"
          onChange={handleChange}
          defaultValue={formData.tongue}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="pulse"
          labelText="Pulse"
          onChange={handleChange}
          defaultValue={formData.pulse}
        ></MemoFormInput>
        <hr className="my-10" />
        <h2 className="w-[700px] text-3xl">Prescription</h2>
        <MemoFormInput
          type="text"
          name="formulaName"
          labelText="Formula name"
          onChange={handleChange}
          defaultValue={formData.formulaName}
          isRequired={true}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="composition"
          labelText="Composition"
          onChange={handleChange}
          defaultValue={formData.composition}
          isRequired={true}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="dosageAdministration"
          labelText="Dosage & administration"
          onChange={handleChange}
          defaultValue={formData.dosageAdministration}
          isRequired={true}
        ></MemoFormInput>
        <MemoFormInput
          type="textArea"
          name="lifestyleAdvice"
          labelText="Lifestyle notes"
          onChange={handleChange}
          defaultValue={formData.lifestyleAdvice}
          isRequired={true}
        ></MemoFormInput>
        <MemoFormInput
          type="checkbox"
          name="sendEmail"
          labelText="Email prescription & lifestyle notes"
          onChange={handleChange}
        ></MemoFormInput>
        {!isSaved ? (
          <Button
            theme="light"
            isFullWidth={true}
            buttonText={actionButtonText}
            buttonDisabled={isDisabled}
          ></Button>
        ) : (
          <p className="text-center font-bold">Saved!</p>
        )}
      </form>
      {isSaved ? (
        <TextLink
          linkText={"Return to Dashboard"}
          linkDestination={"/"}
          className={"mb-10 text-center"}
        ></TextLink>
      ) : (
        <div className="mb-10"></div>
      )}
    </div>
  );
}

export default ConsultForm;
