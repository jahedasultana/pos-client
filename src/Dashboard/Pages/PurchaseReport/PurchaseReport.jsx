import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PurchaseReport = () => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    // Fetch purchase report from the server
    const fetchData = async () => {
      const res = await axios.get('https://pos-soft-server.vercel.app/purchase-report')
      setData(res.data)
    }
    fetchData()
  }, []);

  return (
    <section className="p-10">
      <h2>ক্রয় পন্যের রিপোর্ট</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-[#DD5079] text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                ক্রম
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                কোম্পানির নাম
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                কোম্পানি পাবে
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                প্রদান করেছি
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                বাকি
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                বিবরণ
              </th>
            </tr>

          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                  {item.companyName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                  {item.payableMoney}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                  {item.moneyGiven}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                  {parseInt(item.payableMoney) - parseInt(item.moneyGiven)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm border border-gray-300">
                  <Link className="bg-[#e94374f5] text-white font-semibold px-3 py-2 mt-2 rounded-md" to={`/dashboard/purchase-report/${item._id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PurchaseReport;
