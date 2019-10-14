import React, { useEffect } from 'react';
// import profileCreds from './profileCreds';
// import profileHeader from './profileHeader';
// import profileAbout from './profileAbout';
import Proptypes from 'prop-types';
import Spinner from '../common/spinner';
import ProfileHeader from './profileHeader';
import ProfileAbout from './profileAbout';
import ProfileCreds from './profileCreds';


const userProfile = ({ getProfileByUsername, ...rest }) => {
    const { username } = rest.match.params;
    console.log(rest);
    //console.log(rest.match.params.handle)

    useEffect(() => {
        if (username) {
            getProfileByUsername(username);
        }
    }, []);
    return (
        <div>
           <ProfileHeader />
           <ProfileAbout />
           <ProfileCreds />
        </div>
    )
}

export default userProfile;

userProfile.proptypes = {
    getProfileByUsername: Proptypes.func.isRequired,
};