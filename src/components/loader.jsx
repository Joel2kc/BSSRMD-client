import {
  ClipLoader,
  PulseLoader,
  CircleLoader,
  GridLoader,
} from "react-spinners";

const spinnersMap = {
  default: PulseLoader,
  circle: CircleLoader,
  clip: ClipLoader,
  grid: GridLoader,
};

export default function Loader({
  type = "default",
  size = 12,
  color = "#144166",
  inverted = false,
  speedMultiplier = 1.2,
  ...rest
}) {
  if (inverted) color = "#ffffff";

  const RenderProp = spinnersMap[type] || ClipLoader;

  return (
    <div className="flex py-1 flex-row justify-center items-center">
      <RenderProp
        size={size}
        color={color}
        speedMultiplier={speedMultiplier}
        {...rest}
      />
    </div>
  );
}
