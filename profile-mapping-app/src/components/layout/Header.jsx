import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Profile Mapping App</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/profiles" className="hover:underline">Profiles</a></li>
                        <li><a href="/map" className="hover:underline">Map</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;