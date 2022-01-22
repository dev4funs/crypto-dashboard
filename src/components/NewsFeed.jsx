import { useEffect, useState } from "react";
import { BASE_URL } from "../Api";
import axios from "axios";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `${BASE_URL}/news`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const first7articles = articles.slice(0, 7);
  return (
    <div className="news-feed">
      <h2>NewsFeed</h2>

      {first7articles.map((article) => (
        <div>
          <a href={article.url}>
            <p>{article.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
