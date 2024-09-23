import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-semibold text-gray-800">
                        장바구니
                    </Link>
                    <div className="space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-800">
                            홈
                        </Link>
                        <Link href="/cart" className="text-gray-600 hover:text-gray-800">
                            장바구니
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
