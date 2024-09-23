export default function CartItem({ item, onRemove }) {
    return (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
            <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">가격: {item.price}원</p>
                <p className="text-gray-600">수량: {item.quantity}</p>
            </div>
            <button
                onClick={onRemove}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
                제거
            </button>
        </div>
    );
}
