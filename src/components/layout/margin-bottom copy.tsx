import React from "react";
interface MarginModel {
  margin: number;
}

const MarginBottom = (props: MarginModel) => {
  return (
    <>
      <div style={{ marginBottom: props.margin }} />
    </>
  );
};

export default MarginBottom;
