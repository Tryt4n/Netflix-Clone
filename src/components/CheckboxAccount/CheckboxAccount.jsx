import "./checkboxAccount.scss";

export default function CheckboxAccount({
  name,
  id,
  checked,
  disabled,
  value,
  onChangeFunction,
  text,
  textSmall,
  trueValue,
  radio,
  passValueToFunction,
}) {
  //* `name` formatted from text-text on textText
  const idValue = radio ? id : name;
  const words = idValue.split("-");
  const formattedWords = words.map((word, index) => {
    if (index !== 0) {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstLetter + restOfWord;
    }
    return word;
  });
  const formattedName = formattedWords.join("");

  return (
    <div className="input-wrapper">
      <input
        type={radio ? "radio" : "checkbox"}
        name={name}
        id={idValue}
        className={radio ? "radio-account" : "checkbox-account"}
        checked={checked}
        disabled={disabled ? disabled : null}
        value={value ? value : undefined}
        onChange={
          onChangeFunction
            ? () => onChangeFunction(passValueToFunction ? value : formattedName, trueValue)
            : null
        }
      />
      <label
        htmlFor={radio ? id : name}
        className="label-wrapper"
      >
        <span className="label-main-text ">{text}</span>
        {textSmall && <small className="label-small-text">{textSmall}</small>}
      </label>
    </div>
  );
}
