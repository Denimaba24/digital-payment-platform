import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';
import { FaRocket, FaLock, FaFastForward } from 'react-icons/fa';

function HomePage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">🎯 Belanja Digital Mudah & Aman</h1>
          <p className="text-xl mb-8">
            Platform terpercaya untuk membeli pulsa, token listrik, voucher, dan top-up game
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-100 inline-block"
          >
            Mulai Belanja
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Pilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FaFastForward className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Instan</h3>
              <p className="text-gray-600">Proses instan setelah pembayaran berhasil</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FaLock className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Aman</h3>
              <p className="text-gray-600">Transaksi aman dengan enkripsi tingkat tinggi</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FaRocket className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Terpercaya</h3>
              <p className="text-gray-600">Ribuan customer puas telah bertransaksi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Produk Terbaru</h2>
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Memuat produk...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.slice(0, 8).map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
                  <div className="bg-blue-500 h-32 flex items-center justify-center text-white text-3xl">
                    {product.category === 'pulsa' && '📱'}
                    {product.category === 'token_listrik' && '💡'}
                    {product.category === 'voucher' && '🎫'}
                    {product.category === 'ewallet' && '💳'}
                    {product.category === 'game' && '🎮'}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <p className="text-2xl font-bold text-green-600">
                      Rp{product.finalPrice?.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
