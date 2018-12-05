// This is the Link API
import Link from 'next/link';
//import fetch libary
import fetch from 'isomorphic-unfetch';
import SearchSelect from '../components/SearchSelect';

function dateConv(dateString) {
  var d = new Date(dateString);
  return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
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

  //method to render page  
  render() {
    //if state articles is empty then copy value from props
    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }

    return (
      <div>

        <SearchSelect setNewsSource={this.setNewsSource} />
        {/*Display a title basesd on source*/}
        <h3>News from RTE {this.state.newsSource.split("-").join(" ")}</h3>
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
          background-color: #71B2FD;
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

    const newsSource = 'rte';
    const apiKey = '685522cd483047daa4382bbcb5a043ee';
    const url = `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${apiKey}`;

    //make async call
    const res = await fetch(url);
    //get json data when it arrives
    const data = await res.json();
    //log on server side
    console.log(`Show data fetched. Count: ${data.articles.length}`);

    //return aary or articles contained in data
    return {
      articles: data.articles
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
      this.state.articles = data.articles;

      //force page update by changing state
      this.setState(this.state);
    }
  }



}

