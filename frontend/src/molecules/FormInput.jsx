import React from "react";
/**
 @typedef formInputProps
 @type {Object}
 @property {'text' | 'number' | 'email' | 'password' | 'date' | 'textarea' | 'checkbox'} type 
 @property {React.Dispatch<SetStateAction<string>>} setInputValue
 @property {string} labelText 
 @property {string} placeholderText 
 @property {boolean} doesAutocomplete 
 @property {boolean} isRequired 
 */

/**
 * @param {formInputProps} props
 */
function FormInput({
  type,
  name,
  onChange,
  labelText,
  placeholderText,
  doesAutocomplete,
  isRequired,
  defaultValue,
  defaultChecked,
}) {
  const formIsTextArea = type === "textArea";
  const formIsCheckbox = type === "checkbox";

  if (formIsCheckbox) {
    return (
      <div className="flex items-center gap-4">
        <input
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          defaultChecked={defaultChecked}
          className="h-4 w-4 border-[#DFDFDF]"
        ></input>
        <label
          className="text-xl"
          htmlFor={name}
        >
          {labelText}
        </label>
      </div>
    );
  }

  return (
    <div>
      <label
        className="block pb-2 text-xl"
        htmlFor={name}
      >
        {labelText}
        {isRequired && "* (required)"}
      </label>
      {formIsTextArea ? (
        <textarea
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholderText}
          autoComplete={doesAutocomplete}
          required={isRequired}
          defaultValue={defaultValue}
          className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholderText}
          autoComplete={doesAutocomplete}
          required={isRequired}
          defaultValue={defaultValue}
          className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
        ></input>
      )}
    </div>
  );
}

const MemoFormInput = React.memo(FormInput);

export default FormInput;

export { MemoFormInput };
