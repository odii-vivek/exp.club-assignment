import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserListings, deleteListing } from '../../api/api'; // Adjust the path as needed
import { server } from '../constants/config';

const MyListings = () => {
    const [userListings, setUserListings] = useState([]);
    const [showListingsError, setShowListingsError] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = currentUser?.id;

    useEffect(() => {
        const getUserListings = async () => {
            try {
                const data = await fetchUserListings(currentUserId);
                setUserListings(data);
                setShowListingsError(false);
            } catch (error) {
                console.error('Failed to fetch user listings:', error);
                setShowListingsError(true);
            }
        };

        getUserListings();
    }, [currentUserId]);

    const deleteListingHandler = async (listingId) => {
        try {
            await deleteListing(listingId);
            setUserListings(userListings.filter((listing) => listing._id !== listingId));
        } catch (error) {
            console.error('Failed to delete listing:', error);
        }
    };

    const renderMessage = () => {
        if (showListingsError) {
            return <p className="text-red-700 text-center text-lg">Error showing listings</p>;
        }

        if (userListings.length === 0) {
            return <p className="text-center text-lg">No listings found.</p>;
        }

        return null;
    };

    return (
        <div className="max-w-6xl mx-auto p-3">
            {userListings.length > 0 && !showListingsError ? (
                <div className="flex flex-col mt-4">
                    {userListings.map((listing) => {
                        // Construct the image URL
                        const imageUrl = listing.image
                            ? `${server}/uploads/${listing.image}`
                            : 'https://via.placeholder.com/330x220?text=No+Image';

                        return (
                            <div
                                className="border rounded-lg p-3 flex justify-between items-center gap-8"
                                key={listing._id}
                            >
                                <Link to={`/listing/${listing._id}`}>
                                    <img
                                        className="h-16 w-16 object-contain rounded-lg"
                                        src={imageUrl}
                                        alt="listing-image"
                                    />
                                </Link>
                                <Link
                                    className="text-slate-700 font-semibold flex-1 mt-4 hover:underline truncate"
                                    to={`/listing/${listing._id}`}
                                >
                                    <p>{listing.title}</p>
                                </Link>
                                <div className="flex flex-col items-center mt-2">
                                    <Link to={`/update-listing/${listing._id}`}>
                                        <button className="text-green-700">Edit</button>
                                    </Link>
                                    <button
                                        onClick={() => deleteListingHandler(listing._id)}
                                        className="text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    {renderMessage()}
                </div>
            )}
        </div>
    );
};

export default MyListings;
