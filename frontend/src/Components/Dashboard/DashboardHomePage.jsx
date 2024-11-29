import React from "react";
import dashboard from "../../assets/dashboard.jpg";

const DashboardHomePage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Steps Section */}
            <div className="lg:col-span-7 md:col-span-2 col-span-1 space-y-6">
                {[
                    {
                        step: "STEP 1",
                        description: "OPPRETT NY KLIENT OG KLARGJØR FOR IMPORT AV DATA.",
                        action: "Opprett ny Klient",
                    },
                    {
                        step: "STEP 2",
                        description: "VELG IMPORTKILDE, KONTROLLER OG IMPORTER DATA.",
                        action: "Gå til Import",
                    },
                    {
                        step: "STEP 3",
                        description: "JOBB MED DATAINNSAMLING OG FORBEDRING AV DATAKILDER.",
                        action: "Gå til Grunnlagsdata",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white shadow-md border-2 border-blue-500 rounded"
                    >
                        <h2 className="text-blue-500 font-bold text-lg mb-4">{item.step}</h2>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            {item.action}
                        </button>
                    </div>
                ))}
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 md:col-span-2 col-span-1 flex justify-center items-center">
                <img src={dashboard} alt="" />
            </div>
        </div>
    );
};

export default DashboardHomePage;
