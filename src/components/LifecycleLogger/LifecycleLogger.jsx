import { useEffect } from "react";

export default function LifecycleLogger({ counter }) {
  useEffect(() => {
    console.log("LifecycleLogger: mount");
    return () => console.log("LifecycleLogger: unmount");
  }, []);

  useEffect(() => {
    console.log("LifecycleLogger: update, counter =", counter);
  }, [counter]);

  return <p style={{ opacity: 0.7 }}>LifecycleLogger активен (counter: {counter})</p>;
}
