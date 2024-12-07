import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/useAuth";

const DashboardLayout = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logOut()
        navigate('/')
    }

    return (
        <div className="flex">
            <div className="w-[18%] bg-[#dc4b76f5] min-h-screen ">
                <ul className="space-y-4 items-center p-4 text-white/95">
                    <li className="hover:underline"><Link className="text-base font-semibold" to='/dashboard'>হোম</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='sales'>বাকীতে বিক্রয়</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='all-sales-report'>বাকী বিক্রয় রিপোর্ট</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to="products-list">সকল পণ্য</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='customer-info'>বাকী বিক্রয় রিপোর্ট এবং পরিশোধ</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='add-product'>পণ্য যোগ করুন</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='add-customer'>কাস্টমার যোগ করুন</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='cash-sales'>নগদ বিক্রয়</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='cash-sales-report'>নগদ বিক্রয় রিপোর্ট</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='products-buy'>কোম্পানি থেকে ক্রয়</Link></li>
                    <li className="hover:underline"><Link className="text-base font-semibold" to='purchase-report'>কোম্পানি থেকে ক্রয় রিপোর্ট</Link></li>
                    <li className="hover:underline"><button className="px-8 py-1 mt-10 bg-[#8d56668e] border" onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
            <div className="w-[82%] pr-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;