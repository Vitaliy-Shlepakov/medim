import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import useLocalStorage from '../../hooks/useLocalStorage';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from "../../contexts/currectUser";
import BackendErrorMessages from "../../components/BackendErrorMessages";

const Settings = () => {
    const [currentUserState, dispatch] = useContext(CurrentUserContext);
    const apiUrl = `/user`;
    const [{response, error}, doFetch] = useFetch(apiUrl);
    const [,seToken] = useLocalStorage('token');

    //стейты под каждое поле
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isSuccessfullLogout, setSuccessfullLogout] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        doFetch({
            method: 'PUT',
            data: {
                user: {
                    ...currentUserState.currentUser,
                    image,
                    username,
                    bio,
                    email,
                    password
                }
            }
        })
    };

    useEffect(() => {
        if(!currentUserState.currentUser) return;

        currentUserState.currentUser.image && setImage(currentUserState.currentUser.image);
        currentUserState.currentUser.username && setUsername(currentUserState.currentUser.username);
        currentUserState.currentUser.bio && setBio(currentUserState.currentUser.bio);
        currentUserState.currentUser.email && setEmail(currentUserState.currentUser.email);
    }, [currentUserState]);

    useEffect(() => {
        if(!response) return;

        dispatch({
            type: 'SET_AUTHORIZED',
            payload: response.user
        });
    }, [response, dispatch]);

    const logout = e => {
        e.preventDefault();
        seToken('');
        dispatch({
            type: 'LOGOUT'
        });
        setSuccessfullLogout(true);
    };

    if(isSuccessfullLogout){
        return <Redirect to="/"/>
    };

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">
                            Your settings
                        </h1>
                        { error && <BackendErrorMessages backendErrors={error}/>}
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="URl of profile picture"
                                        value={image}
                                        onChange={e => {setImage(e.target.value)}}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="User name"
                                        value={username}
                                        onChange={e => {setUsername(e.target.value)}}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        cols="30"
                                        rows="8"
                                        placeholder="Short bio"
                                        value={bio}
                                        onChange={e => {setBio(e.target.value)}}
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => {setEmail(e.target.value)}}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        autoComplete="password"
                                        value={password}
                                        onChange={e => {setPassword(e.target.value)}}
                                    />
                                </fieldset>
                                <button
                                    type="submit"
                                    className="btn btn-lg pull-xs-right"
                                >
                                    Update settings
                                </button>
                            </fieldset>
                        </form>
                        <hr/>
                        <button
                            className="btn btn-outline-danger"
                            onClick={logout}
                        >
                            LogOut
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;