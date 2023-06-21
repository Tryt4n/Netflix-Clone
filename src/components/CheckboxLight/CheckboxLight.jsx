import "./checkboxLight.scss";

export default function CheckboxLight({ data }) {
  return (
    <>
      <input
        type="checkbox"
        name={`animation-on-tv${data.id}`}
        id={`animation-on-tv${data.id}`}
        className="checkbox-light"
      />
      <label
        htmlFor={`animation-on-tv${data.id}`}
        className="checkbox-light-label"
      >
        Reduce animation effects when navigating on TV.
      </label>
    </>
  );
}
