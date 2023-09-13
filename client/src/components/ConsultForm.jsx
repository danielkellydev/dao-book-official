import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import MemoFormInput from "../molecules/FormInput";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// Functions

function RequiredLabel() {
  return <span> * (required)</span>;
}

function HerbSuggestion({ herb, onSelect }) {
  return (
    <div
      onClick={() => onSelect(herb)}
      className="m-1 cursor-pointer rounded-lg border px-1 py-1 text-sm hover:bg-gray-200"
    >
      {herb.pinyinName}
    </div>
  );
}

function HerbInput({ onHerbSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (input.length >= 2) {
      // Ensure at least two characters have been typed
      fetch("/herbs.json")
        .then((response) => response.json())
        .then((data) => {
          // Filter herb suggestions based on the input value
          const filteredSuggestions = data.filter(
            (herb) =>
              herb.pinyinName.toLowerCase().startsWith(input.toLowerCase()) ||
              herb.abbreviation.toLowerCase().startsWith(input.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        })
        .catch((error) => {
          console.error("There was an error fetching the herbs list:", error);
        });
    } else {
      setSuggestions([]); // Clear suggestions if less than two characters are typed
    }
  }, [input]);

  return (
    <div>
      <input
        className="mb-1 w-[325px] rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 placeholder:text-[#DFDFDF]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter herb name (Pinyin) or abbreviation"
      />
      <div className="flex flex-wrap">
        {suggestions.map((herb) => (
          <HerbSuggestion
            key={herb.pinyinName}
            herb={herb}
            onSelect={(selectedHerb) => {
              setInput("");
              onHerbSelect(selectedHerb);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function GramInput({ onGramSubmit, grams, setGrams }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <input
      className="rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 placeholder:text-[#DFDFDF]"
      ref={inputRef}
      value={grams}
      placeholder="Enter grams"
      onChange={(e) => setGrams(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && grams) {
          onGramSubmit(grams);
          setGrams("");
        }
      }}
    />
  );
}

function HerbComposer({ onHerbSelection }) {
  const [selectedHerbs, setSelectedHerbs] = useState([]);
  const [currentHerb, setCurrentHerb] = useState("");
  const [grams, setGrams] = useState("");

  const handleHerbSelect = (herb) => {
    setCurrentHerb(herb.pinyinName);
  };

  const handleGramSubmit = (gramValue) => {
    onHerbSelection(currentHerb, gramValue);
    setSelectedHerbs((prev) => [
      ...prev,
      { name: currentHerb, grams: gramValue },
    ]);
    setCurrentHerb("");
  };

  return (
    <div>
      {currentHerb ? (
        <GramInput
          onGramSubmit={handleGramSubmit}
          grams={grams}
          setGrams={setGrams}
        />
      ) : (
        <HerbInput onHerbSelect={handleHerbSelect} />
      )}
    </div>
  );
}

function ConsultForm({
  handleSubmit,
  handleChange,
  formData,
  setFormData,
  isSaved,
  isDisabled,
}) {
  const actionButtonText = "Save";
  const [showTooltip, setShowTooltip] = useState(false);

  const showDelay = useRef(null);
  const hideDelay = useRef(null);

  const handleMouseOver = () => {
    if (hideDelay.current) {
        clearTimeout(hideDelay.current);
    }
    showDelay.current = setTimeout(() => {
        setShowTooltip(true);
    }, 200); // 200ms delay before tooltip appears
  }

  const handleMouseOut = () => {
    if (showDelay.current) {
        clearTimeout(showDelay.current);
    }
    hideDelay.current = setTimeout(() => {
        setShowTooltip(false);
    }, 200); // 200ms delay before tooltip disappears
  }

  const handleHerbSelection = (herbName, herbGrams) => {
    const newComposition = `${formData.composition} ${herbName} - ${herbGrams}g; `;
    setFormData((prevState) => ({
      ...prevState,
      composition: newComposition,
    }));
  };

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
        <h2 className="block pb-2 text-xl">
          Composition <RequiredLabel />
        </h2>
        <HerbComposer onHerbSelection={handleHerbSelection} />
        <MemoFormInput
          type="textArea"
          name="composition"
          labelText=""
          onChange={handleChange}
          value={formData.composition}
          isRequired={false}
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

        <div className="relative mb-2 flex items-center">
          {/* Label and Tooltip Icon */}
          <div className="mr-4 flex items-center">
            <label className="mr-1">Email prescription & lifestyle notes</label>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="ml-1 cursor-pointer text-sm" // Adjusted margin and added text-sm for size
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={{ fontSize: "1rem" }} // Adjust font size as needed
            />
            {showTooltip && (
              <div
                className="absolute mt-2 rounded border bg-white p-1 text-xs text-black shadow-lg"
                style={{
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }} // Adjusted positioning
              >
                Checking this box will email the prescription & lifestyle notes
                to the patient.
              </div>
            )}
          </div>

          {/* Checkbox */}
          <MemoFormInput
            type="checkbox"
            name="sendEmail"
            onChange={handleChange}
          />
        </div>
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
