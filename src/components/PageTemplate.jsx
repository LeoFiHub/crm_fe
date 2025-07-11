import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PageTemplate = ({ activeMenuItem, title, description, children }) => {
    return (
        <div className="w-screen h-screen relative bg-white overflow-hidden">
            {/* Sidebar */}
            <div className="absolute left-[20px] top-[20px]">
                <Sidebar activeItem={activeMenuItem} />
            </div>

            {/* Main Content */}
            <div className="absolute left-[300px] top-[20px] right-[20px]">
                {/* Header */}
                <Header />

                {/* Content Area */}
                <div className="mt-20">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold font-lexend text-zinc-900 mb-2">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-zinc-400 font-light font-lexend">
                                {description}
                            </p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageTemplate;
