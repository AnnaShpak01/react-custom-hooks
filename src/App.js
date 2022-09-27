import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

function useInputWithValidate(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const validateInput = () => {
    return value.search(/\d/) >= 0;
  };

  return { value, onChange, validateInput };
}

function useCounterOperation(initValue) {
  const [counterValue, setCounterValue] = useState(initValue);

  const incCounter = () => {
    if (counterValue < 50) {
      setCounterValue((counterValue) => counterValue + 1);
    }
  };

  const decCounter = () => {
    if (counterValue > -50) {
      setCounterValue((counterValue) => counterValue - 1);
    }
  };

  const rndCounter = () => {
    setCounterValue(+(Math.random() * (50 - -50) + -50).toFixed(0));
  };

  const resetCounter = () => {
    setCounterValue(initValue);
  };

  return {
    counterValue,
    incCounter,
    decCounter,
    rndCounter,
    resetCounter,
  };
}

const Counter = (props) => {
  const counter = useCounterOperation(props.counter);

  return (
    <div className="component">
      <div className="counter">{counter.counterValue}</div>
      <div className="controls">
        <button onClick={counter.incCounter}>INC</button>
        <button onClick={counter.decCounter}>DEC</button>
        <button onClick={counter.rndCounter}>RND</button>
        <button onClick={counter.resetCounter}>RESET</button>
      </div>
    </div>
  );
};

const RndCounter = (props) => {
  const rndCounter = useCounterOperation(props.counter);

  return (
    <div className="component">
      <div className="counter">{rndCounter.counterValue}</div>
      <div className="controls">
        <button onClick={rndCounter.rndCounter}>RND</button>
        <button onClick={rndCounter.resetCounter}>RESET</button>
      </div>
    </div>
  );
};

const Form = () => {
  const input = useInputWithValidate("");
  const textArea = useInputWithValidate("");

  const color = input.validateInput() ? "text-danger" : null;

  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <input
            value={`${input.value} / ${textArea.value}`}
            type="text"
            className="form-control"
            readOnly
          />
          <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
            Email address
          </label>
          <input
            onChange={input.onChange}
            type="email"
            value={input.value}
            className={`form-control ${color} `}
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Example textarea
          </label>
          <textarea
            onChange={textArea.onChange}
            value={textArea.value}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </form>
    </Container>
  );
};

function App() {
  return (
    <>
      <Form />
      <Counter counter={0} />
      <RndCounter counter={5} />
    </>
  );
}

export default App;
