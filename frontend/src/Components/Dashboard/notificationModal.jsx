import React from 'react';

function NotificationModal({ isOpen, onClose, notifications, handleAccept, handleDecline }) {
    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
        if (e.target.id === 'notification-overlay') {
            onClose();
        }
    };

    return (
        <div
            id="notification-overlay"
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
            <div
                className="relative w-[30rem] h-96 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Notifications</h3>
                    {notifications.length === 0 ? (
                        <p className="text-gray-500">No new notifications.</p>
                    ) : (
                        <div className="overflow-y-auto max-h-72 space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="border-b border-gray-200 pb-2"
                                >
                                    <p className="text-gray-700">{notification.message}</p>
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            onClick={() => handleAccept(notification.id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDecline(notification.id)}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default NotificationModal;
