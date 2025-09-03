'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  contact: yup.string()
    .required('Contact is required')
    .matches(/^\d{10}$/, 'Contact number must be exactly 10 digits'),
  email_id: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  image: yup.mixed().required('Image is required')
});

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]);

    const response = await fetch('/api/schools', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setMessage('School added successfully!');
      reset();
      router.push('/showSchools');
    } else {
      setMessage('Failed to add school.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Add School to School HUB</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Name</label>
            <input {...register('name')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Address</label>
            <input {...register('address')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">City</label>
            <input {...register('city')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">State</label>
            <input {...register('state')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Contact</label>
            <input {...register('contact')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input {...register('email_id')} type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" />
            {errors.email_id && <p className="text-red-500 text-sm">{errors.email_id.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Image</label>
            <input {...register('image')} type="file" accept="image/*" className="mt-1 block w-full text-black" />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">Add School</button>
        </form>
        {message && <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>}
      </div>
    </div>
  );
}
