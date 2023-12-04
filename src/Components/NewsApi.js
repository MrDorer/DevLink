import React, { useEffect, useState } from 'react'
import axios from 'axios'

function NewsApi() {

const [news, setNews] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=software&pageSize=20&sortBy=popularity",
          {
            headers: {
              "X-Api-Key": "0ab8e04dbe1944d79178f1f971919ec0",
            },
          }
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
    <div className="flex mt-20 flex-grow justify-center">
      <div className="flex flex-wrap w-full min-w-6/12 justify-center py-8 px-4">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-center bg-gray-100 px-2 py-2 rounded-md shadow-md">
            Noticias de tecnologia
          </h1>
          <ul>
            {news.map((article, index) => (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <li
                  key={article.url}
                  className="mb-2 bg-gray-100 p-2 rounded-md"
                  style={{
                    boxShadow:
                      "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h2 className="text-lg font-semibold">
                    {article.title}
                  </h2>
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt="Noticia"
                      className="rounded-md my-2 w-full h-48 object-cover"
                    />
                  )}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NewsApi
