import { useClickAway } from "react-use";
import { useRef } from "react";

export default function FilterList({ show, setShow, items, onSelect }) {
  const ref = useRef(null);

  useClickAway(ref, () => {
    setShow(false);
  });

  if (!show) return;

  return (
    <div
      ref={ref}
      className="overflow-y-scroll w-full max-w-[300px] custom-scrollbar max-h-[300px] absolute z-30 top-0 -left-16 min-w-[250px] bg-neutral  py-2 shadow shadow-black/20  "
    >
      {items.map((v, i) => {
        const Icon = v.icon;
        return (
          <div
            onClick={() => onSelect(v)}
            key={i}
            className="text-primary text-sm cursor-pointer px-4 border-b border-primary/20 py-3 hover:bg-black/5   flex flex-row justify-start space-x-4"
          >
            {v.icon && <Icon className="text-xl " />}

            <span> {v.name} </span>
          </div>
        );
      })}
    </div>
  );
}
