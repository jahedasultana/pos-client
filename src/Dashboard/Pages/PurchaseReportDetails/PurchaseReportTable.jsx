const PurchaseReportTable = ({ tableShow }) => {
    const data = tableShow || []; // Default to an empty array if `tableShow` is undefined or null
  
    return (
      <section className="p-10">
       
        {data.length === 0 ? ''  : <h2 className="mb-5">Payable পন্যের রিপোর্ট</h2>}

        <div className="overflow-x-auto">
          {data.length === 0 ? (
            <div className="text-center text-gray-500 text-3xl">No Payable data available</div>
          ) : (
            <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                    Index
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                    Give money
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                    Date
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
                      {item.amount}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                      {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    );
  };
  
  export default PurchaseReportTable;
  