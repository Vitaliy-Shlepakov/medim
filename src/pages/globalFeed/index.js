import React, {useEffect} from 'react';
import Feed from "../../components/Feed";
import useFetch from '../../hooks/useFetch';
import Pagination from "../../components/Pagination";
import { getPaginator, limit } from "../../utils";
import { stringify } from "query-string";
import PopularTags from "../../components/PopularTags";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import FeedToggler from "../../components/FeedToggler";

const GlobalFeet = props => {
    //формируем строку запроса
    const {currentPage, offset} = getPaginator(props.location.search);
    const stringifiedParams = stringify({
        limit,
        offset
    });
    const apiUrl = `/articles?${stringifiedParams}`;
    const url = props.match.url;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage]);

    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p>
                </div>
            </div>

            <div className="container page">
                <FeedToggler
                    tagName="foo"
                />
                <div className="row">
                    <div className="col-md-9">
                        { isLoading && <Loading/> }
                        { error && <ErrorMessage/> }
                        { !isLoading && response &&
                            <>
                                <Feed articles={response.articles}/>
                                <Pagination
                                    total={response.articlesCount}
                                    limit={limit}
                                    currentPage={currentPage}
                                    url={url}
                                />
                            </>
                        }
                    </div>
                    <div className="col-md-3">
                        <PopularTags

                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GlobalFeet;
