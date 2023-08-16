import classNames from "classnames";

/**
 @typedef titleProps
 @type {Object}
 @property {"dark"|"light"} theme 
 @property {boolean} isSubtitled
 @property {boolean} isSmall
 */

/**
 * @param {titleProps} props
 */
function TitleLockup({ theme, isSubtitled, isSmall }) {
  const stylesOnEveryHeading = "text-center font-italiana";
  const stylesOnEveryP = "text-center text-2xl";

  let colorThemeStyles;

  if (theme === "light") {
    colorThemeStyles = "text-white";
  } else if (theme === "dark") {
    colorThemeStyles = "text-black";
  }

  let headingSize;

  if (isSmall) {
    headingSize = "text-7xl";
  } else {
    headingSize = "text-8xl";
  }

  const finalH1Styles = classNames(
    stylesOnEveryHeading,
    colorThemeStyles,
    headingSize
  );
  const finalPStyles = classNames(stylesOnEveryP, colorThemeStyles);

  return (
    <div>
      <p className={finalH1Styles}>Dao Book</p>
      {isSubtitled && <p className={finalPStyles}>The way of clinic notes</p>}
    </div>
  );
}

export default TitleLockup;
