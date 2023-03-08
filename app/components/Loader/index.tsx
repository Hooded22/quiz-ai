
import "./index.css";

export const Loader = ({
  text,
  loading,
}: {
  text?: string;
  loading: boolean;
}) =>
  loading ? (
    <div className="absolute top-0 left-0 bg-neutral/80 w-full h-full flex flex-col justify-center items-center">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      {text && <p className="text-white text-lg mt-5">{text}</p>}
    </div>
  ) : null;
