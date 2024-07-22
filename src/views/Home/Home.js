import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import NewsArticle from "./../../components/NewsArticle/NewsArticle";

function Home() {
    const [news, setNews] = useState([])
    const [searchQuery, setSearchQuery] = useState("Pune")

    const loadNews = async () => {
        try{
            const response = await axios.get(
                "https://newsapi.org/v2/everything?q=tesla&from=2024-06-22&sortBy=publishedAt&apiKey=4c087080cb8f475aa10b90f62dd9ec26"
              );
            setNews(response.data.articles)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        loadNews()
    }, [])

    useEffect(()=>{
        loadNews()
    }, [searchQuery])
    
    return (
    <div>
        <h1>  News App </h1>
        <input type="text" className="search-input" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>

        <div className="news-container">
            {
                news.map((newsArticle, index)=>{
                    const {author, title, description, url, urlToImage, publishedAt} = newsArticle
                
                        return (<NewsArticle
                             author={author}
                              title={title}
                              description={description} 
                              url={url}
                               urlToImage={urlToImage} 
                               publishedAt={publishedAt} 
                               key={index}/>)  
                                               
                
                })
            }
        </div>
    </div>
  )
}

export default Home