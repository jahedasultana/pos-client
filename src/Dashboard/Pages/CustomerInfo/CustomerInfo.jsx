import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [payammount, setPayammount] = useState("");
  const [paidDate, setpaidDate] = useState();
  const [fetch, setFetch] = useState(false);

  console.log("jjj", customers);

  const handleDelete = async (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the backend API to delete the item
          const response = await axios.delete(
            `https://pos-soft-server.vercel.app/paid-data-delete/${id}`
          );
          setFetch(true);
          Swal.fire("Deleted!", response.data.message, "success");
          // Optionally refresh or update the UI here
        } catch (error) {
          Swal.fire(
            "Error!",
            error.response?.data?.message || "Failed to delete the item.",
            "error"
          );
        }
      }
    });
  };

  // Fetching data from MongoDB via an API
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get(
          "https://pos-soft-server.vercel.app/customers-info"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
    fetchCustomers();
  }, [fetch]);

  const handlePay = async (customer) => {
    // console.log(customer,paidDate, payammount);

    const data = {
      paidDate,
      payammount,
      previousDue: customer?.due,
    };

    // console.log(data);

    if (!data.paidDate) {
      Swal.fire({
        title: "Wait!",
        text: "Please select a payment date.",
        icon: "error",
      });
      return;
    }

    if (payammount == data.previousDue) {
      Swal.fire({
        title: "Wait!",
        text: "already paid",
        icon: "error",
      });
      return;
    }

    // Check if payammount is more than due
    if (payammount > data.previousDue) {
      Swal.fire({
        title: "Wait!",
        text: "Payment amount cannot exceed the due amount.",
        icon: "error",
      });
      return;
    }

    // Check if payammount is valid (not negative or zero)
    if (payammount <= 0) {
      Swal.fire({
        title: "Wait!",
        text: "Please enter a valid payment amount.",
        icon: "error",
      });
      return;
    }

    try {
      const res = await axios.put(
        `https://pos-soft-server.vercel.app/customer-pay/${customer._id}`,
        { data }
      );
      console.log(res.data);
      if (res.data.result.modifiedCount > 0) {
        setFetch(!fetch);
        Swal.fire({
          title: "Wait!",
          text: "Pay Successfully",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 py-3 text-center bg-[#dc4b76f5]">
        বাকী বিক্রয় রিপোর্ট এবং পরিশোধ
      </h2>

      {customers && customers.length == 0 ? (
        <div className="h-[50vh]">
          <p className="text-4xl">no customer sale</p>
        </div>
      ) : (
        <section>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full p-3 mb-4 border border-red-700 rounded-lg shadow-sm bg-red-200 text-black"
          />

          {/* Responsive Table */}
          <div className="overflow-x-auto text-sm">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-red-200">
                <tr className="">
                  <th className="py-3">ক্রমিক</th>
                  <th className="py-3">নাম</th>
                  <th className="py-3">মোবাইল</th>
                  <th className="py-3">ঠিকানা</th>
                  <th className="py-3">বিক্রয়ের তারিখ</th>
                  <th className="py-3">মোট বাকি</th>
                  <th className="py-3">জমা দেওয়ার তারিখ</th>
                  <th className="py-3">জমা</th>
                  <th className="py-3">বিবরণ</th>
                  <th className="py-3 ">মুছে ফেলুন</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer, index) => {
                  return (
                    <tr key={customer._id} className="bg-gray-100">
                      <td className="py-3 px-3">{index + 1}</td>
                      <td className="py-3 px-3">
                        {customer.customerData?.label}
                      </td>
                      <td className="py-3 px-3">
                        {customer.customerData?.mobile}
                      </td>
                      <td className="py-3 px-3">
                        {customer.customerData?.address}
                      </td>
                      <td className="py-3 px-3">
                        {customer.date ? customer.date : "No Date"}
                      </td>
                      <td className="py-3 px-3">{customer.due}</td>
                      <td className="py-3">
                        <input
                          className="p-2 w-[120px]"
                          type="date"
                          name="paidDate"
                          id="paidDate"
                          onChange={(e) => setpaidDate(e.target.value)}
                        />
                      </td>
                      <td className="py-3 px-[3px] flex">
                        <input
                          className="w-[110px] border border-red-600/65 outline-none p-1"
                          type="number"
                          onChange={(e) => setPayammount(e.target.value)}
                        />
                        <button
                          onClick={() => handlePay(customer)}
                          className="bg-red-500 px-3 py-2 text-white ml-2 w-1/3"
                        >
                          Pay
                        </button>
                      </td>
                      <td>
                        <Link
                          to={`/dashboard/customer-info/${customer._id}`}
                          className="bg-[#e94374f5] text-white font-semibold px-3  py-2 mt-2 rounded-md"
                        >
                          সব দেখুন{" "}
                        </Link>
                      </td>
                      <td className="">
                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="bg-red-600/85 text-white font-semibold px-2 py-[6px] rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
