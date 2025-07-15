import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import InputField from '../components/Form/employee/InputField';
// import SelectField from '../components/Form/employee/SelectField';

// Schema validation
const schema = Yup.object().shape({
    name: Yup.string()
        .required('Tên nhân viên không được để trống')
        .min(2, 'Tên phải có ít nhất 2 ký tự')
        .max(50, 'Tên không được quá 50 ký tự'),
    phone: Yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số'),
    department: Yup.string()
        .required('Phòng ban không được để trống'),
    designation: Yup.string()
        .required('Chức vụ không được để trống'),
    type: Yup.string()
        .required('Loại công việc không được để trống'),
    status: Yup.string()
        .required('Trạng thái không được để trống'),
});

const EmployeeForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData
    });

    const departmentOptions = [
        { value: 'HR', label: 'Human Resources' },
        { value: 'IT', label: 'Information Technology' },
        { value: 'BA', label: 'Business Analyst' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Marketing', label: 'Marketing' },
    ];

    const designationOptions = [
        { value: 'Manager', label: 'Manager' },
        { value: 'Senior Developer', label: 'Senior Developer' },
        { value: 'Developer', label: 'Developer' },
        { value: 'Business Analyst', label: 'Business Analyst' },
        { value: 'HR Manager', label: 'HR Manager' },
    ];

    const typeOptions = [
        { value: 'Office', label: 'Office' },
        { value: 'Remote', label: 'Remote' },
        { value: 'Hybrid', label: 'Hybrid' },
    ];

    const statusOptions = [
        { value: 'Permanent', label: 'Permanent' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Intern', label: 'Intern' },
    ];

    const handleFormSubmit = async (data) => {
        try {
            await onSubmit(data);
            if (!isEditing) {
                reset();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-xl font-semibold font-lexend text-zinc-900">
                {isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
            </h2>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-zinc-700 font-lexend">
                            Tên nhân viên
                        </label>
                        <InputField
                            placeholder="Nhập tên nhân viên"
                            {...register('name')}
                            error={errors.name?.message}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-zinc-700 font-lexend">
                            Số điện thoại
                        </label>
                        <InputField
                            placeholder="Nhập số điện thoại"
                            {...register('phone')}
                            error={errors.phone?.message}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-zinc-700 font-lexend">
                            Phòng ban
                        </label>
                        <SelectField
                            placeholder="Chọn phòng ban"
                            options={departmentOptions}
                            {...register('department')}
                            error={errors.department?.message}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-zinc-700 font-lexend">
                            Chức vụ
                        </label>
                        <SelectField
                            placeholder="Chọn chức vụ"
                            options={designationOptions}
                            {...register('designation')}
                            error={errors.designation?.message}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-zinc-700 font-lexend">
                            Loại công việc
                        </label>
                        <SelectField
                            placeholder="Chọn loại công việc"
                            options={typeOptions}
                            {...register('type')}
                            error={errors.type?.message}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-zinc-700 font-lexend">
                            Trạng thái
                        </label>
                        <SelectField
                            placeholder="Chọn trạng thái"
                            options={statusOptions}
                            {...register('status')}
                            error={errors.status?.message}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-6 py-2 text-sm font-medium border rounded-lg text-zinc-600 border-zinc-300 hover:bg-zinc-50 font-lexend"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed font-lexend"
                    >
                        {isSubmitting ? 'Đang xử lý...' : (isEditing ? 'Cập nhật' : 'Thêm mới')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
