import DataInTriangle from "@/components/data-in-triangle";
import { calculateMaxRouteValue } from "@/utils/functions";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type TTriangleData = number[][];

interface IMaxRouteValue {
  maxTotal: number;
  values: number[];
  path: number[];
}

export default function Home() {
  const [triangleData, setTriangleData] = useState<TTriangleData>([]);
  const [file, setFile] = useState<File | null>();
  const [maxRouteValue, setMaxRouteValue] = useState<IMaxRouteValue | null>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noKeyboard: true,
    accept: {
      "plain/text": [".txt"],
    },
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    if (maxRouteValue?.maxTotal) {
      const element: HTMLElement | null = document.querySelector("#box-0-0");

      if (element) {
        element.scrollIntoView({ block: "nearest", inline: "center" });
      }
    }
  }, [maxRouteValue?.maxTotal]);

  const parseFile = () => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    setMaxRouteValue(null);
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      let data = [];
      const text = event.target?.result;
      if (!text) {
        return;
      }
      const lines = text.toString().split("\n");
      for (const line of lines) {
        data.push(
          line
            .split(" ")
            .filter((item) => !Number.isNaN(Number.parseInt(item)))
            .map((item) => Number.parseInt(item)),
        );
      }
      setTriangleData(data);
      const { maxTotal, values, path } = calculateMaxRouteValue(data);

      setMaxRouteValue({ maxTotal, values, path });
    });
    reader.readAsText(file);
  };

  const clearDropzone = () => {
    setFile(null);
    setTriangleData([]);
    setMaxRouteValue(null);
  };

  return (
    <div className="bg-gray-100">
      <main className={`mx-auto flex min-h-screen max-w-7xl flex-col p-24`}>
        <title>Triangle Problem | Mean Labs</title>
        <div
          {...getRootProps({
            className:
              "w-full min-w-full max-w-7xl bg-white p-4 text-center h-[200px] shadow-card rounded-lg flex items-center justify-center cursor-pointer mb-6",
          })}
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">Drag your files here</p>
        </div>
        {file && (
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <h4 className="font-bold">File:</h4>
              <ul>
                <li key={file.name} className="text-gray-600">
                  {file?.name}
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end">
              <button
                className="ml-8 mt-4 min-w-[200px] rounded-md border border-black px-8 py-4 hover:bg-black hover:text-white"
                onClick={parseFile}
              >
                Process file
              </button>
              <button
                className="ml-8 mt-4 min-w-[200px] rounded-md border border-red-600 px-8 py-4 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={clearDropzone}
              >
                Reset
              </button>
            </div>
          </div>
        )}
        {triangleData.length > 0 && maxRouteValue?.maxTotal && (
          <div className="mt-8">
            <div>
              <h4 className="mb-4 text-xl">
                Max Value:{" "}
                <span className="font-bold">{maxRouteValue?.maxTotal}</span>
              </h4>
            </div>

            <div className="max-w-7xl overflow-y-auto rounded-xl bg-gray-200 p-12">
              <div className="flex w-fit flex-col ">
                <DataInTriangle
                  triangleData={triangleData}
                  maxRouteValue={maxRouteValue}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
