import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonType = "primary" | "secondary";

type ButtonProps = {
  onClick?: () => void;
  variant: ButtonType;
  icon?: any;
  children: React.ReactNode;
};

const variantClasses: Record<ButtonType, string> = {
  primary: "bg-blue-500 hover:bg-blue-600",
  secondary: "bg-gray-500 hover:bg-gray-600",
};

export function Button({ onClick, variant, icon, children }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer w-full p-2 rounded transition text-sm text-white ${variantClasses[variant]}`}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-1" />}
      {children}
    </button>
  );
}
