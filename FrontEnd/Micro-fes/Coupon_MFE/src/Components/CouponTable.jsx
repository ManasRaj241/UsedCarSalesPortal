import React, { useState, useEffect } from 'react';

const CouponTable = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7001/api/Coupons');
        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (couponId) => {
    try {
      const response = await fetch(`https://localhost:7001/api/Coupons/${couponId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.couponId !== couponId));
      } else {
        console.error('Failed to delete coupon');
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded">
      <div className='bg-gray-500 flex justify-center'> 
        <h2 className=" p-10 text-6xl font-bold text-white mb-4">Coupon List</h2>
        </div>
      <div className='flex justify-end'>
      <button className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3 bg-green-500 mt-5 mb-5">
        Create New Coupon
      </button>
      </div>
      <table className="w-full table-auto bg-gray-700 text-2xl text-white divide-y divide-black">
        <thead>
          <tr>
            <th className="text-left px-6 py-4 whitespace-nowrap">Sl. No</th>
            <th className="text-left px-6 py-4 whitespace-nowrap">Coupon Code</th>
            <th className="text-left px-6 py-4 whitespace-nowrap">Discount Amount</th>
            <th className="text-left px-6 py-4 whitespace-nowrap">Min Amount</th>
            <th className="text-left px-6 py-4 whitespace-nowrap"></th>
            <th className="text-left px-6 py-4 whitespace-nowrap"></th>
          </tr>
        </thead>
        <tbody className='divide-y divide-black'>
          {coupons.map((coupon, index) => (
            <tr key={coupon.couponId}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coupon.couponCode}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coupon.discountAmount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coupon.minAmount}</td>
              <td>
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Update
                </button>
              </td>
              <td>
              <button
                  onClick={() => handleDelete(coupon.couponId)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;
