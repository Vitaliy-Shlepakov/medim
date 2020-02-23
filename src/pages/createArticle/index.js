import React, {useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ArticleForm from "../../components/ArticleForm";
import useFetch from "../../hooks/useFetch";
import { CurrentUserContext } from "../../contexts/currectUser";

const CreateArticle = () => {
    const apiUrl = '/articles';
    const [{response, error}, doFetch] = useFetch(apiUrl);
    const [currentUserState] = useContext(CurrentUserContext);

    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    };
    const [isSeccessfullSubmit, setSuccessfullSubmit] = useState(false);

    const handleSubmit = article => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    };

    useEffect(() => {
        if(!response) return;

        setSuccessfullSubmit(true);
    }, [response]);

    if(currentUserState.isLoggedIn === false){
        return <Redirect to='/'/>
    }

    if(isSeccessfullSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`}/>
    }

    return (
        <div>
            <ArticleForm
                errors={error}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreateArticle;