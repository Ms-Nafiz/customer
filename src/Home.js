// external
import * as XLSX from "xlsx";
import { PreparedData } from "./utilities/PreparedData";
import { useEffect, useState } from "react";
import { DataFetchingComponent } from "./utilities/ApiHandle";
import axios from "axios";

function Home() {
  const getData = PreparedData();
  const areaList = DataFetchingComponent();
  // console.log(areaList['Madhurika']);
  const getMobile = (arr) => {
    let lastIndexOfAddress = arr[3].length - 1;
    let mobile = arr[3][lastIndexOfAddress];
    let actualMobileNumber = mobile.slice(2);

    return actualMobileNumber;
  };

  const flattenData = getData.map((row) => {
    const [id, code, name, addressArray] = row;
    return [id, code, name, ...addressArray];
  });
  // console.log(flattenData)

  const headers = [
    "cus_id",
    "name",
    "mobile",
    "area",
    "building",
    "house",
    "flat",
    "road",
    "conn_type",
  ];
  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...flattenData]); // Convert JSON data to sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Append the sheet to the workbook
    XLSX.writeFile(wb, "table_data.xlsx"); // Export the workbook as an Excel file
  };
  const [receivedData, setReceivedData] = useState(null);

  let url = "http://127.0.0.1:8000/api/new-connection-list";
  useEffect(() => {
    // Fetch data from the Laravel API
    axios
      .post(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  // console.log(receivedData);
  return (
    <div className="bg-white p-2 w-full">
      <h1 className="text-center text-xl font-semibold text-indigo-500">
        Customers Data ({getData.length})
      </h1>
      <button onClick={exportToExcel}>Excel</button>
      <table id="customers" className="w-full text-xs">
        <thead>
          <tr className="text-left">
            <th className="p-1 border-b border-gray-400">cus_id</th>
            <th className="p-1 border-b border-gray-400">reff_id</th>
            <th className="p-1 border-b border-gray-400">name</th>
            <th className="p-1 border-b border-gray-400">mobile</th>
            <th className="p-1 border-b border-gray-400">area</th>
            <th className="p-1 border-b border-gray-400">building</th>
            <th className="p-1 border-b border-gray-400">house</th>
            <th className="p-1 border-b border-gray-400">flat</th>
            <th className="p-1 border-b border-gray-400">road</th>
            <th className="p-1 border-b border-gray-400">conn_type</th>
            <th className="p-1 border-b border-gray-400">conn_status</th>
          </tr>
        </thead>
        <tbody>
          {getData.map((data, index) => (
            <tr key={index}>
              <td className="p-1 border-b border-gray-400"> {data[1]}</td>
              <td className="p-1 border-b border-gray-400"></td>
              <td className="p-1 border-b border-gray-400"> {data[2]}</td>
              <td className="p-1 border-b border-gray-400">
                {" "}
                {getMobile(data)}
              </td>
              <td className="p-1 border-b border-gray-400">
                {" "}
                {areaList[data[3][2]]}
              </td>
              <td className="p-1 border-b border-gray-400"> {data[3][2]}</td>
              <td className="p-1 border-b border-gray-400"> {data[3][0]}</td>
              <td className="p-1 border-b border-gray-400"> {data[3][1]}</td>
              <td className="p-1 border-b border-gray-400"> </td>
              <td className="p-1 border-b border-gray-400">
                {" "}
                {data[3].includes("Digital") ? "D" : "A"}
              </td>
              <td className="p-1 border-b border-gray-400">Active</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
