import { useEffect } from "react";

export default function useLocalStorage(data, localStorageKey) {
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, [data]);
}
