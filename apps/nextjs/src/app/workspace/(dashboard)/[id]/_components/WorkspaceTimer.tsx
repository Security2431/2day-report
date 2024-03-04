"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";

import Button from "~/app/_components/button";
import Input from "~/app/_components/form/Input";
import Select from "~/app/_components/form/Select";

const parseDescription = (description: string) =>
  description.split("\n").map((item) => item.replace(/^-\s*/, ""));

/* <WorkspaceTimer />
============================================================================= */
const WorkspaceTimer = () => {
  const [play, setPlay] = useState(false);

  const textArr = parseDescription(`- hello
- world
- I can do it - together`);

  console.log(textArr);

  const togglePlay = () => {
    setPlay(!play);
  };

  return (
    <section className="container flex items-stretch gap-4">
      <Input className="flex-1" placeholder="What you have done?" />
      {/* <Select placeholder="">
        <FaFolderClosed />
      </Select> */}

      <Stopwatch startTime={Date.now()} />

      <Button className="text-4xl" variant="base" onClick={togglePlay}>
        {play ? <FaStopCircle /> : <FaPlayCircle />}
      </Button>
    </section>
  );
};

export default WorkspaceTimer;

const formatTime = (time: number) => {
  const hours = Math.floor(time / (60 * 60 * 1000));
  const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((time % (60 * 1000)) / 1000);

  return { hours, minutes, seconds };
};

export function Stopwatch({ startTime }: { startTime: number }) {
  const intervalId = useRef<ReturnType<typeof setTimeout>>();
  const [time, setTime] = useState(0);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const { hours, minutes, seconds } = formatTime(time);

  useEffect(() => {
    const tick = () => {
      const currentTime = Date.now();

      const timeElapsed = currentTime - startTime;

      setTime(timeElapsed);
    };

    intervalId.current = setInterval(tick, 1000);

    return () => clearInterval(intervalId.current);
  }, [startTime]);

  return (
    <div className="w-28 text-center text-2xl">
      {padZero(hours)}:{padZero(minutes)}:{padZero(seconds)}
    </div>
  );
}
