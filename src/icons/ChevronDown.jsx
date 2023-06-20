export default function ChevronDown({ label }) {
  return (
    <svg
      aria-label={label}
      className="svg-icon svg-icon-chevron-down"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      data-name="ChevronDown"
    >
      <path
        d="M19.293 7.293L12 14.586 4.707 7.293 3.293 8.707l8 8a1 1 0 001.414 0l8-8-1.414-1.414z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
