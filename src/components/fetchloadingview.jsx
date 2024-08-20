import Loader from "./loader";

export default function FetchLoadingView() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 py-8">
      <Loader size={15} type="circle" />
      <p className="text-[#C4C4C4] text-sm">Loading...</p>
    </div>
  );
}
