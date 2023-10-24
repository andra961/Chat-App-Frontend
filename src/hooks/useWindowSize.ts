import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      //   console.log(e);
      setSize({
        width: (e.currentTarget as Window).innerWidth || 0,
        height: (e.currentTarget as Window).innerHeight || 0,
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
};
