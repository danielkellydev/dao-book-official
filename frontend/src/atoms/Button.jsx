import classNames from "classnames";

/**
 @typedef buttonProps
 @type {Object}
 @property {"dark"|"neutral"|"inverted"|"light"} theme 
 @property {string} buttonText 
 @property {React.MouseEventHandler<HTMLButtonElement>} onClick
 @property {boolean} isFullWidth 
 @property {boolean} buttonDisabled
 */

/**
 * @param {buttonProps} props
 */
function Button({
  theme,
  buttonText,
  onClick,
  isFullWidth,
  buttonDisabled,
  otherClasses,
}) {
  const stylesOnEveryButton =
    "rounded-2xl border-4 px-2 py-2 font-sans font-semibold shadow-md";

  const widthFixed = isFullWidth ? "w-full" : "w-32";

  let buttonThemeStyles;

  if (theme === "dark") {
    buttonThemeStyles =
      "border-daobook-amber bg-daobook-amber text-white dark:border-daobook-amber-dark transition-colors transition-transform hover:scale-105 hover:bg-daobook-amber/80 focus:ring";
  } else if (theme === "neutral") {
    buttonThemeStyles =
      "border-[#E3E3E3] bg-white text-black dark:text-white dark:bg-black/50 transition-colors transition-transform hover:scale-105 hover:bg-black/5 focus:ring dark:hover:bg-black/70";
  } else if (theme === "inverted") {
    buttonThemeStyles =
      "border-white bg-daobook-amber text-white dark:border-black dark:text-black transition-colors transition-transform hover:scale-105 focus:ring hover:bg-daobook-amber/80";
  } else if (theme === "light") {
    buttonThemeStyles =
      "border-daobook-amber text-daobook-amber bg-white transition-colors transition-transform hover:scale-105 hover:bg-white/75 focus:ring dark:bg-black dark:text-white";
  }

  let disabledStyle;
  if (buttonDisabled) {
    disabledStyle = "opacity-40";
  }

  const finalStyles = classNames(
    stylesOnEveryButton,
    buttonThemeStyles,
    widthFixed,
    disabledStyle,
    otherClasses
  );

  return (
    <button
      className={finalStyles}
      onClick={onClick}
      disabled={buttonDisabled}
    >
      {buttonText}
    </button>
  );
}

export default Button;
