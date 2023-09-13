import Button from "../atoms/Button";
import TextLink from "../atoms/TextLink";
import MemoFormInput from "../molecules/FormInput";
import React from "react";
import { useState, useEffect } from "react";


// Functions

function HerbSuggestion({ herb, onSelect }) {
  console.log(`Rendering suggestion: ${herb.name}`)
  return (
    <div onClick={() => onSelect(herb)}>
      {herb.name}
    </div>
  );
}

function HerbInput({ onHerbSelect }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // You'll have your logic to fetch/update suggestions based on the input value
  useEffect(() => {
    // Fetch or filter herb suggestions based on the input value
    // For now, I'm just using a mock list
    const mockSuggestions = ['Rosemary', 'Basil', 'Thyme'].filter(herb => herb.toLowerCase().includes(input.toLowerCase()));
    setSuggestions(mockSuggestions);
    console.log(mockSuggestions);
  }, [input]);

  return (
    <div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Enter herb name"
      />
      <div>
        {suggestions.map(herb => (
          <HerbSuggestion 
            key={herb}
            herb={{ name: herb }}
            onSelect={(selectedHerb) => {
              setInput('');
              onHerbSelect(selectedHerb);
            }} 
          />
        ))}
      </div>
    </div>
  );
}

function GramInput({ onGramSubmit, grams, setGrams }) {
  return (
    <input
      value={grams}
      placeholder="Enter grams"
      onChange={e => setGrams(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter' && grams) {
          onGramSubmit(grams);
          setGrams('');
        }
      }}
    />
  );
}

function SelectedHerbsDisplay({ herbs }) {
  return (
    <div className="composition-input">
      {herbs.map(herb => (
        <div key={herb.name} className="selected-herb">
          {herb.name} - {herb.grams} grams
        </div>
      ))}
    </div>
  );
}

function HerbComposer({ onHerbSelection }) {
  const [selectedHerbs, setSelectedHerbs] = useState([]);
  const [currentHerb, setCurrentHerb] = useState('');
  const [grams, setGrams] = useState('');

  const handleHerbSelect = (herb) => {
    setCurrentHerb(herb.name);
  };

  const handleGramSubmit = (gramValue) => {
    onHerbSelection(currentHerb, gramValue); 
    setSelectedHerbs(prev => [...prev, { name: currentHerb, grams: gramValue }]);
    setCurrentHerb('');
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
    <SelectedHerbsDisplay herbs={selectedHerbs} />
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

  const handleHerbSelection = (herbName, herbGrams) => {
    const newComposition = `${formData.composition} ${herbName} - ${herbGrams}g; `;
    setFormData(prevState => ({
      ...prevState,
      composition: newComposition
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
        <HerbComposer onHerbSelection={handleHerbSelection} />
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
