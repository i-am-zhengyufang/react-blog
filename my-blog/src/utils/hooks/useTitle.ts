import { useRef, useEffect } from "react";
export const useTitle = (title: string) => {
  const prevTitle = useRef(document.title);
  useEffect(() => {
    document.title = title;
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.title = prevTitle.current;
    };
  }, [title]);
}
