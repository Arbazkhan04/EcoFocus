import React from 'react';
import { useNavigate } from 'react-router-dom';
import homePageImage from '../../assets/dashboard.png';
import logo from '../../assets/apple-pay.png';

const HomeNotSignedIn = () => {
    const navigate = useNavigate(); // Initialize navigation hook

    const handleLoginClick = () => {
        navigate('/login'); // Redirect to the login page
    };

    const handleAboutClick = () => {
        navigate('/signup'); // Redirect to the about page
    };

    const handleContactClick = () => {
        navigate('/contact'); // Redirect to the contact page
    };

    return (
        <>
            {/* Home Page Wrapper */}
            <div className="home-page-wrapper overflow-hidden  min-h-screen">
                {/* Header Section */}
                <div className="ms-8 text-primaryBlue-light">
                    <img src={logo} alt="logo" />
                    <h1>Lorem ipsum dolor sit amet.</h1>
                </div>

                <div className="container mx-auto mt-10 text-primaryBlue-light">
                    {/* Main Grid Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-5">
                        {/* Left Section */}
                        <div className="grid grid-rows-2 gap-4 lg:col-span-5 h-full">
                            {/* Top Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                                {/* About Card */}
                                <div className="p-4 border flex flex-col justify-between text-center border-primaryBlue-light rounded-lg shadow-md h-full min-h-[250px]">
                                    <div>
                                        <h2 className="font-bold">ABOUT</h2>
                                        <p className="text-sm text-primaryBlue-light mb-4">
                                            Dummy text dummy text dummy text dummy text dummy text dummy text.
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleAboutClick}
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 block mx-auto"
                                        >
                                            Les mer
                                        </button>
                                    </div>
                                </div>

                                {/* Log In Card */}
                                <div className="p-4 border flex flex-col justify-between text-center border-primaryBlue-light rounded-lg shadow-md h-full min-h-[250px]">
                                    <div className="mb-2">
                                        <h2 className="font-bold">LOGG IN</h2>
                                        <p className="text-sm text-primaryBlue-light mb-4">
                                            Dummy text dummy text dummy text dummy text dummy text dummy text.
                                        </p>
                                        <p className="text-sm text-primaryBlue-light underline">
                                            Se prismodell og prisliste ved å følge denne lenken.
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleLoginClick}
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 block mx-auto"
                                        >
                                            Innlogging
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="p-4 border flex flex-col justify-between text-center border-primaryBlue-light rounded-lg shadow-md h-full min-h-[250px]">
                                <div>
                                    <h2 className="font-bold">KONTAKT OSS I DAG</h2>
                                    <p className="text-sm text-primaryBlue-light mb-4">
                                        Dummy text dummy text dummy text dummy text dummy text dummy text.
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={handleContactClick}
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 block mx-auto"
                                    >
                                        Kontakt oss
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="lg:col-span-7 flex flex-col items-center h-full min-h-[400px]">
                            <div className="mt-16">
                                <img src={homePageImage} alt="Home Page" />
                            </div>

                            {/* Footer Section */}
                            <div className="container mx-auto mt-5 px-4">
                                <div className="flex justify-end gap-5 text-primaryBlue-light text-sm font-bold">
                                    {/* Left Section */}
                                    <div className="flex flex-col space-y-1">
                                        <a href="#" className="hover:underline">
                                            Kontakt
                                        </a>
                                        <a href="#" className="hover:underline">
                                            Email@email.email
                                        </a>
                                    </div>
                                    {/* Right Section */}
                                    <div className="flex flex-col space-y-1 text-right">
                                        <a href="#" className="hover:underline">
                                            Privacy
                                        </a>
                                        <a href="#" className="hover:underline">
                                            Cookies
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeNotSignedIn;
