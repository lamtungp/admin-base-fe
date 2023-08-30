interface IconComponentProps {
  icon?: string;
  title?: string;
}

const IconComponent = ({ icon, title }: IconComponentProps) => {
  return (
    <>
      <div className="icon px-2 py-1 bg-gray-200 rounded-md flex justify-center">
        <img className="h-10" src={icon} alt="icon" />
      </div>

      <p className="text-center text-xs mt-1">{title}</p>
    </>
  );
};

export default IconComponent;
