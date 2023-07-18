import React, { useEffect, useState } from 'react'
import NewsItem from '../NewsItem';
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    

    const capitalizeFirstLetter = (word) => {
        return word[0].toUpperCase() + word.substring(1)
    }

    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30)
        let pasredData = await data.json();
        props.setProgress(70);
        setArticles(pasredData.articles)
        setTotalResults(pasredData.totalResults)
        setLoading(false)

        props.setProgress(100)
    }

    useEffect(() => {
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    }, [])

    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let pasredData = await data.json();

        setArticles(articles.concat(pasredData.articles))
        setTotalResults(pasredData.totalResults)
        console.log(articles.length)
        console.log(totalResults)
    };

    return (
        <>
            <div className='container my-3'>
                <h1 className='text-center' style={{margin: "2em 0 0.7em 0"}}>Top {(props.category !== "general" ? capitalizeFirstLetter(props.category) : "")} Headlines</h1>
                <hr />
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map(item => {
                                return <div key={item.url} className="col-md-4">
                                    <NewsItem title={item.title} description={item.description}
                                        imageUrl={item.urlToImage} newsUrl={item.url} author={item.author}
                                        date={item.publishedAt} source={item.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>

    )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
