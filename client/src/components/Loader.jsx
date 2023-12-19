import React from "react";

const Loader = () => {
  return (
    <div
      className="spinner-grown d-flex justify-content-center"
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
