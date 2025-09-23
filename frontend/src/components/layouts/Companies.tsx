import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { FaPlus, FaTimes } from 'react-icons/fa';

function Companies() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        phone: '',
        email: '',
        address: ''
    });

    // Sample company data
    const [companies, setCompanies] = useState([
        { id: 1, name: 'Acme Corporation', phone: '555-0101', email: 'contact@acme.com', address: '123 Business Rd', contacts: 12, createdAt: '2023-05-15 09:30:45' },
        { id: 2, name: 'Globex Industries', phone: '555-0102', email: 'info@globex.com', address: '456 Industry Ave', contacts: 8, createdAt: '2023-06-22 14:15:22' },
        { id: 3, name: 'Initech LLC', phone: '555-0103', email: 'support@initech.com', address: '789 Technology Blvd', contacts: 5, createdAt: '2023-07-10 11:45:33' }
    ]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add new company to the list
        const newCompany = {
            id: companies.length + 1,
            name: formData.companyName,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            contacts: 0,
            createdAt: new Date().toLocaleString()
        };
        
        setCompanies([...companies, newCompany]);
        setIsModalOpen(false);
        setFormData({
            companyName: '',
            phone: '',
            email: '',
            address: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />

            <main className="p-4 md:ml-64 h-auto pt-20 space-y-4">
                {/* Header with Add Company button */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Company Details</h1>
                    <button 
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaPlus className="w-4 h-4 me-2" />
                        Add Company
                    </button>
                </div>

                {/* Company table */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 bg-white dark:bg-gray-900 shadow-sm">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                        <thead className="bg-[#eeeeee] dark:bg-gray-800 rounded-t-xl">
                            <tr>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Company Name</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Phone</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Email</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Address</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Contact Count</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Create Datetime</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{company.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{company.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{company.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{company.contacts}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{company.createdAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-blue-600 dark:text-blue-400 hover:underline">
                                            View Contacts
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Company Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
                            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Company</h2>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    {/* Phone + Email Row */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-1">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Company
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <Footer />

        </div>
    );
}

export default Companies;