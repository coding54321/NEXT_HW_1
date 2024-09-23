'use client';

import { useCartStore } from '../store/cartStore';
import ProductItem from '../components/ProductItem';

const products = [
    { id: 1, name: '김치찌개', price: 8000 },
    { id: 2, name: '된장찌개', price: 7000 },
    { id: 3, name: '부대찌개', price: 9000 },
    { id: 4, name: '비빔밥', price: 8000 },
];

export default function Home() {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">메뉴</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                ))}
            </div>
        </div>
    );
}
