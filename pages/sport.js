// This is the Link API
import Link from 'next/link';
//import fetch libary
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';

function dateConv(dateString) {
  var d = new Date(dateString);
  return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
}

async function getNews(url) {

  // try fetch and catch any errors
  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return (data);
  } catch (error) {
    // return error if it occurs
    return (error);
  }
}

//ES6 Classes
export default class News extends React.Component {

  //use constructor to get props and set state
  constructor(props) {
    super(props)

    //state variables
    this.state = {
      newsSource: "",
      articles: []
    }
  }

  setNewsSource = (input) => {
    this.setState({
      newsSource: input
    })
  }

  searchNewsAPI = (event) => {
    // set state values - this will trigger an update and componentDidUpdate
    this.setState({
      // Get the link text
      newsSource: `${event.target.innerText}`,
      // Build the search URL using the link name
      url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
    })
    console.log(this.state.url);
  }

  //method to render page  
  render() {
    //if state articles is empty then copy value from props
    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }

    return (
      <div>

        <SearchForm setNewsSource={this.setNewsSource} />
        <ul className="newsMenu">
          <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=rugby">Rugby</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=football">Football</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=golf">Golf</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=boxing">Boxing</a></li>
        </ul>
        {/*Display a title basesd on source*/}

        <h3>General News {this.state.newsSource.split("-").join(" ")}</h3>
        <div>
          {this.state.articles.map((article, index) => (
            <section key={index}>
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
          background-color: #BDEDFE;
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

  }

  static async getInitialProps() {

    const newsSource = 'bbc-sport';
    const apiKey = '685522cd483047daa4382bbcb5a043ee';
    const url = `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${apiKey}`;

    //make async call
    const res = await fetch(url);
    //get json data when it arrives
    const data = await res.json();
    //log on server side
    console.log(`Show data fetched. Count: ${data.articles.length}`);

    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }


  }

  async componentDidUpdate(prevProps, prevState) {

    //this will be logged client side
    console.log(`update news: ${this.state.newsSource}`);

    //check if newsSource has changed to avoid unecesary updates
    if (this.state.newsSource !== prevState.newsSource) {

      const apiKey = '685522cd483047daa4382bbcb5a043ee';

      //build the url which will be used to get the data
      const url = `https://newsapi.org/v2/top-headlines?sources=${this.state.newsSource}&apiKey=${apiKey}`;

      //make async call
      const res = await fetch(url);
      //get json data when it arrives
      const data = await res.json();

      //store articles in state
      if (Array.isArray(data.articles)) {
        // Store articles in state
        this.state.articles = data.articles;
        // Force page update by changing state (make sure it happens!)
        this.setState(this.state);
      }
      // Otherwise it contains an error, log and redirect to error page (status code 400)
      else {
        console.error(data)
        if (response) {
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }

  }

}

