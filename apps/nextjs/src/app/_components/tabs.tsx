import type {
  ButtonHTMLAttributes,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import React, { Children, createContext, useContext, useState } from "react";
import clsx from "clsx";

import Button from "./button";

interface ContextType {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

const TabsContext = createContext<ContextType>({
  activeIndex: 0,
  setActiveIndex: () => undefined,
});

const Tabs: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <section className={clsx(className)}>{children}</section>
    </TabsContext.Provider>
  );
};

const TabContext = createContext<number>(0);

const TabList: React.FC<{ children: ReactNode }> = ({ children }) => {
  const wrappedChildren = Children.map(children, (child, index) => (
    <TabContext.Provider value={index}>{child}</TabContext.Provider>
  ));
  return (
    <div className="mb-6 flex w-full justify-start gap-4 overflow-x-scroll">
      {wrappedChildren}
    </div>
  );
};

const Tab: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  const index = useContext(TabContext);
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = index === activeIndex;
  return (
    <Button
      variant="base"
      key={index + "tab"}
      className={clsx("border border-white px-4 py-2", {
        "bg-white text-purple-500": isActive,
        "text-white": !isActive,
      })}
      onClick={() => setActiveIndex(index)}
      type="button"
      {...rest}
    >
      {children}
    </Button>
  );
};

const TabPanels: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeIndex } = useContext(TabsContext);

  return (
    <div>
      {React.Children.map(children, (child, i) =>
        i === activeIndex ? child : null,
      )}
    </div>
  );
};

const TabPanel: React.FC<{ children: ReactNode }> = ({ children }) => {
  return children;
};

export { Tabs, TabList, Tab, TabPanels, TabPanel };
