export default function Divider({ customColor }) {
  const dividerStyle = {
    marginBlock: "2em",
    borderTop: "none",
    borderBottom: `1px solid ${customColor || `#ccc`}`,
  };

  return (
    <hr
      className="divider"
      style={dividerStyle}
    />
  );
}
