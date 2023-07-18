import React, { Component } from 'react'
import NewsItem from '../NewsItem';
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeTitle = (word) => {
        return word[0].toUpperCase() + word.substring(1)
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeTitle(this.props.category)} - NewsMonkey`

    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let pasredData = await data.json();
        this.props.setProgress(70)
        this.setState({
            articles: pasredData.articles,
            totalResults: pasredData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let pasredData = await data.json();
        // this.setState({
        //     articles: this.state.articles.concat(pasredData.articles),
        //     totalResults: pasredData.totalResults,
        //     // loading: false
        // })
        this.setState((previousState) => ({
            articles: previousState.articles.concat(pasredData.articles),
            totalResults: pasredData.totalResults
        }))
        console.log(this.state.articles.length)
        console.log(this.state.totalResults)
      };

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    render() {
        return (
            <>
                <div className='container my-3'>
                    <h2 className='text-center'>Newsmonkey - Top {this.capitalizeTitle(this.props.category)} Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                        <div className="row">
                            {this.state.articles.map(item => {
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
                {/* <div className="container d-flex justify-content-between mb-5">
                    <button disabled={this.state.page === 1} className='btn btn-dark' onClick={this.handlePrevClick} > &#129056; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick} > Next &#129058;</button>
                </div> */}
            </>

        )
    }
}

export default News
