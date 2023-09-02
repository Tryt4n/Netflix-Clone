export default function AddNewProfile({ styles }) {
  const iconStyle = {
    scale: "60%",
  };
  return (
    <svg
      style={iconStyle}
      className={styles}
      viewBox="0 0 600 600"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M300 600C465.685 600 600 465.685 600 300C600 134.315 465.685 0 300 0C134.315 0 0 134.315 0 300C0 465.685 134.315 600 300 600ZM262 100H337V274H500V349H337V500H262V349H100V274H262V100Z"
        fill="#808080"
      />
    </svg>
  );
}
