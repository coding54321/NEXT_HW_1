import { useState } from 'react';
import Alert from './Alert';

export default function ProductItem({ product, onAddToCart }) {
    const [showAlert, setShowAlert] = useState(false);

    const handleAddToCart = () => {
        onAddToCart();
        setShowAlert(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 relative">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">가격: {product.price}원</p>
            <button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
                장바구니에 담기
            </button>
            {showAlert && (
                <Alert message={`${product.name}이(가) 장바구니에 담겼습니다!`} onClose={() => setShowAlert(false)} />
            )}
        </div>
    );
}
