import { classNames } from "@/utils/functions";
import React from "react";

interface IDataInTriangle {
  triangleData: number[][];
  maxRouteValue: {
    path: number[];
  };
}

const DataInTriangle: React.FC<IDataInTriangle> = ({
  triangleData,
  maxRouteValue,
}) => {
  return (
    <>
      {triangleData.map((row, rowIndex) => (
        <div className="mx-auto mb-8 flex grow" key={rowIndex}>
          {row.map((item, columnIndex) => (
            <div
              key={`box-${rowIndex}-${columnIndex}`}
              id={`box-${rowIndex}-${columnIndex}`}
              className={classNames(
                " mx-2 flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full",
                maxRouteValue?.path[rowIndex] === columnIndex
                  ? "bg-green-600 text-white"
                  : "bg-white",
              )}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default DataInTriangle;
