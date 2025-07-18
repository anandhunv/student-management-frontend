import { ClipLoader } from "react-spinners";

const Loader = ({ size = 25, color = "#ffffff" }) => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
