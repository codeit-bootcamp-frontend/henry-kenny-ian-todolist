const PROGRESS_CONTAINER = {
  boxShadow:
    "inset 2px 2px 5px rgb(179 179 179), inset -2px -2px 5px rgb(255 255 255)",
  width: "770px",
  height: "20px",
  borderRadius: "10px",
  margin: "100px auto 40px",
};
const PROGRESS_STATUS = {
  background: "linear-gradient(90deg, #007A31 -6.7%, #23FB00 95%)",
  height: "100%",
  borderRadius: "10px",
};

const ProgressBar = ({ progress }) => {
  return (
    <div style={PROGRESS_CONTAINER}>
      <div style={{ ...PROGRESS_STATUS, width: `${progress * 100}%` }}></div>
    </div>
  );
};

export default ProgressBar;
