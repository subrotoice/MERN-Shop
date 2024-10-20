import moment from "moment";

const Header = () => {
  return (
    <>
      <div className="text-center flex flex-col gap-3">
        <h1 className="capitalize font-Edu text-6xl">The breaking News</h1>
        <h2 className="text-2xl">
          Bold, Unbised Reporting for a better infored world
        </h2>
        <p>{moment().format("LLLL")}</p>
      </div>
    </>
  );
};

export default Header;
