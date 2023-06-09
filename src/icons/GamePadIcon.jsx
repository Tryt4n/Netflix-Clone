export default function GamePadIcon({ hasClassName, hidden }) {
  return (
    <svg
      className={hasClassName ? "learn-more-modal__nick-icon" : ""}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden={hidden ? "true" : undefined}
    >
      <path
        d="M.768 7.688A5 5 0 015.758 3h12.484a5 5 0 014.99 4.688l.5 8A5 5 0 0118.743 21h-.463a5 5 0 01-4.902-4.02L13.18 16h-2.36l-.196.98A5 5 0 015.72 21h-.463a5 5 0 01-4.99-5.312l.5-8zM5.758 5a3 3 0 00-2.994 2.813l-.5 8A3 3 0 005.258 19h.463a3 3 0 002.942-2.412l.357-1.784.16-.804H14.82l.16.804.358 1.784A3 3 0 0018.279 19h.463a3 3 0 002.995-3.187l-.5-8A3 3 0 0018.242 5H5.758zM6 9V7h2v2h2v2H8v2H6v-2H4V9h2zm12-1a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 100-2 1 1 0 000 2zm3 1a1 1 0 11-2 0 1 1 0 012 0zm1-1a1 1 0 100-2 1 1 0 000 2z"
        fill="currentColor"
      />
    </svg>
  );
}
