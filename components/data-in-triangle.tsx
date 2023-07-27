/* eslint-disable no-undef */
import { classNames } from "@/utils/functions";
import React from "react";

interface IDataInTriangle {
  triangleData: number[][];
  maxRouteValue: {
    path: number[];
    maxTotal: number;
  } | null;
}

let interval: NodeJS.Timer;

const DataInTriangle: React.FC<IDataInTriangle> = ({
  triangleData,
  maxRouteValue,
}) => {
  const [activeLevel, setActiveLevel] = React.useState<number>(-1);
  const [trackFlow, setTrackFlow] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (maxRouteValue?.maxTotal) {
      setActiveLevel(0);
      resetInterval();
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [maxRouteValue?.maxTotal]);

  React.useEffect(() => {
    if (activeLevel > triangleData.length && interval) {
      clearInterval(interval);
    } else {
      if (trackFlow) {
        const element: HTMLElement | null = document.querySelector(
          `#box-${activeLevel}-${maxRouteValue?.path[activeLevel]}`,
        );

        if (element) {
          element.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeLevel]);

  const resetInterval = () => {
    const element: HTMLElement | null = document.querySelector("#box-0-0");

    if (element) {
      element.scrollIntoView({
        block: "center",
        inline: "center",
      });
    }
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      setActiveLevel((previous) => previous + 1);
    }, 600);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <h4 className="mb-4">
            Max Value: <br />
            <span className="text-xl font-bold">{maxRouteValue?.maxTotal}</span>
          </h4>
        </div>
        <div>
          <button
            className={classNames(
              "mb-7 mr-4 rounded-md border border-green-600 p-4 text-center text-green-600",
            )}
            onClick={() => {
              if (interval) {
                resetInterval();
                setActiveLevel(0);
              }
            }}
          >
            Replay
          </button>
          <button
            className={classNames(
              "mb-7 mr-4 rounded-md border border-red-600 p-4 text-center text-red-600",
            )}
            onClick={() => {
              if (interval) {
                clearInterval(interval);
                setActiveLevel(triangleData.length + 1);
              }
            }}
          >
            Skip All
          </button>
          <button
            className={classNames(
              "mb-7  rounded-md p-4 text-center text-white",
              trackFlow ? "bg-red-600" : "bg-green-600",
            )}
            onClick={() => setTrackFlow((previous) => !previous)}
          >
            {trackFlow ? "Stop" : "Start"} Tracking
          </button>
        </div>
      </div>

      <div className="relative h-[700px] max-w-7xl overflow-y-auto rounded-xl bg-gray-200 p-12">
        <div className="flex w-fit flex-col">
          {triangleData.map((row, rowIndex) => (
            <div className="mx-auto mb-8 flex grow" key={rowIndex}>
              {row.map((item, columnIndex) => (
                <div
                  key={`box-${rowIndex}-${columnIndex}`}
                  id={`box-${rowIndex}-${columnIndex}`}
                  className={classNames(
                    " mx-2 flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full",
                    maxRouteValue?.path[rowIndex] === columnIndex &&
                      activeLevel >= rowIndex
                      ? "bg-green-600 text-white transition-all duration-500"
                      : "bg-white",
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DataInTriangle;
