import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#00008B] flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="bg-white bg-opacity-90 p-6 sm:p-10 rounded-2xl shadow-2xl text-center w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Welcome to School Management System</h2>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SCHOOL HUB</h1>
        <p className="text-base sm:text-lg mb-8 text-gray-700">Manage your schools effortlessly with our intuitive platform.</p>
        <div className="space-y-6">
          <Link href="/addSchool" className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg transform hover:scale-105">
            ➕ Add School
          </Link>
          <Link href="/showSchools" className="block w-full text-center bg-gradient-to-r from-green-500 to-green-700 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition duration-300 shadow-lg transform hover:scale-105">
            📚 Show Schools
          </Link>
        </div>
      </div>
    </div>
  );
}
