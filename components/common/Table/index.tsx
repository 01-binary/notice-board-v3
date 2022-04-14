/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";

interface Column {
  title: string;
  key: string;
}

interface Props {
  data: object[];
  columns: Column[];
  onClick?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

const Table: FC<Props> = ({ data, columns, onClick }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const { title, key } = column;
              return (
                <th
                  className="py-[16px] px-[24px] font-bold text-center bg-[aliceblue] border-b border-solid"
                  key={key}
                >
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((value: any, index: number) => {
            return (
              <tr
                className="hover:bg-[azure] cursor-pointer"
                key={index}
                onClick={onClick}
              >
                {Object.values(value).map((content, innerIndex) => {
                  return (
                    <td
                      className="py-[16px] px-[24px] font-medium text-center border-b border-solid"
                      key={`${index}_${innerIndex}`}
                    >
                      {content as string}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
