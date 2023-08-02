import { Button } from "react-bootstrap";

const style1 = {
  border: "1px solid #e03636",
  fontSize: "40px",
  fontWeight: "bold",
  lineHeight: "40px",
  height: "84px",
  marginRight: "-1px",
  marginTop: "-1px",
  padding: "0px",
  textAlign: "center",
  width: "94px",
};

export default function Square({ id, value, handleClick }) {
  console.log("Inside Square");
  return (
    <>
      <Button id={id} style={style1} variant="light" onClick={handleClick}>
        {value}
      </Button>
    </>
  );
}
