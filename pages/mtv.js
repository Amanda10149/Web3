// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

function dateConv(dateString) {
  var d = new Date(dateString);
  return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
}


const source = 'mtv-news';

//my api key
const apiKey = '685522cd483047daa4382bbcb5a043ee';

const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;


// Pass this content as 'props' to child components

const News = props => (
  <div>
    <h2>News from {source.split("-").join(" ")}</h2>
    <div>
      {props.articles.map(article => (
        <section>
          <h3>{article.title}</h3>
          <p className="author">{article.author} {dateConv(article.publishedAt)}</p>
          <img src={article.urlToImage} alt="article image" className="img-article"></img>
          <p>{article.description}</p>
          <p>{article.content}</p>
          <p><Link as={`/article/${index}`} href={`/article?id=${index}`}><a>Read More</a></Link></p>

        </section>
      ))}
    </div>


    <style jsx>{`
          section {
            width: 50%;
            border: 2px solid gray;
            border-radius: 8px;
            background-color: #F6C5C5;
            padding: 1em;
            margin-left: 350px;
            margin-right: 350px;
            margin-bottom: 2em;
          }
  
          .author{
            font-style: italic;
            font-size: 0.8em;
          
          }
          .img-article{
            max-width: 50%;
          }
          
        `}</style>
  </div>
);





News.getInitialProps = async function () {
  //make async call
  const res = await fetch(url);
  //get json data when it arrives
  const data = await res.json();
  //log on server side
  console.log(`Show data fetched. Count: ${data.articles.length}`);

  //return an array of articles contained in data
  return {
    articles: data.articles
  }
}

export default News;
