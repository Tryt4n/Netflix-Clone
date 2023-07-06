// import "./checkboxAccount.scss";

// export default function CheckboxAccount({
//   name,
//   checked,
//   onChangeFunction,
//   text,
//   textSmall,
//   trueValue,
// }) {
//   //* `name` formatted from text-text on textText
//   const words = name.split("-");
//   const formattedWords = words.map((word, index) => {
//     if (index !== 0) {
//       const firstLetter = word.charAt(0).toUpperCase();
//       const restOfWord = word.slice(1);
//       return firstLetter + restOfWord;
//     }
//     return word;
//   });
//   const formattedName = formattedWords.join("");
//   console.log(onChangeFunction);
//   return (
//     <div className="checkbox-wrapper">
//       <input
//         type="checkbox"
//         name={name}
//         id={name}
//         className="checkbox-account"
//         checked={checked}
//         onChange={() => onChangeFunction(formattedName, trueValue)}
//       />
//       <label
//         htmlFor={name}
//         className="checkbox-label-wrapper"
//       >
//         <span className="checkbox-label-main-text ">{text}</span>
//         {textSmall && <small className="checkbox-label-small-text">{textSmall}</small>}
//       </label>
//     </div>
//   );
// }

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
