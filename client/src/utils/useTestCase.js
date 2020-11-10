import { useState } from "react";

// custom hook, allows code to be repeated for each test case input/output
const useTestCase = () => {
  const [test, setTest] = useState({
    input: "",
    output: "",
  });
  return {
    test,
    setTestCase: (e) => {
      const { name, value } = e.target;
      setTest({ ...test, [name]: value });
    },
  };
};

export default useTestCase;
