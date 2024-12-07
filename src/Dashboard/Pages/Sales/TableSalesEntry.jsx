import { useAuth } from "../../../provider/useAuth";

const TableSalesEntry = () => {
    const { productsDetails, setSubtotalAmount } = useAuth()

    const grandTotal = productsDetails.reduce((acc, product) => acc + product.total, 0);
    setSubtotalAmount(grandTotal)

    return (
        <div className="table-section mt-9">
            <table className="min-w-full border-collapse border border-gray-300 ">
                <thead>
                    <tr className="bg-red-200">
                        <th className="border border-gray-300 p-2">ক্রমিক</th>
                        <th className="border border-gray-300 p-2">পণ্য</th>
                        <th className="border border-gray-300 p-2">পরিমাণ</th>
                        <th className="border border-gray-300 p-2">রেট</th>
                        <th className="border border-gray-300 p-2">মোট</th>
                    </tr>

                </thead>
                <tbody>

                    {
                        productsDetails.map((pro, index) => <tr key={index}>
                            <td className="border border-gray-300 p-2">{index + 1}</td>
                            <td className="border border-gray-300 p-2">{pro.product}</td>
                            <td className="border border-gray-300 p-2">{pro.qty}</td>
                            <td className="border border-gray-300 p-2">{pro.rate}</td>
                            <td className="border border-gray-300 p-2">{pro.total}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TableSalesEntry;