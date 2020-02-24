import React, {useEffect, useState, useContext} from 'react';
import ArticleForm from "../../components/ArticleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currectUser";

const EditArticle = props => {
    const [currentUserContext] = useContext(CurrentUserContext);
    const slug = props.match.params.slug;
    const apiUrl = `/articles/${slug}`;
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl);
    const [{response: updateArticleResponse, error: updateArticleError}, updateFetchArticle] = useFetch(apiUrl);

    const [initialValues, setInitialsValue] = useState(null);
    const [isSuccessfullSubmit, setSuccessfulSubmit] = useState(false);

    useEffect(() => {
        doFetchArticle();
    }, [doFetchArticle]);

    useEffect(() => {
        if(!fetchArticleResponse) {
            return;
        };

        setInitialsValue({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        });
    }, [fetchArticleResponse]);

    const handleSubmit = article => {
        updateFetchArticle({
            method: 'PUT',
            data: {
                article
            }
        });
    };

    useEffect(() => {
        if(!updateArticleResponse) return;

        setSuccessfulSubmit(true);
    }, [updateArticleResponse]);

    if(isSuccessfullSubmit){
        return <Redirect to={`/articles/${slug}`}/>
    };

    if(currentUserContext.isLoggedIn === false) {
        return <Redirect to="/"/>
    }

    return (
        <div>
            <ArticleForm
                onSubmit={handleSubmit}
                errors={(updateArticleError && updateArticleError.errors) || {}}
                initialValues={initialValues}
            />
        </div>
    );
};

export default EditArticle;