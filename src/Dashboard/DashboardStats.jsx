import axios from "axios";
import { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaDonate } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";

const DashboardStats = () => {
    const [stats, setStats] = useState();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Fetch data from the server
    const fetchTotalSum = async (startDate, endDate) => {
        try {
            const params = {};
            if (startDate && endDate) {
                params.startDate = startDate;
                params.endDate = endDate;
            }

            const response = await axios.get("https://pos-soft-server.vercel.app/calculate-totals", {
                params,
            });

            console.log(response.data);
            setStats(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Initial fetch (all data)
    useEffect(() => {
        fetchTotalSum();
    }, []);

    // Handle button click for date-wise filtering
    const handleFilter = () => {
        if (startDate && endDate) {
            fetchTotalSum(startDate, endDate);
        } else {
            alert("Please select both start and end dates.");
        }
    };

    return (
        <section>
            {/* Sale count stats */}
            <div className='p-4 bg-[#dd527b]/40 space-y-3 mt-8 border border-[#dd527b] rounded-md'>
                <h1 className='text-white md:text-4xl font-bold pb-3'>মোট বিক্রয় রিপোর্ট</h1>
                <div className='flex gap-5 items-center justify-start'>
                    <input
                        onChange={(e) => setStartDate(e.target.value)}
                        className='block px-2 py-1 bg-white/50 border border-[#dd527b] rounded-md'
                        type='date'
                        name='start'
                        id='start'
                    />
                    <input
                        onChange={(e) => setEndDate(e.target.value)}
                        className='block px-2 py-1 bg-white/50 border border-[#dd527b] rounded-md'
                        type='date'
                        name='end'
                        id='end'
                    />
                    <button
                        onClick={handleFilter}
                        className='block px-2 py-[5px] bg-[#F46C6C] border text-white font-bold rounded-md shadow-md'
                    >
                        রিপোর্ট দেখুন
                    </button>
                </div>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                    <div className='rounded-md bg-gradient-to-r from-[#F46C6C] to-white border border-gray-200/70 px-6 py-3 flex items-center justify-between h-[140px]'>
                        <div className='space-y-2 text-center text-white'>
                            <h4 className='text-3xl font-semibold'>মোট বিক্রয়</h4>
                            <p className="text-2xl">{stats?.totalSale || 0}</p>
                        </div>
                        <GiTakeMyMoney className="text-green-600" size={100}></GiTakeMyMoney>
                    </div>
                    <div className='rounded-md bg-gradient-to-r from-[#F46C6C] to-white  border border-gray-200/90 px-6 py-3 flex items-center justify-between h-[140px]'>
                        <div className='space-y-2 text-center text-white'>
                            <h4 className='text-3xl font-semibold'>নগদ বিক্রয়</h4>
                            <p className="text-2xl">{stats?.nagad || 0}</p>
                        </div>
                        <FaDonate className="text-[#CE5374]" size={75}></FaDonate>
                    </div>
                    <div className='rounded-md bg-gradient-to-r from-[#F46C6C] to-white  border border-gray-200 px-6 py-3 flex items-center justify-between h-[140px]'>
                        <div className='space-y-2 text-center text-white'>
                            <h4 className='text-3xl font-semibold'>বাকী বিক্রয়</h4>
                            <p className="text-2xl">{stats?.due || 0}</p>
                        </div>
                        <TbCoinTakaFilled className="text-blue-700" size={80}></TbCoinTakaFilled>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardStats;
