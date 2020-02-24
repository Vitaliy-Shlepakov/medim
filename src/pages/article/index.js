import React, {useEffect, useContext, useState} from 'react';
import useFetch from '../../hooks/useFetch';
import { Link, Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import TagList from "../../components/TagList";
import { CurrentUserContext} from "../../contexts/currectUser";

const Article = props => {
    const slug = props.match.params.slug;
    const apiUrl = `/articles/${slug}`;
    const [{
        response: fetchArticleresponse,
        error: fetchArticleError,
        isLoading: fetchArticleIsLoading
    }, doFetch] = useFetch(apiUrl);
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl);
    const [currentUserState] = useContext(CurrentUserContext);
    const [isSuccessfullDelete, setSuccessfullDelete] = useState(false);

    //сравниваем текущего пользователя с автором статьи
    const isAuthor = () => {
        if(!fetchArticleresponse || !currentUserState.isLoggedIn){
            return false;
        };
        return fetchArticleresponse.article.author.username === currentUserState.currentUser.username;
    };

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'DELETE'
        });
    };

    useEffect(() => {
        doFetch();
    }, [doFetch]);

    useEffect(() => {
        if (!deleteArticleResponse) return;
        setSuccessfullDelete(true);
    }, [deleteArticleResponse]);

    if(isSuccessfullDelete){
        return <Redirect to={'/'}/>
    }

    return (
        <div className="article-page">
            <div className="banner">
                {!fetchArticleIsLoading && fetchArticleresponse && (
                    <div className="container">
                        <h1>{fetchArticleresponse.article.title}</h1>
                        <div className="article-meta">
                            <Link to={`/profiles/${fetchArticleresponse.article.author.username}`}>
                                <img src={fetchArticleresponse.article.author.image} alt="#"/>
                            </Link>
                            <div className="info">
                                <Link to={`/profiles/${fetchArticleresponse.article.author.username}`}>
                                    { fetchArticleresponse.article.author.username }
                                </Link>
                                <span className="date">
                                    { fetchArticleresponse.article.createdAt }
                                </span>
                                {
                                    isAuthor() && (
                                        <span>
                                            <Link
                                                className="btn btn-outline-secondary btn-sm"
                                                to={`/srticles/${fetchArticleresponse.article.slug}/edit`}
                                            >
                                                <i className="ion-edit"></i>
                                                &nbsp;
                                                Edit Article
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={deleteArticle}
                                            >
                                                <i className="ion-trash-a"></i>
                                                &nbsp;
                                                Delete article
                                            </button>
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="container page">
                { fetchArticleIsLoading && <Loading/> }
                { fetchArticleError && <ErrorMessage/> }
                {
                    !fetchArticleIsLoading && fetchArticleresponse && (
                        <div className="row article-content">
                            <div className="col-xs-12">
                                <div>
                                    <p>{fetchArticleresponse.article.body}</p>
                                </div>
                                <TagList tags={fetchArticleresponse.article.tagList}/>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Article;
