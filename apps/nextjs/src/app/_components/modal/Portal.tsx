import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* Props - <Portal />
============================================================================= */
interface Props {
  container: string;
  children?: React.ReactNode;
}

/* <Portal />
============================================================================= */
const Portal: React.FC<Props> = ({ container, children }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(container);

    setMounted(true);
  }, [container]);

  if (!mounted) {
    return null;
  }

  return createPortal(children, ref.current!);
};

export default Portal;
