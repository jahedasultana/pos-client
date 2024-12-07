import React, { useEffect, useState } from "react";
import axios from "axios";

const CashSaleReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get("https://pos-soft-server.vercel.app/nagad-sale-report")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-[#EA4877] text-left text-white">
            <th className="px-4 py-2 border">ক্রমিক</th>
            <th className="px-4 py-2 border">তারিখ</th>
            <th className="px-4 py-2 border">ক্রেতার নাম</th>
            <th className="px-4 py-2 border">পণ্য</th>
            <th className="px-4 py-2 border">ঠিকানা</th>
            <th className="px-4 py-2 border">মোবাইল</th>
            <th className="px-4 py-2 border">বাকি</th>
            <th className="px-4 py-2 border">মোট মূল্য</th>
          </tr>

        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.sl} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{row.sl}</td>
              <td className="px-4 py-2 border">{row.date}</td>
              <td className="px-4 py-2 border">{row.customerName}</td>
              <td className="px-4 py-2 border">{row.products}</td>
              <td className="px-4 py-2 border">{row.address}</td>
              <td className="px-4 py-2 border">{row.mobile}</td>
              <td className="px-4 py-2 border">{row.due}</td>
              <td className="px-4 py-2 border">{row.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashSaleReport;