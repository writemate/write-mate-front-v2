import { useEffect, useState } from 'react';

export default function useCountUp() {
  const [end, setEnd] = useState(0);
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(1500 / frameRate);

  useEffect(() => {
    let currentNumber = 0;
    const counter = setInterval(() => {
      const progress = ++currentNumber / totalFrame;
      setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end]);


  return [count, setEnd] as const;
}
