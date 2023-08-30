import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import MemoFormInput from "../molecules/FormInput";
import React from "react";

function ConsultForm({
  handleSubmit,
  handleChange,
  formData,
  setFormData,
  isSaved,
  isDisabled,
}) {
  const actionButtonText = "Save";

  const [suggestions, setSuggestions] = React.useState([]);

  const chineseHerbs = ["Ai ye", "Bai zhi", "Bai zhu", "Ban xia", "Bo he"];

  function handleCompositionChange(e) {
    handleChange(e); // Call your existing handleChange function
    const value = e.target.value;
    console.log("Value: ", value)
    const filteredSuggestions = chineseHerbs.filter(herb => herb.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
  
    setFormData(prevState => ({
        ...prevState,
        composition: value
    }));
  }

function selectSuggestion(herb) {
  console.log("Selected herb: ", herb)
  setSuggestions([]); // Clear suggestions

  // Update the value of the composition input to the selected herb
  // Assuming you have a state named formData and a function named setFormData for updating it:
  setFormData(prevState => ({
      ...prevState,
      composition: herb
  }));
}

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
        <div className="autocomplete-suggestions relative z-10">
          {suggestions.map(herb => (
            <div 
              key={herb} 
              onClick={() => selectSuggestion(herb)}
              className="cursor-pointer bg-white border p-2 hover:bg-gray-100"
            >
              {herb}
            </div>
          ))}
        </div>
        <MemoFormInput
          type="textArea"
          name="composition"
          labelText="Composition"
          onChange={handleCompositionChange}
          value={formData.composition}
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
