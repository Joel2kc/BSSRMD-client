import { Link } from "react-scroll";

export default function SLink({
  to,
  children,
  className,
  activeClass,
  offset = 100,
  onClick = () => {},
  ...props
}) {
  return (
    <Link
      to={to}
      spy={true}
      smooth="easeInOutQuart"
      offset={offset}
      duration={1000}
      className={className}
      activeClass={activeClass}
      isDynamic
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}
