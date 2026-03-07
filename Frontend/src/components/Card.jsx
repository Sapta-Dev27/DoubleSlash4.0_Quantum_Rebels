export const Card = ({
  children,
  className = "",
  hover = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-800 rounded-xl p-6 border border-slate-700
      ${hover ? "hover:border-blue-500 hover:shadow-lg cursor-pointer transition" : ""}
      ${className}`}
    >
      {children}
    </div>
  );
};