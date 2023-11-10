import { useEffect } from "react";
import { getData } from "./getData";

export default function App() {
  useEffect(() => {
    getData();
  }, []);

  return null;
}
