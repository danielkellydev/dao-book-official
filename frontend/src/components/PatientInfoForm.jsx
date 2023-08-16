import Button from "../atoms/Button";
import MemoFormInput from "../molecules/FormInput";

function PatientInfoSubform({
  handleChange,
  handleSubmit,
  formData,
  isInitialConsult,
  isSaved,
}) {
  let buttonText = isInitialConsult ? "Next" : "Save";
  let buttonDisabled = false;
  if (isSaved) {
    buttonText = "Saved!";
    buttonDisabled = true;
  }

  return (
    <form
      className="px-15 flex max-w-2xl flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h2 className="w-[700px] text-4xl">Patient Profile</h2>
      <MemoFormInput
        type="text"
        name="firstName"
        labelText="First Name"
        placeholderText="Susan"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["firstName"]}
      ></MemoFormInput>
      <MemoFormInput
        type="text"
        name="lastName"
        labelText="Last Name"
        placeholderText="Reynolds"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["lastName"]}
      ></MemoFormInput>
      <MemoFormInput
        type="email"
        name="email"
        labelText="Email"
        placeholderText="susan@example.com"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["email"]}
      ></MemoFormInput>
      <MemoFormInput
        type="date"
        name="dateOfBirth"
        labelText="Date of Birth"
        isRequired={true}
        onChange={handleChange}
        defaultValue={formData["dateOfBirth"]}
      ></MemoFormInput>
      <MemoFormInput
        type="text"
        name="phoneNumber"
        labelText="Phone Number"
        placeholderText="0401 234 567"
        onChange={handleChange}
        defaultValue={formData["phoneNumber"]}
      ></MemoFormInput>
      <MemoFormInput
        type="textArea"
        name="medications"
        labelText="Medications"
        placeholderText=""
        onChange={handleChange}
        defaultValue={formData["medications"]}
      ></MemoFormInput>
      <MemoFormInput
        type="textArea"
        name="healthHistory"
        labelText="Health history"
        placeholderText=""
        onChange={handleChange}
        defaultValue={formData["healthHistory"]}
      ></MemoFormInput>
      <Button
        theme="light"
        isFullWidth={true}
        buttonText={buttonText}
        buttonDisabled={buttonDisabled}
      ></Button>
    </form>
  );
}

export default PatientInfoSubform;
