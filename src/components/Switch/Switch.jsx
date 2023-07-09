import "./switch.scss";

export default function Switch({ name, text }) {
  return (
    <span>
      <label
        htmlFor={`switch-${name}`}
        className="visually-hidden"
      >
        {text}
      </label>
      <input
        type="checkbox"
        name={`switch-${name}`}
        id={`switch-${name}`}
        className="switch-input"
      />
    </span>
  );
}
