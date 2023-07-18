import React, { Component } from "react";
import defaultImg from "../../images/Image_not_available.png";

const NewsItem = (props) => {

        const { title, description, imageUrl, newsUrl, author, date, source } = props;

        const replaceImg = (error) => {
            error.target.src = defaultImg
        }


        return (
            <div className="my-3">
                <div className="card news-card">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            position: "absolute",
                            right: "0",
                        }}
                    >
                        <span
                            className="badge rounded-pill bg-danger"
                            style={{ zIndex: 1, left: "85%" }}
                        >
                            {source}
                        </span>
                    </div>


                    <img src={imageUrl} height={"226px"} className="card-img-top" alt={"image"} onError={replaceImg}/>
                    <div className="card-body">
                        <h5 className="card-title news-title">{title}</h5>
                        <p className="card-text news-desc">{description ? description : "The description for this news is not available due to some technical reasons. We'll try to fix this as soon as possible. Sorry for the inconvenience."}</p>
                        <p className="card-text">
                            <small className="text-body-secondary news-author">
                                By {author ? author : "Unknown"} on{" "}
                                {new Date(date).toGMTString()}
                            </small>
                        </p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    
}

export default NewsItem;
