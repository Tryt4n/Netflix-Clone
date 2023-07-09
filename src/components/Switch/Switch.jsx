import "./switch.scss";

export default function Switch({ name, text, checked, onChangeFunction }) {
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
        checked={checked}
        onChange={onChangeFunction}
      />
    </span>
  );
}
