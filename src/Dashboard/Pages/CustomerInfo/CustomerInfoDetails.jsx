import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerInfoDetails = () => {
    const [details,setDetails] = useState([]);
    const {id} = useParams()
    const productsMap = details?.products || [];
    const customerPayments = details?.customerPayments || [];

    console.log(customerPayments);

    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(`https://pos-soft-server.vercel.app/customers-info/${id}`);
            setDetails(res.data)
        }
        fetchData()
    },[id])


    return (
       <section>
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Customer Details</h2>

            {/* Customer Basic Information */}
            <div className="flex flex-col flex-wrap gap-4 mb-6">
                    <span className="bg-slate-600 px-2 w-[20%] text-white">Customer Details</span>
                <div className="">
                    <p><strong>Name:</strong> {details.customerData?.label}</p>
                    <p><strong>Mobile:</strong> {details.customerData?.mobile}</p>
                    <p><strong>Address:</strong> {details.customerData?.address}</p>
                    <p><strong>Father/Husband's Name:</strong> {details.customerData?.fatherOrHusbandName}</p>
                </div>
            </div>

            {/* Granter Information */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Granter Information</h3>
                <div className="flex md:flex-row flex-col flex-wrap gap-4">
                    <div className="flex-1">
                        <p><strong>Granter 1 Name:</strong> {details.customerData?.GranterName1}</p>
                        <p><strong>Granter 1 Mobile:</strong> {details.customerData?.GranterNumber1}</p>
                        <img src={details.customerData?.granterPicture1} alt="Granter 1" className="w-24 h-24 rounded-lg shadow-lg" />
                    </div>
                    <div className="flex-1">
                        <p><strong>Granter 2 Name:</strong> {details.customerData?.GranterName2}</p>
                        <p><strong>Granter 2 Mobile:</strong> {details.customerData?.GranterNumber2}</p>
                        <img src={details.customerData?.granterPicture2} alt="Granter 2" className="w-24 h-24 rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* Transaction Information */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Transaction Information</h3>
                <p className="font-bold text-gray-900/80">Transaction Date: {details.customerData?.date}</p>
                <p><strong>Total Amount:</strong> {details.totalAmount}</p>
                {/* <p><strong>Subtotal:</strong> {details.subtotal}</p> */}
                <p><strong>Discount:</strong> {details.discount}</p>
                <p><strong>Cash Paid:</strong> {details.cashPaid}</p>
                <p><strong>Due:</strong> {details.due}</p>
            </div>

            {/* Product Details */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Products</h3>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Index</th>
                            <th className="py-2 px-4 border">Product Name</th>
                            <th className="py-2 px-4 border">Quantity</th>
                            <th className="py-2 px-4 border">Rate</th>
                            <th className="py-2 px-4 border">Total</th>
                            {/* <th className="py-2 px-4 border">Total</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {productsMap.map((product, index) => (
                            <tr key={index} className="text-center">
                                <td className="py-2 px-4 border">{index +1}</td>
                                <td className="py-2 px-4 border">{product.product}</td>
                                <td className="py-2 px-4 border">{product.qty}</td>
                                <td className="py-2 px-4 border">{product.rate}</td>
                                <td className="py-2 px-4 border">{product.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

            <section className="py-10">
                <p className="py-2">Payment Information</p>
                {/* payments given data */}
            {
                customerPayments.length == 0 ?
                <p className="py-5 text-3xl text-red-400/50 text-center">Payment not yet</p>
                 :
                 <div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Index</th>
                            <th className="py-2 px-4 border">বাকি</th>
                            <th className="py-2 px-4 border">জমা</th>
                            <th className="py-2 px-4 border">পাব</th>
                            <th className="py-2 px-4 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerPayments.map((product, index) => (
                            <tr key={index} className="text-center">
                                <td className="py-2 px-4 border">{index +1}</td>
                                <td className="py-2 px-4 border">{product.previousDue}</td>
                                <td className="py-2 px-4 border">{product.payammount}</td>
                                <td className="py-2 px-4 border">{parseInt(product?.previousDue) - parseInt(product?.payammount)}</td>
                                <td className="py-2 px-4 border">{product.paidDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
            </section>
        
        </div>
       </section>
    );
};

export default CustomerInfoDetails;