import React, {useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import {Link} from "react-router-dom";

const PopularTags = () => {
    const [{response, error, isLoading}, doFetch] = useFetch('/tags');

    useEffect(() => {
        doFetch();
    }, [doFetch]);

    if(isLoading || !response){
        return <Loading/>
    };

    if(error){
        return <ErrorMessage/>
    };
    console.log(response, 'response');

    return(
        <div className="sidebar">
            <p>Popular tags</p>
            <div className="tag-list">
                {response.tags.map(tag => (
                    <Link
                        to={`/tags/${tag}`}
                        className='tag-default tag-pill'
                        key={tag}
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default PopularTags;