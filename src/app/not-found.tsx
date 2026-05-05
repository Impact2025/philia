import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-purple-300">?</span>
          </div>
          <h1 className="text-6xl font-bold text-dark mb-4">404</h1>
          <p className="text-xl text-gray-500 mb-2">Pagina niet gevonden</p>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            De pagina die je zoekt bestaat niet of is verplaatst.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
