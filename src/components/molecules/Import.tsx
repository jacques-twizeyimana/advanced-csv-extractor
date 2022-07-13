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
  const [file, setFile] = useState<File>();
  const steps: IconNames[] = ["upload", "process", "table"];

  const [values, setValues] = useState({
    depth: "",
    inclination: "",
    azimuth: "",
    unitOfMeasurement: "",
    separator: ",",
    numHeaderRows: 2,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleParse = () => {
    sethasError(false);

    if (!file) return;
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
                handleUpload={(file) => setFile(file)}
                //  handleUpload={handleParse}
                accept=".csv"
              />
            </div>
            <div className="pt-6">
              <button
                className={`${
                  !file ? "bg-neutral-400" : "bg-neutral-800"
                } text-white font-bold py-3 px-6 rounded-lg`}
                disabled={!file}
                onClick={handleParse}
              >
                Process data
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <div>
            <div className="pb-5 max-w-4xl">
              <h2 className="text-xl font-bold">Define input data</h2>
              <div className="grid grid-cols-2 gap-6 py-5">
                <div>
                  <div className="py-1">
                    <label>Depth</label>
                    <select
                      className="w-full py-2 px-3 rounded-md text-sm"
                      name="depth"
                      onChange={handleChange}
                    >
                      {Object.keys(data[0]).map((key, index) => (
                        <option value={key} key={index}>
                          {key} (col {index + 1})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="py-1">
                    <label>Inclination</label>
                    <select
                      className="w-full py-2 px-3 rounded-md text-sm"
                      name="inclination"
                      onChange={handleChange}
                    >
                      {Object.keys(data[0]).map((key, index) => (
                        <option value={key} key={index}>
                          {key} (col {index + 1})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="py-1">
                    <label>Azimuth</label>
                    <select
                      className="w-full py-2 px-3 rounded-md text-sm"
                      name="azimuth"
                      onChange={handleChange}
                    >
                      {Object.keys(data[0]).map((key, index) => (
                        <option value={key} key={index}>
                          {key} (col {index + 1})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="py-1">
                    <label>Depth unit of measurement</label>
                    <select
                      className="w-full py-2 px-3 rounded-md text-sm"
                      name="unitOfMeasurement"
                      onChange={handleChange}
                    >
                      <option value={"ft"}>Feet</option>
                      <option value={"m"}>Meter</option>
                      <option value={"cm"}>Centimeter</option>
                      <option value={"km"}>Kilometer</option>
                    </select>
                  </div>
                  <div className="py-1">
                    <label>Decimal separator</label>
                    <select
                      className="w-full py-2 px-3 rounded-md text-sm"
                      name="separator"
                      onChange={handleChange}
                    >
                      <option value=".">Dot</option>
                      <option value=",">Comma</option>
                    </select>
                  </div>
                  <div className="py-1">
                    <label>Number of header rows</label>
                    <input
                      className="w-full py-2 px-3 rounded-md text-sm border border-gray-500"
                      type="number"
                      name="numHeaderRows"
                      onChange={handleChange}
                      value={values.numHeaderRows}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold">Preview</h2>
            <table className="w-full mt-5">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key, index) => (
                    <th key={index} scope="col p-2 text-xs" className="border">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td
                        scope="col"
                        className="border px-2 text-sm"
                        key={index}
                      >
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
