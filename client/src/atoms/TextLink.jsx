import { Link } from "react-router-dom";

function TextLink({ paragraphText, linkText, linkDestination, className }) {
  return (
    <p className={className}>
      {paragraphText && paragraphText}{" "}
      {linkText && linkDestination && (
        <Link
          to={linkDestination}
          className="underline-offset-3 font-bold text-daobook-amber underline"
        >
          {linkText}
        </Link>
      )}
    </p>
  );
}

export default TextLink;
