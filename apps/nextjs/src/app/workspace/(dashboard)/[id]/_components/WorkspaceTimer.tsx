"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { differenceInMilliseconds, differenceInMinutes } from "date-fns";
// import Cookies from "js-cookie";
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
  const [initialTime, setInitialTime] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);

  //   const textArr = parseDescription(`- hello
  // - world
  // - I can do it - together`);

  //   console.log(textArr);

  const onStart = () => {
    setStartDate(new Date());
    // setStartTime(startTime);
    // setStartTime(Date.now());
    // Cookies.set("project-timer", JSON.stringify({ startDate: Date.now() }));
    // console.log("onStart");
  };

  const onStop = () => {
    // setTime(Date.now());
    if (startDate) {
      console.log(
        "onStop",
        differenceInMinutes(Date.now(), startDate.getTime()),
      );
    }
    // Cookies.remove("project-timer");

    setStartDate(null);
  };

  const togglePlay = () => {
    if (play) {
      onStop();
    } else {
      onStart();
    }

    setPlay((prevState) => !prevState);
  };

  // Initiate start timer if exists and autoplay
  useEffect(() => {
    const timer = undefined;
    if (timer) {
      const timeElapsed = Date.now() - timer.startDate.getTime();

      setInitialTime(timeElapsed);
      setStartDate(timer.startDate);
      setPlay(true);
    }
  }, []);

  return (
    <section className="container flex items-stretch gap-4">
      <Input className="flex-1" placeholder="What you have done?" />
      {/* <Select placeholder="">
        <FaFolderClosed />
      </Select> */}

      <Stopwatch startTime={initialTime} isRunning={play} />

      <Button className="text-4xl" variant="base" onClick={togglePlay}>
        {play ? <FaStopCircle /> : <FaPlayCircle />}
      </Button>
    </section>
  );
};

export default WorkspaceTimer;

const useTimer = () => {
  const TICK_INTERVAL = 10;
  const intervalId = useRef<ReturnType<typeof setTimeout>>();
  const [time, setTime] = useState(0);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    const padZero = (num: number) => String(num).padStart(2, "0");

    return {
      hours: padZero(hours),
      minutes: padZero(minutes),
      seconds: padZero(seconds),
    };
  };

  const onStart = useCallback((startTime: number) => {
    if (startTime) {
      setTime(startTime);
    }
    const tick = () => {
      setTime((time) => time + TICK_INTERVAL);
    };

    intervalId.current = setInterval(tick, TICK_INTERVAL);
  }, []);

  const onStop = useCallback(() => {
    clearInterval(intervalId.current);
    setTime(0);
  }, []);

  return {
    onStart,
    onStop,
    formattedTime: formatTime(time),
  };
};

export function Stopwatch({
  startTime,
  isRunning,
}: {
  startTime: number;
  isRunning: boolean;
}) {
  const {
    formattedTime: { hours, minutes, seconds },
    onStart,
    onStop,
  } = useTimer();

  useEffect(() => {
    if (isRunning) {
      onStart(startTime);
    } else {
      onStop();
    }

    return onStop;
  }, [isRunning, onStart, onStop, startTime]);

  return (
    <div className="w-28 text-center text-2xl">
      {hours}:{minutes}:{seconds}
    </div>
  );
}
