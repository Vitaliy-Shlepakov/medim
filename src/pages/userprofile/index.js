import React from 'react';



const UserProfile = ({match, location}) => {
    const slug = match.params.slug;
    const isFavorites = location.pathname.includes('favorites');

    return (
        <div>
            UserProfile
        </div>
    );
};

export default UserProfile;