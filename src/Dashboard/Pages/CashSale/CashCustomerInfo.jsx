import { useAuth } from "../../../provider/useAuth";

const CashCustomerInfo = () => {
    // const [formData, setFormData] = useState({
    //     customerName: "",
    //     address: "",
    //     mobile: "",
    // });

    const { setFormData} = useAuth()

    // console.log(formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <div className="bg-red-200 border border-red-500 p-2 rounded text-sm h-[270px]">
                <h2 className="font-bold mb-2">ক্রেতার তথ্য</h2>

                {/* Customer Select */}
                <div className="mb-2 flex items-center justify-center gap-2">
                    <label htmlFor="mobile" className="mr-2 w-[20%]">
                        Customer
                    </label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        onChange={handleInputChange}
                        placeholder="Customer Name"
                        className="border p-1 rounded w-[80%]"
                    />
                </div>

                {/* Mobile */}
                <div className="mb-2 flex items-center justify-center gap-2">
                    <label htmlFor="mobile" className="mr-2 w-[20%]">
                        মোবাইল
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        onChange={handleInputChange}
                        placeholder="Mobile No"
                        className="border p-1 rounded w-[80%]"
                    />
                </div>
                {/* Address */}
                <div className="flex items-center justify-center gap-2">
                    <label htmlFor="address" className="mr-2 w-[20%]">
                        ঠিকানা
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="border p-2 resize-none h-24  rounded w-[80%]"
                    />
                </div>
            </div>
        </div>
    );
};

export default CashCustomerInfo;