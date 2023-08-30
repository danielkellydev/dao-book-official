import React, { useRef, useEffect } from "react";

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
  defaultValue
}) {
  const textareaRef = useRef(null);

  const handleTextAreaChange = (e) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const computed = window.getComputedStyle(textareaRef.current);
      const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                   + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
                   + textareaRef.current.scrollHeight;
  
      textareaRef.current.style.height = `${height}px`;
    }
    if (onChange && e) {
      onChange(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current && defaultValue) {
      const syntheticEvent = {
        target: textareaRef.current
      };
      handleTextAreaChange(syntheticEvent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <div>
      <label className="block pb-2 text-xl" htmlFor={name}>
        {labelText}
        {isRequired && " * (required)"}
      </label>
      {type === "textArea" ? (
        <textarea
          ref={textareaRef}
          id={name}
          name={name}
          onChange={handleTextAreaChange}
          placeholder={placeholderText}
          autoComplete={doesAutocomplete ? "on" : "off"}
          required={isRequired}
          defaultValue={defaultValue}
          className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF] resize-none overflow-hidden"
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholderText}
          autoComplete={doesAutocomplete ? "on" : "off"}
          required={isRequired}
          defaultValue={defaultValue}
          className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
        />
      )}
    </div>
  );
}

const MemoFormInput = React.memo(FormInput);

export default FormInput;
export { MemoFormInput };