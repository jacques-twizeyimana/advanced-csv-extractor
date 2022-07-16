import { IData } from "../../types/props";

interface ITableProps {
  data: IData[];
  showHeader?: boolean;
  startingRow?: number;
}

function fourDigitNumber(num: number) {
  return String(num).padStart(4, "0");
}

export default function Table({
  data,
  showHeader = true,
  startingRow = 0,
}: ITableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-5">
        <thead>
          <tr className={`${!showHeader && "text-white"} border-collapse`}>
            <th
              scope="col"
              className={`border ${
                showHeader
                  ? "border-gray-100"
                  : "border-transparent border-b-gray-100"
              } p-2 text-sm`}
            >
              #
            </th>
            {Object.values(data[0]).map((key, index) => (
              <th
                key={index}
                scope="col"
                className={`border ${
                  showHeader
                    ? "border-gray-100"
                    : "border-transparent border-b-gray-100"
                } p-2 text-sm`}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, index) => (
            <tr key={index}>
              <td className="border px-2 text-sm">
                {fourDigitNumber(index + startingRow + 1)}
              </td>
              {Object.values(row).map((value, index) => (
                <td
                  scope="col"
                  className="border border-gray-100 px-2 text-sm"
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
  );
}
