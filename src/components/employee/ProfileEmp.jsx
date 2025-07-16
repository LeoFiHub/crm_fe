import { useState } from 'react';
import { User, Calendar, Edit, Briefcase, X, Save } from 'lucide-react';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';

export const ProfileEmp = ({ employeeData }) => {
    const [activeTab, _setActiveTab] = useState(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    // Sample employee data - bạn có thể truyền từ props
    const defaultEmployeeData = {
        // firstName: 'Brooklyn',
        // lastName: 'Simmons',
        fullname: 'Brooklyn Simmons',
        email: 'brooklyn.s@example.com',
        // position: 'Project Manager',
        mobile: '(702) 555-0122',
        dateOfBirth: 'July 14, 1995',
        // maritalStatus: 'Married',
        gender: 'Female',
        nationality: 'America',
        address: '2464 Royal Ln. Mesa, New Jersey',
        // city: 'California',
        // state: 'United State',
        // zipCode: '35624',
        // avatar: 'https://placehold.co/100x100'
    };

    const employee = employeeData || defaultEmployeeData;

    // Initialize edit form data with current employee data
    const initializeEditForm = () => {
        // Convert date format from "July 14, 1995" to "1995-07-14" for input[type="date"]
        const formatDateForInput = (dateStr) => {
            if (!dateStr) return '';
            try {
                const date = new Date(dateStr);
                return date.toISOString().split('T')[0];
            } catch {
                return '';
            }
        };

        setEditFormData({
            fullname: employee.fullname || '',
            email: employee.email || '',
            mobile: employee.mobile || '',
            dateOfBirth: formatDateForInput(employee.dateOfBirth) || '',
            maritalStatus: employee.maritalStatus || '',
            gender: employee.gender || '',
            nationality: employee.nationality || '',
            address: employee.address || ''
        });
    };

    // Handle opening edit modal
    const handleEditClick = () => {
        initializeEditForm();
        setIsEditModalOpen(true);
    };

    // Handle closing edit modal
    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setEditFormData({});
    };

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle save changes
    const handleSaveChanges = () => {
        // Here you would typically make an API call to update the employee data
        console.log('Saving changes:', editFormData);
        // For now, just close the modal
        handleCloseModal();
        // You could also update the parent component's data or trigger a refetch
    };

    const personalInfoFields = [
        // { label: 'First Name', value: employee.firstName },
        // { label: 'Last Name', value: employee.lastName },
        { label: 'Full name', value: employee.fullname },
        { label: 'Mobile Number', value: employee.mobile },
        { label: 'Email Address', value: employee.email },
        { label: 'Date of Birth', value: employee.dateOfBirth },
        // { label: 'Marital Status', value: employee.maritalStatus },
        { label: 'Gender', value: employee.gender },
        { label: 'Nationality', value: employee.nationality },
        { label: 'Address', value: employee.address },
        // { label: 'City', value: employee.city },
        // { label: 'State', value: employee.state },
        // { label: 'Zip Code', value: employee.zipCode }
    ];

    const InfoField = ({ label, value }) => (
        <div className="w-full max-w-sm flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
                <div className="text-sm font-light text-zinc-400 font-lexend">
                    {label}
                </div>
                <div className="text-base font-light text-zinc-900 font-lexend">
                    {value}
                </div>
            </div>
            <div className="w-full h-px bg-zinc-400/10" />
        </div>
    );
    return (
        <div className="flex gap-6 p-6">
            {/* Nội dung chính */}
            <div className="flex flex-col flex-1 gap-7">
                {/* Header */}
                <div className="flex flex-col gap-7">
                    <div className="flex items-end justify-between w-full">
                        <div className="flex items-start gap-4">
                            {/* <img
                                className="w-24 h-24 rounded-[10px] object-cover"
                                src={employee.avatar}
                                alt={`${employee.firstName} ${employee.lastName}`}
                            /> */}
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl font-semibold text-zinc-900 font-lexend">
                                    {employee.fullname}
                                </div>
                                <div className="flex flex-col gap-2">
                                    {/* <div className="flex items-center gap-2.5">
                                        <Briefcase className="w-6 h-6 text-zinc-900" />
                                        <div className="text-base font-light text-zinc-900 font-lexend">
                                            {employee.position}
                                        </div>
                                    </div> */}
                                    <div className="flex items-center gap-2.5">
                                        <Calendar className="w-6 h-6 text-zinc-900" />
                                        <div className="text-base font-light text-zinc-900 font-lexend">
                                            {employee.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="h-12 px-5 bg-indigo-500 rounded-[10px] flex items-center gap-2.5 hover:bg-indigo-600 transition-colors"
                            onClick={handleEditClick}
                        >
                            <Edit className="w-6 h-6 text-white" />
                            <div className="text-base font-light text-white font-lexend">
                                Edit Profile
                            </div>
                        </button>
                    </div>
                    <div className="w-full h-px bg-zinc-400/20" />
                </div>

                {/* Personal Information */}
                {activeTab === 0 && (
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2.5">
                            <User className="w-6 h-6 text-indigo-500" />
                            <div className="text-base font-semibold text-indigo-500 font-lexend">
                                Personal Information
                            </div>
                        </div>
                        <div className="w-full h-px bg-zinc-400/20" />
                        <div className="w-52 h-[3px] bg-indigo-500 rounded-full" />

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {personalInfoFields.map((field, index) => (
                                <InfoField key={index} label={field.label} value={field.value} />
                            ))}
                        </div>
                    </div>
                )}


            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-400/20">
                            <div className="flex items-center gap-2.5">
                                <Edit className="w-6 h-6 text-indigo-500" />
                                <h2 className="text-xl font-semibold text-zinc-900 font-lexend">
                                    Edit Profile
                                </h2>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 transition-colors rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-zinc-900" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Full Name */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Full Name
                                    </label>
                                    <InputField
                                        placeholder="Enter full name"
                                        value={editFormData.fullname || ''}
                                        onChange={(e) => handleInputChange('fullname', e.target.value)}
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Email Address
                                    </label>
                                    <InputField
                                        type="email"
                                        placeholder="Enter email address"
                                        value={editFormData.email || ''}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>

                                {/* Mobile */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Mobile Number
                                    </label>
                                    <InputField
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        value={editFormData.mobile || ''}
                                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                                    />
                                </div>

                                {/* Date of Birth */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Date of Birth
                                    </label>
                                    <InputField
                                        type="date"
                                        placeholder="Select date of birth"
                                        value={editFormData.dateOfBirth || ''}
                                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                    />
                                </div>

                                {/* Marital Status */}
                                {/* <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Marital Status
                                    </label>
                                    <SelectField
                                        placeholder="Select marital status"
                                        value={editFormData.maritalStatus || ''}
                                        onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                                        options={[
                                            { value: 'Single', label: 'Single' },
                                            { value: 'Married', label: 'Married' },
                                            { value: 'Divorced', label: 'Divorced' },
                                            { value: 'Widowed', label: 'Widowed' }
                                        ]}
                                    />
                                </div> */}

                                {/* Gender */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Gender
                                    </label>
                                    <SelectField
                                        placeholder="Select gender"
                                        value={editFormData.gender || ''}
                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                        options={[
                                            { value: 'Male', label: 'Male' },
                                            { value: 'Female', label: 'Female' },
                                            { value: 'Other', label: 'Other' }
                                        ]}
                                    />
                                </div>

                                {/* Nationality */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Nationality
                                    </label>
                                    <SelectField
                                        placeholder="Select nationality"
                                        value={editFormData.nationality || ''}
                                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                                        options={[
                                            { value: 'Vietnamese', label: 'Vietnamese' },
                                            { value: 'American', label: 'American' },
                                            { value: 'British', label: 'British' },
                                            { value: 'Chinese', label: 'Chinese' },
                                            { value: 'Japanese', label: 'Japanese' },
                                            { value: 'Korean', label: 'Korean' },
                                            { value: 'Thai', label: 'Thai' },
                                            { value: 'Singapore', label: 'Singapore' },
                                            { value: 'Other', label: 'Other' }
                                        ]}
                                    />
                                </div>

                                {/* Address */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm font-light text-zinc-400 font-lexend">
                                        Address
                                    </label>
                                    <InputField
                                        placeholder="Enter address"
                                        value={editFormData.address || ''}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-400/20">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2.5 border border-zinc-400/20 rounded-[10px] text-sm font-light text-zinc-900 font-lexend hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="px-6 py-2.5 bg-indigo-500 rounded-[10px] text-sm font-light text-white font-lexend hover:bg-indigo-600 transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
