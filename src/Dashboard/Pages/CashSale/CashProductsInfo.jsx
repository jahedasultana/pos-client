import { useForm } from "react-hook-form";
import { useAuth } from "../../../provider/useAuth";

const CashProductsInfo = () => {
    const { register, handleSubmit, watch, setValue, reset } = useForm();
    const { setCashCart, cashCart , setCashSubTotal } = useAuth()
    const cart = cashCart || []
    // console.log("hhhh",cart);

    // Watch rate and qty to calculate the total
    const rate = watch("rate");
    const qty = watch("qty");

    const calculateTotal = () => {
        const total = parseFloat(rate || 0) * parseFloat(qty || 0);
        setValue("total", total);
    };

    // Trigger calculation when rate or qty changes
    calculateTotal();

    const onSubmit = (data) => {
        reset()
        setCashCart([...cart, data]);
        // console.log("Form Data:", data);
        setCashSubTotal((prevData) => prevData + (data?.total || 0));
    };

    // setCashSubTotal(data?.total)

    return (
        <div>
            <div className="bg-red-200 border border-red-500 p-1 mb-2 rounded text-sm">
                <h2 className="font-bold mb-2">প্রোডাক্টের তথ্য</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Product Name Select */}
                    <div className="mb-2 flex items-center justify-center">
                        <label htmlFor="product" className="mr-2 w-[20%]">
                            প্রোডাক্ট
                        </label>
                        <input
                            type="text"
                            id="product"
                            name="product"
                            placeholder="Select Product"
                            className="border p-1 rounded w-[80%]"
                            {...register("product", { required: true })}
                        />
                    </div>

                    {/* Sale Rate */}
                    <div className="mb-2 flex items-center justify-center">
                        <label htmlFor="rate" className="mr-2 w-[20%]">
                            বিক্রয় মূল্য
                        </label>
                        <input
                            type="number"
                            id="rate"
                            name="rate"
                            placeholder="Rate"
                            className="border p-1 rounded w-[80%]"
                            {...register("rate", { required: true })}
                        />
                    </div>

                    {/* Quantity */}
                    <div className="mb-2 flex items-center justify-center">
                        <label htmlFor="qty" className="mr-2 w-[20%]">
                            পরিমান
                        </label>
                        <input
                            type="number"
                            id="qty"
                            name="qty"
                            placeholder="Quantity"
                            className="border p-1 rounded w-[80%]"
                            {...register("qty", { required: true })}
                        />
                    </div>

                    {/* Total */}
                    <div className="mb-2 flex items-center justify-center">
                        <label htmlFor="total" className="mr-2 w-[20%]">
                            মোট টাকা
                        </label>
                        <input
                            type="number"
                            id="total"
                            name="total"
                            placeholder="Total"
                            className="border p-1 rounded w-[80%] outline-none"
                            readOnly
                            {...register("total")}
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#e94374f5] text-white font-semibold px-3 py-2 rounded-md"
                        >
                            কার্ডে যুক্ত করুন
                        </button>
                    </div>
                </form>
            </div>

            {/* Display Cart Items */}
            <div className="mt-4">
                <h3 className="font-bold">কার্ড আইটেম:</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.product} - Qty: {item.qty}, Total: {item.total}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CashProductsInfo;
