import CashAmount from "./CashAmount";
import CashCustomerInfo from "./CashCustomerInfo";
import CashProductsInfo from "./CashProductsInfo";

const CashSale = () => {
    return (
        <section className="h-screen bg-slate-200 grid md:grid-cols-3 grid-cols-1 gap-2 p-2">
            <CashCustomerInfo/>
            <CashProductsInfo/>
            <CashAmount/>
        </section>
    );
};

export default CashSale;