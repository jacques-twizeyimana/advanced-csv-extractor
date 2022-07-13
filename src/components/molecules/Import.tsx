import { useState } from "react";
import { IconNames } from "../../types/props";
import FilePicker from "../atoms/FilePicker";
import Icon from "../atoms/Icon";
import Papa from "papaparse";

export default function Import() {
  const [step, setStep] = useState(0);
  const [hasError, sethasError] = useState(false);

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
            // const parsed = parsePlayerTypes(results.data);
            // setParsedPlayers(parsed);
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
        <p className="text-base pb-2">Import CSV file</p>
        <div className="w-full">
          <FilePicker
            placeholder={"No file selected"}
            hasError={hasError}
            handleUpload={handleParse}
            accept=".csv"
          />
        </div>
      </div>
    </div>
  );
}
