import { useEffect, useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import axios from '../helpers/axios';
import PaymentDetails from "./Modals/PaymentDetails";

const PaymentHistory = (props) => {
  const [openTable, setOpenTable] = useState(true);
  const [payments, setPayments] = useState([]);
  const [hist, setHistory] = useState([]);

  useEffect(() => {
    const getPayments = async () => {
      const _payments = await axios.get('/api/payments');
      const _history = _payments.data;

      // Sort payments data order by descending;
      
      _history.sort((a, b) => b.id - a.id);
      setPayments(_history);
    };

    getPayments();

    // if a new payment is made refresh
    if(props.refresh) {
      getPayments();
      props.refreshHistory(false);
    }
  }, [props, props.refresh])
  const [openDetails, setOpenDetails] = useState(false);

  function handleOpenHistoryModal(history) {
    setHistory(history);
    setOpenDetails(true)
  }

  return (
    <>
      <div className="text-blue-700 font-semibold text-xl flex items-center gap-x-2 mb-4">
        <h2>Payment history</h2>
        <span
          onClick={() => setOpenTable(!openTable)}
          className="cursor-pointer hover:transform hover:scale-110"
        >
          <IoChevronDownCircleOutline />
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="md:table-fixed w-full">
          <thead className="text-left font-medium text-blue-700">
            <tr className="text-sm text-center border-0 border-y-[1px] border-blue-200">
              <th className="py-3 text-left">Recipient</th>
              <th>Amount In Sats</th>
              <th>BTC/USD Ratio </th>
              <th>Transactions</th>
              {/* <th>Date</th>
              <th>Status</th> */}
            </tr>
          </thead>
          {openTable && (
            <tbody className="text-grey-700 text-sm">
              {payments.length > 0 ? (
                payments.map((history) => (
                  <tr
                    key={history.id}
                    onClick={() => handleOpenHistoryModal(history.payments)}
                    className="text-center border-0 border-y-[1px] border-blue-200 cursor-pointer hover:bg-blue-200"
                  >
                    <td className="py-3 text-left">{history.ln_address}</td>
                    <td>{history.amount} Sats</td>
                    <td>{history.btc_usd_ratio}</td>
                    <td>{history.payments.length}</td>
                  </tr>
                ))
              ) : (
                <tr className="empty text-center">
                  <td colSpan={4}>You have not made any transactions </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
        {openDetails &&  <PaymentDetails history={hist} setIsOpen={setOpenDetails}/>}
      </div>
    </>
  );
};

export default PaymentHistory;
