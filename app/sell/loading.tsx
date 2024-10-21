import Loader from "@/components/shared/loader";

const Loading = () => {
  return (
    <div
      className="
      flex
      h-[calc(100vh_-_25vh)]
      justify-center
      items-center
      "
    >
      <Loader />
    </div>
  );
};

export default Loading;
