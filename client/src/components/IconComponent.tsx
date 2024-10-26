import { IconType } from "react-icons";

const IconComponent = ({
  Icon,
  className,
}: {
  Icon: IconType;
  className: string;
}) => {
  return (
    <div>
      <Icon className={className} />
    </div>
  );
};

export default IconComponent;
