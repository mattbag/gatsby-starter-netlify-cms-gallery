import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';
// import './../templates/gallery-page.css'
export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container">
          {posts.filter(post => post.node.frontmatter.templateKey === 'gallery-page').map(({ node: post},i) => {
            return (
              <div className="content" style={{ position: `relative` }} key={post.id}>

                <Link to={post.frontmatter.path} style={{display:`inline-block`}}>

                  <img src={post.frontmatter.heroImage} alt={post.frontmatter.title} style={{
                    width: `100%`, boxShadow: `10px 10px 0 0 black`
                  }} />
                  <div style={{
                    position: `absolute`, top: `60%`, width: `40%`,
                    backgroundColor: `#fff`,
                    padding: `1rem`,
                    boxShadow: `10px 10px 0 0 black`
                  }}>
                    <h2>{post.frontmatter.title}</h2>
                  </div>
                </Link>

              </div>
            );
          })}
        </div>
        {/* <div className="container">
          {posts.filter(post => post.node.frontmatter.templateKey === 'project-page').map(({ node: post }) => {
            return (
              <div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={post.id}>
                <p>
                  <Link className="has-text-primary" to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <small>{post.frontmatter.date}</small>
                </p>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button is-small" to={post.frontmatter.path}>
                    Keep Reading →
                  </Link>
                </p>
              </div>
            );
          })}
        </div> */}
      </section>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
            heroImage
          }
        }
      }
    }
    allFile(filter: {id: {regex: "/galleries/"}}) {
      edges {
        node {
          relativeDirectory
        }
      }
    }
  }
`;
