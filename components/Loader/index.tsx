import "./index.css";

interface LoaderProps {
  loading: boolean;
}

export const Loader = ({ loading }: LoaderProps): JSX.Element | null =>
  loading ? (
    <div className="w-full h-40 flex flex-col justify-center items-center">
      <div className="dot-ellipsis">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
