import Header from '../components/Header';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-100">
                <Header />
                <main className="container mx-auto mt-8 px-4">{children}</main>
            </body>
        </html>
    );
}
