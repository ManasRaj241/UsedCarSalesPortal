import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

const CouponTable = () => {
  const token = Cookies.get('token');
  const [coupons, setCoupons] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    couponCode: '',
    discountAmount: '',
    minAmount: '',
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7001/api/Coupons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      const response = await fetch(
        `https://localhost:7001/api/Coupons/${couponId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setCoupons((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon.couponId !== couponId)
        );
      } else {
        console.error('Failed to delete coupon');
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleUpdate = (coupon) => {
    setSelectedCoupon(coupon);
    setNewCoupon({
      couponCode: coupon.couponCode,
      discountAmount: coupon.discountAmount.toString(),
      minAmount: coupon.minAmount.toString(),
    });
    setModalIsOpen(true);
  };

  const handleCreateOrUpdateCoupon = async () => {
    try {
      if (selectedCoupon) {
        const putId = selectedCoupon.couponId;
        const parsedDiscountAmount = parseInt(newCoupon.discountAmount, 10);
        const parsedMinAmount = parseInt(newCoupon.minAmount, 10);
        const response = await fetch(
          `https://localhost:7001/api/Coupons/${selectedCoupon.couponId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              couponId: putId,
              couponCode: newCoupon.couponCode,
              discountAmount: parsedDiscountAmount,
              minAmount: parsedMinAmount,
            }),
          }
        );

        if (response.ok) {
          setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
              coupon.couponId === selectedCoupon.couponId
                ? { ...coupon, ...newCoupon }
                : coupon
            )
          );
          setModalIsOpen(false);
          setNewCoupon({ couponCode: '', discountAmount: '', minAmount: '' });
          setSelectedCoupon(null);
        } else {
          console.log(selectedCoupon);
          console.log(newCoupon);
          console.error('Failed to update coupon');
        }
      } else {
        const parsedDiscountAmount = parseInt(newCoupon.discountAmount, 10);
        const parsedMinAmount = parseInt(newCoupon.minAmount, 10);

        const response = await fetch('https://localhost:7001/api/Coupons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            couponCode: newCoupon.couponCode,
            discountAmount: parsedDiscountAmount,
            minAmount: parsedMinAmount,
          }),
        });

        if (response.ok) {
          setCoupons((prevCoupons) => [
            ...prevCoupons,
            { ...newCoupon, couponId: prevCoupons.length + 1 },
          ]);
          setModalIsOpen(false);
          setNewCoupon({ couponCode: '', discountAmount: '', minAmount: '' });
        } else {
          console.error('Failed to create coupon');
        }
      }
    } catch (error) {
      console.error('Error creating/updating coupon:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded">
      <div className="bg-gray-500 flex justify-center">
        <h2 className=" p-10 text-6xl font-bold text-white mb-4">
          Coupon List
        </h2>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setModalIsOpen(true)}
          className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3 bg-green-500 mt-5 mb-5"
        >
          Create New Coupon
        </button>
      </div>
      <table className="w-full table-auto bg-gray-700 text-2xl text-white divide-y divide-black">
        <thead>
          <tr>
            <th className="text-left px-6 py-4 whitespace-nowrap">Sl. No</th>
            <th className="text-left px-6 py-4 whitespace-nowrap">
              Coupon Code
            </th>
            <th className="text-left px-6 py-4 whitespace-nowrap">
              Discount Amount
            </th>
            <th className="text-left px-6 py-4 whitespace-nowrap">
              Min Amount
            </th>
            <th className="text-left px-6 py-4 whitespace-nowrap"></th>
            <th className="text-left px-6 py-4 whitespace-nowrap"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black">
          {coupons.map((coupon, index) => (
            <tr key={coupon.couponId}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {coupon.couponCode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {coupon.discountAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {coupon.minAmount}
              </td>
              <td>
                <button
                  onClick={() => handleUpdate(coupon)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="Modal"
      >
        <div className="bg-gray-700 p-6 rounded mt-60 w-2/3 ml-96">
          <div className="flex flex-col ml-96">
            <h1 className="text-white mb-4 text-4xl "> Create New Coupon</h1>
            <label className="mb-2 text-white mt-2">
              Coupon Code:
              <input
                type="text"
                value={newCoupon.couponCode}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, couponCode: e.target.value })
                }
                className="border p-2 ml-6 text-black"
              />
            </label>
            <label className="mb-2 text-white">
              Discount Amount:
              <input
                type="number"
                value={newCoupon.discountAmount}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    discountAmount: parseInt(e.target.value, 10),
                  })
                }
                className="border p-2  text-black"
              />
            </label>
            <label className="mb-2 text-white">
              Min Amount:
              <input
                type="number"
                value={newCoupon.minAmount}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    minAmount: parseInt(e.target.value, 10),
                  })
                }
                className="border p-2 ml-9  text-black"
              />
            </label>
            <button
              onClick={handleCreateOrUpdateCoupon}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-1/2"
            >
              Submit
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="mt-2 text-gray-600 px-4 py-2  bg-red-500 w-1/2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CouponTable;
