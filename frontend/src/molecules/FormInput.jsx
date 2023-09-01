import React, { useRef, useEffect, useCallback } from "react";

function FormInput({
  type,
  name,
  onChange,
  labelText,
  placeholderText,
  doesAutocomplete,
  isRequired,
  defaultValue, 
  value
}) {
  const textareaRef = useRef(null);

  const handleTextAreaChange = useCallback((e) => {
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
  }, [onChange]);

  useEffect(() => {
    if (type === "textArea" && textareaRef.current && defaultValue) {
      textareaRef.current.style.height = 'inherit';
      const computed = window.getComputedStyle(textareaRef.current);
      const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                   + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
                   + textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${height}px`;
    }
  }, [type, defaultValue]);

  const isControlled = value !== undefined;

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
          defaultValue={!isControlled ? defaultValue : undefined}
          value= {isControlled ? value : undefined}
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
          defaultValue={!isControlled ? defaultValue : undefined}
          value= {isControlled ? value : undefined}
          className="w-full rounded-2xl border-2 border-[#DFDFDF] p-2 px-4 text-xl placeholder:text-[#DFDFDF]"
        />
      )}
    </div>
  );
}

const MemoFormInput = React.memo(FormInput);

export default FormInput;
export { MemoFormInput };