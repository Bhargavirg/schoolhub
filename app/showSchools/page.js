'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/schools')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch schools');
        }
        return res.json();
      })
      .then(data => setSchools(data))
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this school?')) {
      try {
        const response = await fetch('/api/schools', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setSchools(schools.filter(school => school.id !== id));
          setSelectedSchool(null);
          alert('School deleted successfully');
        } else {
          alert('Failed to delete school');
        }
      } catch (error) {
        console.error(error);
        alert('Error deleting school');
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-600">Schools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map(school => (
          <div key={school.id} className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300 relative" onClick={() => setSelectedSchool(school)}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(school.id);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition duration-300"
              title="Delete School"
            >
              &times;
            </button>
            {school.image && (
              <Image src={school.image} alt={school.name} width={300} height={200} className="w-full h-48 object-cover rounded-md mb-4" />
            )}
            <h2 className="text-xl font-semibold mb-2 text-black">{school.name}</h2>
            <p className="text-gray-600 mb-1">{school.address}</p>
            <p className="text-gray-600">{school.city}</p>
          </div>
        ))}
      </div>
      {selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-black">{selectedSchool.name}</h2>
            {selectedSchool.image && (
              <Image src={selectedSchool.image} alt={selectedSchool.name} width={300} height={200} className="w-full h-48 object-cover rounded-md mb-4" />
            )}
            <p className="mb-2 text-gray-800"><strong className="text-gray-900">Address:</strong> {selectedSchool.address}</p>
            <p className="mb-2 text-gray-800"><strong className="text-gray-900">City:</strong> {selectedSchool.city}</p>
            <p className="mb-2 text-gray-800"><strong className="text-gray-900">State:</strong> {selectedSchool.state}</p>
            <p className="mb-2 text-gray-800"><strong className="text-gray-900">Contact:</strong> {selectedSchool.contact}</p>
            <p className="mb-2 text-gray-800"><strong className="text-gray-900">Email:</strong> {selectedSchool.email_id}</p>
            <button onClick={() => setSelectedSchool(null)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
