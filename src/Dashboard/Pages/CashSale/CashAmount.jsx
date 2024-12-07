import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../../provider/useAuth";
import axios from "axios";

const CashAmount = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const { cashSubTotal, cashCart, formData, resetCart } = useAuth();
    const cart = cashCart || [];

    // Initialize subtotal and watch inputs
    useEffect(() => {
        setValue("subtotal", cashSubTotal || 0); // Set default value for subtotal
    }, [cashSubTotal, setValue]);

    const subtotal = watch("subtotal", 0); // Default value
    const discount = watch("discount", 0); // Default value
    const cashPaid = watch("cashPaid", 0); // Default value

    // Real-time validation for cashPaid
    const totalAmount = parseFloat(subtotal || 0) * (1 - parseFloat(discount || 0) / 100);
    const cashPaidError =
        parseFloat(cashPaid) > totalAmount
            ? "ক্যাশ জমা মোট টাকা থেকে বেশি হতে পারবে না!"
            : parseFloat(cashPaid) < 0
            ? "ক্যাশ জমা ঋণাত্মক হতে পারবে না!"
            : null;

    useEffect(() => {
        const discountedAmount = parseFloat(subtotal || 0) * (1 - parseFloat(discount || 0) / 100);
        setValue("totalAmount", discountedAmount);
        const remainingDue = discountedAmount - parseFloat(cashPaid || 0);
        setValue("due", remainingDue);
    }, [subtotal, discount, cashPaid, setValue]);

    const onSubmit = async (data) => {
        if (!cashPaidError) {
            // console.log("Form Data:", { payments: data, products: cart, customerData: formData });
            const res = await axios.post('https://pos-soft-server.vercel.app/nagad-sale', { ...data, products: cart, customerData: formData })
            // if(res.data.insertedId)
            console.log(res.data);
            reset();
            resetCart();
        }
    };

    return (
        <section>
            <div className="relative">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-red-200 border border-red-500 p-1 rounded text-sm">
                        <h2 className="font-bold mb-2">লেনদেন তথ্য</h2>

                        {/* Date Field */}
                        <div className="mb-1">
                            <label htmlFor="date" className="mr-2">তারিখ</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="border p-1 rounded w-full"
                                {...register("date", { required: "এই ফিল্ডটি পূরণ করা আবশ্যক" })}
                            />
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                            )}
                        </div>

                        {/* Subtotal */}
                        <div className="mb-1 flex items-center">
                            <label htmlFor="subtotal" className="mr-2 w-[20%]">সাময়িক টাকা</label>
                            <input
                                readOnly
                                type="number"
                                id="subtotal"
                                name="subtotal"
                                className="border p-1 rounded w-[80%] outline-none bg-black/20"
                                {...register("subtotal")}
                            />
                        </div>

                        {/* Discount */}
                        <div className="mb-1 flex items-center">
                            <label htmlFor="discount" className="mr-2 w-[20%]">কমিশন</label>
                            <div className="flex gap-2 w-[80%] items-center">
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    placeholder="কমিশন"
                                    className="border p-1 rounded w-[90%]"
                                    {...register("discount")}
                                />
                                <span className="w-[10%]">%</span>
                            </div>
                        </div>

                        {/* Total Amount */}
                        <div className="mb-1">
                            <label htmlFor="totalAmount" className="mr-2">মোট টাকা</label>
                            <input
                                type="number"
                                id="totalAmount"
                                name="totalAmount"
                                placeholder="0"
                                className="border p-1 rounded w-full outline-none bg-black/20"
                                readOnly
                                {...register("totalAmount")}
                            />
                        </div>

                        {/* Cash Paid */}
                        <div className="mb-1">
                            <label htmlFor="cashPaid" className="mr-2">ক্যাশ জমা</label>
                            <input
                                type="number"
                                id="cashPaid"
                                name="cashPaid"
                                className={`border p-1 rounded w-full ${
                                    cashPaidError ? "border-red-500" : ""
                                }`}
                                placeholder="ক্যাশ জমা"
                                {...register("cashPaid", { required: "এই ফিল্ডটি পূরণ করা আবশ্যক" })}
                            />
                            {cashPaidError && (
                                <p className="text-red-500 text-sm mt-1">{cashPaidError}</p>
                            )}
                        </div>

                        {/* Previous Due */}
                        <div className="mb-1 w-[60%]">
                            <label htmlFor="due" className="mr-2">বাকী</label>
                            <input
                                type="number"
                                id="due"
                                name="due"
                                className="border p-1 rounded w-full outline-none bg-black/20"
                                readOnly
                                {...register("due")}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-[#e94374f5] text-white font-semibold px-3 py-2 mt-2 rounded-md"
                        >
                            বিক্রি নিশ্চিত করুন
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CashAmount;