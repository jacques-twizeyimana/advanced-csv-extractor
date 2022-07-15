import { IData } from "../../types/props";

interface ITableProps {
  data: IData[];
  showHeader?: boolean;
  startingRow?: number;
}

export default function Table({
  data,
  showHeader = true,
  startingRow = 0,
}: ITableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-5">
        {showHeader && (
          <thead>
            <tr>
              <th scope="col" className="border p-2 text-sm">
                #
              </th>
              {Object.values(data[0]).map((key, index) => (
                <th key={index} scope="col" className="border p-2 text-sm">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.slice(1).map((row, index) => (
            <tr key={index}>
              <td className="border px-2 text-sm">{index + startingRow + 1}</td>
              {Object.values(row).map((value, index) => (
                <td scope="col" className="border px-2 text-sm" key={index}>
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
