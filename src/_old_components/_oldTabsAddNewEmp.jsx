import React, { useState } from 'react';
import {
    User,
    Briefcase,
    FileText,
    Key,
    Calendar,
    ChevronDown,
    Camera,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TabsAddNewEmp = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        dateOfBirth: '',
        maritalStatus: '',
        gender: '',
        nationality: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const navigate = useNavigate();

    const tabs = [
        {
            id: 0,
            name: 'Personal Information',
            icon: User,
            completed: false,
            active: true
        },
        {
            id: 1,
            name: 'Professional Information',
            icon: Briefcase,
            completed: false,
            active: false
        },
        {
            id: 2,
            name: 'Documents',
            icon: FileText,
            completed: false,
            active: false
        },
        {
            id: 3,
            name: 'Account Access',
            icon: Key,
            completed: false,
            active: false
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNext = () => {
        if (activeTab < tabs.length - 1) {
            setActiveTab(activeTab + 1);
        }
    };

    const handleCancel = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/employees');
        }
    };

    const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
        <div className="relative flex-1 h-14">
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || label}
                className="w-full h-full px-4 rounded-[10px] border border-zinc-400/20 text-base font-light font-lexend text-zinc-900 placeholder:text-zinc-400/80 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
        </div>
    );

    const SelectField = ({ label, value, onChange, options, placeholder }) => (
        <div className="relative flex-1">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-14 px-4 pr-10 rounded-[10px] border border-zinc-400/20 text-base font-light font-lexend text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white"
            >
                <option value="" disabled>{placeholder || label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2">
                <ChevronDown className="w-5 h-5 text-zinc-900" />
            </div>
        </div>
    );

    const maritalStatusOptions = [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
    ];

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];

    const nationalityOptions = [
        { value: 'vietnamese', label: 'Vietnamese' },
        { value: 'american', label: 'American' },
        { value: 'british', label: 'British' },
        { value: 'canadian', label: 'Canadian' },
        { value: 'australian', label: 'Australian' },
        { value: 'other', label: 'Other' }
    ];

    const cityOptions = [
        { value: 'ho-chi-minh', label: 'Ho Chi Minh City' },
        { value: 'hanoi', label: 'Hanoi' },
        { value: 'da-nang', label: 'Da Nang' },
        { value: 'can-tho', label: 'Can Tho' },
        { value: 'other', label: 'Other' }
    ];

    const stateOptions = [
        { value: 'south', label: 'South Vietnam' },
        { value: 'north', label: 'North Vietnam' },
        { value: 'central', label: 'Central Vietnam' }
    ];

    return (
        <div className="bg-white rounded-[10px] border border-zinc-400/20 p-5 sm:p-8 ">
            {/* Tabs Header */}
            <div className="flex flex-col mb-8 gap-7">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-5">
                    {tabs.map((tab, index) => {
                        const IconComponent = tab.icon;
                        const isActive = activeTab === index;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(index)}
                                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                            >
                                <div className="relative flex items-center justify-center w-6 h-6">
                                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-indigo-500' : 'text-zinc-900'}`} />
                                </div>
                                <span className={`text-base font-lexend leading-normal ${isActive
                                    ? 'text-indigo-500 font-semibold'
                                    : 'text-zinc-900 font-light'
                                    }`}>
                                    {tab.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-zinc-400/20" />

                {/* Progress Bar */}
                <div className="w-full bg-zinc-400/10 h-[3px] rounded-full">
                    <div
                        className="h-full transition-all duration-300 bg-indigo-500 rounded-full"
                        style={{ width: `${((activeTab + 1) / tabs.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 0 && (
                <div className="space-y-5">
                    {/* Profile Photo */}
                    <div className="flex flex-col gap-5">
                        <div className="w-24 h-24 bg-zinc-400/5 rounded-[10px] border border-zinc-400/20 flex items-center justify-center group hover:bg-zinc-400/10 transition-colors cursor-pointer">
                            <Camera className="w-8 h-8 text-zinc-400 group-hover:text-zinc-500" />
                        </div>
                        <p className="text-sm font-light text-zinc-400 font-lexend">
                            Click to upload profile photo
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <InputField
                                label="First Name"
                                value={formData.firstName}
                                onChange={(value) => handleInputChange('firstName', value)}
                                placeholder="First Name"
                            />
                            <InputField
                                label="Last Name"
                                value={formData.lastName}
                                onChange={(value) => handleInputChange('lastName', value)}
                                placeholder="Last Name"
                            />
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <InputField
                                label="Mobile Number"
                                value={formData.mobile}
                                onChange={(value) => handleInputChange('mobile', value)}
                                placeholder="Mobile Number"
                                type="tel"
                            />
                            <InputField
                                label="Email Address"
                                value={formData.email}
                                onChange={(value) => handleInputChange('email', value)}
                                placeholder="Email Address"
                                type="email"
                            />
                        </div>

                        {/* Date of Birth & Marital Status */}
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div className="relative flex-1">
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                    className="w-full h-14 px-4 pr-10 rounded-[10px] border border-zinc-400/20 text-base font-light font-lexend text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                                <div className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2">
                                    <Calendar className="w-5 h-5 text-zinc-900" />
                                </div>
                            </div>
                            <SelectField
                                label="Marital Status"
                                value={formData.maritalStatus}
                                onChange={(value) => handleInputChange('maritalStatus', value)}
                                options={maritalStatusOptions}
                                placeholder="Marital Status"
                            />
                        </div>

                        {/* Gender & Nationality */}
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <SelectField
                                label="Gender"
                                value={formData.gender}
                                onChange={(value) => handleInputChange('gender', value)}
                                options={genderOptions}
                                placeholder="Gender"
                            />
                            <SelectField
                                label="Nationality"
                                value={formData.nationality}
                                onChange={(value) => handleInputChange('nationality', value)}
                                options={nationalityOptions}
                                placeholder="Nationality"
                            />
                        </div>

                        {/* Address */}
                        <div className="w-full">
                            <InputField
                                label="Address"
                                value={formData.address}
                                onChange={(value) => handleInputChange('address', value)}
                                placeholder="Address"
                            />
                        </div>

                        {/* City, State, ZIP */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            <SelectField
                                label="City"
                                value={formData.city}
                                onChange={(value) => handleInputChange('city', value)}
                                options={cityOptions}
                                placeholder="City"
                            />
                            <SelectField
                                label="State"
                                value={formData.state}
                                onChange={(value) => handleInputChange('state', value)}
                                options={stateOptions}
                                placeholder="State"
                            />
                            <InputField
                                label="ZIP Code"
                                value={formData.zipCode}
                                onChange={(value) => handleInputChange('zipCode', value)}
                                placeholder="ZIP Code"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Other tabs placeholder */}
            {activeTab === 1 && (
                <div className="py-20 text-center">
                    <Briefcase className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                    <h3 className="mb-2 text-xl font-semibold text-zinc-900 font-lexend">
                        Professional Information
                    </h3>
                    <p className="text-zinc-400 font-lexend">
                        This tab will be implemented next
                    </p>
                </div>
            )}

            {activeTab === 2 && (
                <div className="py-20 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                    <h3 className="mb-2 text-xl font-semibold text-zinc-900 font-lexend">
                        Documents
                    </h3>
                    <p className="text-zinc-400 font-lexend">
                        This tab will be implemented next
                    </p>
                </div>
            )}

            {activeTab === 3 && (
                <div className="py-20 text-center">
                    <Key className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                    <h3 className="mb-2 text-xl font-semibold text-zinc-900 font-lexend">
                        Account Access
                    </h3>
                    <p className="text-zinc-400 font-lexend">
                        This tab will be implemented next
                    </p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-5 pt-6 mt-8 border-t border-zinc-400/20">
                <button
                    onClick={handleCancel}
                    className="h-12 px-5 rounded-[10px] border border-zinc-400/20 flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors"
                >
                    <span className="text-base font-light text-zinc-900 font-lexend">
                        Cancel
                    </span>
                </button>
                <button
                    onClick={handleNext}
                    disabled={activeTab === tabs.length - 1}
                    className="h-12 px-6 bg-indigo-500 rounded-[10px] flex justify-center items-center gap-2.5 hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="text-base font-light text-white font-lexend">
                        {activeTab === tabs.length - 1 ? 'Submit' : 'Next'}
                    </span>
                </button>
            </div>
        </div>




    );
};

export default TabsAddNewEmp;
