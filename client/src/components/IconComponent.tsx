import { IconType } from "react-icons";

const IconComponent = ({ Icon }: { Icon: IconType }) => {
  return (
    <div>
      <Icon className="my-8 text-6xl" />
    </div>
  );
};

export default IconComponent;
