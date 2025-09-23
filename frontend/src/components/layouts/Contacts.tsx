import { useState, useRef } from 'react';
import { FaPlus, FaTimes, FaUserCircle, FaTrash } from 'react-icons/fa';

type Contact = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    profileImage: string | null;
    createdAt: string;
};

function Contacts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<{
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      company: string;
      profileImage: File | null;
    }>({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      profileImage: null,
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sample companies for dropdown
    const companies = [
        { id: 1, name: 'Acme Corporation' },
        { id: 2, name: 'Globex Industries' },
        { id: 3, name: 'Initech LLC' },
        { id: 4, name: 'Umbrella Corp' },
        { id: 5, name: 'Wayne Enterprises' }
    ];

    // Sample contact data
    const [contacts, setContacts] = useState<Contact[]>([
        { 
            id: 1, 
            firstName: 'John', 
            lastName: 'Doe', 
            phone: '555-0101', 
            email: 'john.doe@example.com', 
            company: 'Acme Corporation',
            profileImage: null,
            createdAt: '2023-05-15 09:30:45' 
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '555-0202',
            email: 'jane.smith@example.com',
            company: 'Globex Industries',
            profileImage: null,
            createdAt: '2023-06-10 14:12:30'
        },
        {
            id: 3,
            firstName: 'Michael',
            lastName: 'Johnson',
            phone: '555-0303',
            email: 'michael.johnson@example.com',
            company: 'Initech LLC',
            profileImage: null,
            createdAt: '2023-07-22 11:05:20'
        },
        {
            id: 4,
            firstName: 'Emily',
            lastName: 'Davis',
            phone: '555-0404',
            email: 'emily.davis@example.com',
            company: 'Umbrella Corp',
            profileImage: null,
            createdAt: '2023-08-01 16:45:10'
        },
        {
            id: 5,
            firstName: 'William',
            lastName: 'Brown',
            phone: '555-0505',
            email: 'william.brown@example.com',
            company: 'Stark Industries',
            profileImage: null,
            createdAt: '2023-09-12 08:22:55'
        }
    ]);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profileImage: file
            }));
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            profileImage: null
        }));
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add new contact to the list
        const newContact = {
            id: contacts.length + 1,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            company: formData.company,
            profileImage: previewImage, // Store the preview URL or upload to server
            createdAt: new Date().toLocaleString()
        };
        
        setContacts([...contacts, newContact]);
        setIsModalOpen(false);
        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            company: '',
            profileImage: null
        });
        setPreviewImage(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

            <main className="p-4 md:ml-64 h-auto pt-20 space-y-4">
                {/* Header with Add Contact button */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Details</h1>
                    <button 
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaPlus className="w-4 h-4 me-2" />
                        Add Contact
                    </button>
                </div>

                {/* Contact table */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 bg-white dark:bg-gray-900 shadow-sm">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                        <thead className="bg-[#eeeeee] dark:bg-gray-800 rounded-t-xl">
                            <tr>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Profile</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Name</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Phone</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Email</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Company</th>
                                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {contacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {contact.profileImage ? (
                                            <img 
                                                src={contact.profileImage} 
                                                alt="Profile" 
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <FaUserCircle className="w-10 h-10 text-gray-400" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{`${contact.firstName} ${contact.lastName}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{contact.company}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                                            Edit
                                        </button>
                                        <button className="text-red-600 dark:text-red-400 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Contact Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
                            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Contact</h2>
                                <button 
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setPreviewImage(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                {/* Profile Image Upload */}
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        {previewImage ? (
                                            <>
                                                <img 
                                                    src={previewImage} 
                                                    alt="Profile preview" 
                                                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <FaTrash className="w-3 h-3" />
                                                </button>
                                            </>
                                        ) : (
                                            <FaUserCircle className="w-24 h-24 text-gray-400" />
                                        )}
                                    </div>
                                    <label className="cursor-pointer">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                                            {previewImage ? 'Change Image' : 'Upload Image'}
                                        </span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {/* Name Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Info Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
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
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Company Dropdown */}
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Company
                                        </label>
                                        <select
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Select a company</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.name}>
                                                    {company.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setPreviewImage(null);
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Contact
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            
        </div>
    );
}

export default Contacts;