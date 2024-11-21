import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import ProductsBuyReport from './ProductsBuyReport';

const CompanyProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const [selectedDate, setSelectedDate] = useState("");
  const [reface,setReface] = useState(false)

  const onSubmit = async (data) => {
    const productsBuyDetails = {
      companyName: data.companyName,
      payableMoney: data.payableMoney,
      moneyGiven: data.moneyGiven,
      date: data.date,
    };

    try {
      const response = await axios.post('https://pos-soft-server.vercel.app/company-products', productsBuyDetails);
      console.log('Response from backend:', response.data);

      if (response.data.result.insertedId) {
        setReface(true)
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "সেভ হয়েছে ।",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error submitting data:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
    }
  };


  return (
    <div className="mx-auto bg-red-200 min-h-screen">
     <div>
     <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold">কোম্পানির তথ্য</h2>
        <div className="md:grid md:grid-cols-2 md:justify-center md:items-center gap-5">
          <div className="flex flex-col space-y-2">
            <label htmlFor="companyName" className="font-medium">
              কোম্পানির নামঃ
            </label>
            <input
              type="text"
              id="companyName"
              className="p-2 border border-gray-300 rounded"
              {...register('companyName', { required: 'Company Name is required' })}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">
                {errors.companyName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="payableMoney" className="font-medium">
              মোট ক্রয় টাকাঃ
            </label>
            <input
              type="number"
              id="payableMoney"
              className="p-2 border border-gray-300 rounded"
              {...register('payableMoney', { required: 'Payable Money is required', min: 1 })}
            />
            {errors.payableMoney && (
              <span className="text-red-500 text-sm">
                {errors.payableMoney.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="moneyGiven" className="font-medium">
              টাকা প্রদান করেছেন
            </label>
            <input
              type="number"
              id="moneyGiven"
              className="p-2 border border-gray-300 rounded"
              {...register('moneyGiven', {
                required: 'Money Given is required',
                min: {
                  value: 1,
                  message: '০ টাকা দিতে পারবে না',
                },
                validate: (value) => value <= +document.getElementById("payableMoney").value || "ক্রয়কৃত করা টাকার বেশি দেওয়া যাবে না।"
              })}
            />
            {errors.moneyGiven && (
              <span className="text-red-500 text-sm">
                {errors.moneyGiven.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="companyName" className="font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="p-2 border border-gray-300 rounded"
              {...register('date', { required: 'date is required' })}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">
                {errors.date.message}
              </span>
            )}
          </div>

        </div>

        <div className="flex justify-center mb-12">
          <button
            type="submit"
            className="w-1/2 bg-[#dc4b76f5] text-white p-3 rounded-md font-semibold"
          >
            জমা করুন
          </button>
        </div>
      </form>
     </div>

     {/* table */}
     <ProductsBuyReport reface={reface}></ProductsBuyReport>
    </div>
  );
};

export default CompanyProductForm;