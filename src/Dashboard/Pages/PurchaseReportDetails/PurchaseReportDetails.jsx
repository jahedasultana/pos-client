import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PurchaseReportTable from "./PurchaseReportTable";

const PurchaseReportDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [payAmount, SetPayAmount] = useState({ payable: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [tableShow,setTableShow] = useState()

  const due = products?.payableMoney - products?.moneyGiven;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://pos-soft-server.vercel.app/single-product-report/${id}`
      );
      setProducts(res.data);
      setTableShow(res.data?.serilalPay)
    };

    fetchData();
  }, [id, refetch]);


  console.log(products);


  const handleUpdate = async () => {
    if (payAmount <= 0) {
      Swal.fire({
        title: "Error!",
        text: "Payable amount must be greater than 0",
        icon: "error",
        timer: 5000,
      });
      return;
    } else if (due < payAmount) {
      Swal.fire({
        title: "Error!",
        text: "No allow big amount from pay amount",
        icon: "error",
        timer: 5000,
      });
      return;
    }

    const data = {
      payableMoney: products?.payableMoney,
      payAmount,
      date: selectedDate,
    }

    try {
      const res = await axios.put(
        `https://pos-soft-server.vercel.app/update-pay-amount/${id}`,
        data
      );
      if (res.data) {
        Swal.fire({
          title: "Success!",
          text: "জমা হয়েছে",
          icon: "success",
          timer: 5000,
        });
        setRefetch(!refetch);
        SetPayAmount({ payable: "" });
        setSelectedDate("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-10">
      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl mb-2"><span className="uppercase font-extrabold underline text-[#e94374f5]">{products?.companyName}</span> কোম্পানির দেনা পাওনার হিসাব</h2>
          <button
            disabled={products?.payableMoney === products?.moneyGiven}
            onClick={handleUpdate}
            className={`p-2 ${
              products?.payableMoney === products?.moneyGiven
                ? "bg-gray-400 cursor-wait text-white px-3 py-2 mt-2 rounded-md"
                : "bg-[#e94374f5] text-white px-3 py-2 mt-2 rounded-md"
            }`}
          >
            জমা করুন 
          </button>
        </div>
        <div className="flex justify-between">
          <p className=" font-semibold">
            <strong>মোট ক্রয় হিসাব:</strong> {products?.payableMoney} ৳
          </p>
          <p className=" font-semibold">
            <strong>জমা:</strong> {products?.moneyGiven} ৳
          </p>
          <p className=" font-semibold">
            <strong>বকেয়া:</strong> {due} ৳
          </p>
          <div className="pb-3 -mt-1 flex gap-3 items-center font-semibold">
            <p>বকেয়া জমা</p>
            {products?.payableMoney === products?.moneyGiven ? (
              <p className="text-white px-3 py-2 mt-2 rounded-md bg-[#e94374f5] font-semibold">
                বাকি নাই
              </p>
            ) : (
              <input
                disabled={products?.payableMoney === products?.moneyGiven}
                type="text"
                name="price"
                id="price"
                placeholder="zoma"
                value={payAmount.payable}
                onChange={(e) => SetPayAmount(e.target.value)}
                className=" border-2 w-1/2"
              />
            )}
          </div>
          <div className="pb-3 flex gap-2 -mt-2 -ml-16 items-center font-semibold">
            <p>তারিখ </p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* table */}
      <PurchaseReportTable tableShow={tableShow}></PurchaseReportTable>
    </section>
  );
};

export default PurchaseReportDetails;