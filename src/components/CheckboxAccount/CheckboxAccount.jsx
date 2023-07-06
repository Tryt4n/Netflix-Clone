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
  onChangeFunction,
  text,
  textSmall,
  trueValue,
  radio,
}) {
  //* `name` formatted from text-text on textText
  const idValue = radio ? id : name;
  //   const words = name.split("-");
  //   const words = (radio ? id : name).split("-");
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
        // id={radio ? id : name}
        id={idValue}
        className={radio ? "radio-account" : "checkbox-account"}
        checked={checked}
        onChange={() => onChangeFunction(formattedName, trueValue)}
        // onChange={() => onChangeFunction(id, trueValue)}
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
