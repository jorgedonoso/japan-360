import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LabelValueProps = {
  children: React.ReactNode;
};

export function Warning({ children }: LabelValueProps) {
  return (
    <div className="w-full items-center gap-2 text-xs text-amber-700 bg-amber-50 p-1 mb-2 rounded">
      <FontAwesomeIcon
        icon={faCircleInfo}
        className="text-amber-500 w-4 h-4 mr-1"
      />
      <span>{children}</span>
    </div>
  );
}
