export default function Divider({ customColor, spaceSmall }) {
  const dividerStyle = {
    marginBlock: spaceSmall ? "1em" : "2em",
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
