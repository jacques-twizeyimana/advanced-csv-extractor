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
    <table className="w-full mt-5">
      {showHeader && (
        <thead>
          <tr>
            {Object.values(data[0]).map((key, index) => (
              <th key={index} scope="col p-2 text-xs" className="border">
                {key}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.slice(1).map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td scope="col" className="border px-2 text-sm" key={index}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
