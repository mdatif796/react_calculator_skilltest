import * as math from "mathjs";
import { useState } from "react";
import styles from "../styles/calculator.module.css";
const Calculator = () => {
  const [result, setResult] = useState("0");

  let operators = "%/*-+=";

  const handleClick = (value) => {
    if (result[result.length - 1] === "." && value === ".") {
      return;
    }
    let isOperator = operators.includes(value);
    let currOperator = operators.includes(result[result.length - 1]);
    if (isOperator && currOperator) {
      return;
    }
    switch (value) {
      case "=":
        try {
          let evaluatedResult = math.evaluate(result);
          setResult(evaluatedResult.toString());
        } catch (error) {
          setResult("Error");
        }
        break;
      case "C":
        setResult("0");
        break;
      default:
        let currValue = "";
        if (result === "0" && !isOperator) {
          currValue = value;
          if (value === ".") {
            currValue = result + value;
          }
        } else if (result === "0" && isOperator) {
          currValue = result + value;
        } else {
          currValue = result + value;
        }
        setResult(currValue);
        break;
    }
  };

  const renderButton = (value, style) => {
    let color = style ? style : "";
    return (
      <>
        {color ? (
          <button
            className={styles.orangeBtn}
            onClick={() => handleClick(value)}
          >
            {value}
          </button>
        ) : (
          <button onClick={() => handleClick(value)}>{value}</button>
        )}
      </>
    );
  };
  return (
    <div className={styles.calculator}>
      <div className={styles.result}>
        <h1 className={styles.resultName}>{result}</h1>
      </div>
      <div className={styles.btnContainer}>
        {renderButton("C")}
        {renderButton("+/-")}
        {renderButton("%")}
        {renderButton("/", "orangeBtn")}
        {renderButton("7")}
        {renderButton("8")}
        {renderButton("9")}
        {renderButton("*", "orangeBtn")}
        {renderButton("4")}
        {renderButton("5")}
        {renderButton("6")}
        {renderButton("-", "orangeBtn")}
        {renderButton("1")}
        {renderButton("2")}
        {renderButton("3")}
        {renderButton("+", "orangeBtn")}
        <button className={styles.equalBtn} onClick={() => ""}>
          0
        </button>
        {renderButton(".")}
        {renderButton("=", "orangeBtn")}
      </div>
    </div>
  );
};

export default Calculator;
