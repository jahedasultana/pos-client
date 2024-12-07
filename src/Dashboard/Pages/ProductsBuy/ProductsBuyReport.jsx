import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UpdatePopup = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    payableMoney: '',
    moneyGiven: '',
    date: '',
  });
  const newData = item;
  const getId = newData._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = getId;
    const data = formData;

    const { payableMoney, moneyGiven } = data;

    // ভ্যালিডেশন চেক
    if (moneyGiven <= 0) {
      Swal.fire({
        title: "Error",
        text: "Given Money ০ টাকা হতে পারবে না।",
        icon: "error"
      });
      return;
    }

    if (parseInt(moneyGiven) > parseInt(payableMoney)) {
      Swal.fire({
        title: "Error",
        text: "Given Money, Payable Money থেকে বেশি হতে পারবে না।",
        icon: "error"
      });
      return;
    }

    try {
      const res = await axios.put(`https://pos-soft-server.vercel.app/payment-update/${id}`, data)
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "WOW",
          text: "Order Pay Successfull",
          icon: "success"
        });
        onClose()
        onUpdate()
      }
    } catch (error) {
      console.log("the error is", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4"><span className='underline text-[#e94374f5]'>{item.companyName}</span> Company Update Money</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Payable Money</label>
            <input
              type="text"
              name="payableMoney"
              placeholder=''
              value={formData.payableMoney}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Given Money</label>
            <input
              type="number"
              name="moneyGiven"
              value={formData.moneyGiven}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductsBuyReport = (reface) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    const res = await axios.get('https://pos-soft-server.vercel.app/company-buy-report');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [reface]);

  return (
    <section className="p-10">
      <div className="flex justify-between pb-2">
        <h2>ক্রয় পন্যের রিপোর্ট</h2>
        <p className="text-black/70 text-lg font-bold">যদি উক্ত কোম্পানি থাকে, তাহলে শুধু টাকা যোগ কর</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="bg-gray-400/45">
              <th className="px-4 py-2 text-center text-xs font-medium text-black/75 uppercase tracking-wider border border-gray-300">
                ক্রম
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-black/75 uppercase tracking-wider border border-gray-300">
                কোম্পানির নাম
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-black/75 uppercase tracking-wider border border-gray-300">
                কোম্পানি পাবে
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-black/75 uppercase tracking-wider border border-gray-300">
                প্রদান করেছি
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-black/75 uppercase tracking-wider border border-gray-300">
                বাকি
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-black/75 uppercase tracking-wider border border-gray-300">
                সর্বশেষ কেনার তারিখ
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-black/75 uppercase tracking-wider border border-gray-300">
                আরও যোগ করুন
              </th>
            </tr>

          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className='text-center'>
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
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                  {item.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300 flex justify-center">
                  <button
                    className="p-1 bg-[#e94374f5] text-white uppercase font-medium rounded-md"
                    onClick={() => setSelectedItem(item)}
                  >
                    Update Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItem && (
        <UpdatePopup
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={fetchData}
        />
      )}
    </section>
  );
};

export default ProductsBuyReport;
