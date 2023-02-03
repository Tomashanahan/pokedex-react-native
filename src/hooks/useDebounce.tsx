import {useEffect, useState} from 'react';

function useDebounce(input: string = '', time: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeOut);
    };
  }, [input, time]);

  return debouncedValue;
}

export default useDebounce;
