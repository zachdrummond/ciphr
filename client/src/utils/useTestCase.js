import { useState } from "react";

// custom hook, allows code to be repeated for input or output test case values
const useTestCase = () => {
  const [test, setTest] = useState({
    test1: "",
    test2: "",
    test3: "",
    test4: "",
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
