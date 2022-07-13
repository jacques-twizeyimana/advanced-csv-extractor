import { useState } from "react";
import { IconNames } from "../../types/props";
import FilePicker from "../atoms/FilePicker";
import Icon from "../atoms/Icon";
import Papa from "papaparse";

interface IData {
  [key: string]: string | number | boolean;
}

export default function Import() {
  const [step, setStep] = useState(0);
  const [hasError, sethasError] = useState(false);
  const [data, setData] = useState<IData[]>([]);

  const steps: IconNames[] = ["upload", "process", "table"];

  const handleParse = (file: File) => {
    sethasError(false);
    try {
      console.log(file);
      Papa.parse<any>(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {
          try {
            console.log(results.data);
            setData(results.data);
            setStep(1);
          } catch (error) {
            sethasError(true);
          }
        },
        error: function (err) {
          sethasError(true);
        },
      });
    } catch (error) {
      sethasError(true);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between gap-6 pb-6 border-b">
        {steps.map((icon, index) => (
          <Icon
            key={index}
            name={icon}
            size={30}
            className={`${
              index === step ? "text-primary-500" : "text-neutral-500"
            }`}
          />
        ))}
      </div>
      <div className="py-6">
        {step === 0 ? (
          <div>
            <p className="text-base pb-2">Import CSV file</p>
            <div className="w-full">
              <FilePicker
                placeholder={"No file selected"}
                hasError={hasError}
                handleUpload={handleParse}
                accept=".csv"
              />
            </div>
            <div className="pt-6">
              <button className="bg-neutral-800 text-white font-bold py-3 px-6 rounded-lg">
                Process data
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <div>
            <p className="text-base pb-2">Preview</p>
            <table className="w-full">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key, index) => (
                    <th key={index} scope="col p-2" className="border">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td scope="col" className="border px-2" key={index}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : step === 2 ? (
          <div>
            <p className="text-base pb-2">Import</p>
            <div className="w-full">
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg">
                Import
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
