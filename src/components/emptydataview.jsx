import EmptyImage from "../assets/images/empty.png";

export default function EmptyDataView({
  msg = "We couldn't find any data.",
  action = null,
  actionText = "Try this",
}) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 py-8">
      <img src={EmptyImage} alt="Empty" className="w-12 lg:w-14 xl:w-16" />

      <p className="text-contrast text-sm"> {msg} </p>

      {action && (
        <button
          onClick={action}
          className="bg-accent/80 hover:bg-accent transitioning text-white px-4 py-2 rounded-full capitalize"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
