export default function FetchErrorView({
  error = "Unable to complete request, please try again.",
  retry = null,
  button = "retry",
}) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 py-12 text-sm">
      <p className="text-contrast text-center">{error}</p>
      <button
        onClick={retry}
        className="bg-accent/80 hover:bg-accent transitioning text-white px-4 py-2 rounded-full capitalize"
      >
        {button}
      </button>
    </div>
  );
}
