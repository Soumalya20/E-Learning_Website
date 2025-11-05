import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { paymentsAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const { items, removeItem, clear, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const checkoutSingle = async (courseId) => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }
    try {
      const orderRes = await paymentsAPI.createOrder(courseId);
      const { orderId, amount } = orderRes.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency: 'INR',
        name: 'Arisiumlearn',
        description: 'Course Purchase',
        order_id: orderId,
        handler: async (response) => {
          try {
            await paymentsAPI.verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              courseId,
            });
            toast.success('Payment successful! You are now enrolled.');
            removeItem(courseId);
            navigate(`/course/${courseId}/learn`);
          } catch {
            toast.error('Payment verification failed');
          }
        },
        theme: { color: '#2563eb' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Unable to start payment');
    }
  };

  if (!items.length) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty. Browse our <Link to="/courses" className="text-primary-600 font-semibold">courses</Link>.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((c) => (
            <div key={c._id} className="flex items-center bg-white rounded-lg shadow p-4">
              <img src={c.thumbnail} alt={c.title} className="w-24 h-16 object-cover rounded mr-4" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
                <div className="text-gray-700">₹{c.price}</div>
              </div>
              <button onClick={() => removeItem(c._id)} className="text-red-600 font-semibold mr-4">Remove</button>
              <button onClick={() => checkoutSingle(c._id)} className="bg-primary-600 text-white px-4 py-2 rounded">Checkout</button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Items</span>
            <span className="font-semibold">{items.length}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-gray-600">Total</span>
            <span className="font-bold">₹{total}</span>
          </div>
          <button onClick={clear} className="w-full text-gray-700 border border-gray-300 rounded py-2 mb-2">Clear Cart</button>
          <p className="text-sm text-gray-500">Checkout is per-course for now.</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;


