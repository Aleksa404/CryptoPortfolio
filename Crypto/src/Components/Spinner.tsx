import { ClipLoader } from "react-spinners";

type Props = {
  isLoading?: boolean;
};

const Spinner = ({ isLoading = true }: Props) => {
  return (
    <>
      <div className="position fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <ClipLoader
          color="#36d7b7"
          cssOverride={{}}
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};
export default Spinner;
