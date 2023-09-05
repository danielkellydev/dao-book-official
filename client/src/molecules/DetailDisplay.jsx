function DetailDisplay({ labelText, valueText }) {
  return (
    <div className="mb-3 text-left">
      <h2 className="block text-xl font-bold">{labelText}</h2>
      <p>{valueText}</p>
    </div>
  );
}

export default DetailDisplay;
