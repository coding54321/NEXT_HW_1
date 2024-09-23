'use client';

import { useCartStore } from '../../store/cartStore';
import CartItem from '../../components/CartItem';

export default function Cart() {
    const { items, removeFromCart } = useCartStore();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">장바구니</h1>
            {items.length === 0 ? (
                <p className="text-gray-600">장바구니가 비어있습니다.</p>
            ) : (
                <div>
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} onRemove={() => removeFromCart(item.id)} />
                    ))}
                    <div className="mt-6 text-right">
                        <p className="text-xl font-semibold">총 금액: {total}원</p>
                    </div>
                </div>
            )}
        </div>
    );
}
