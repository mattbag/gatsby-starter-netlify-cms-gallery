import React from 'react';
import Content, { HTMLContent } from '../components/Content';
import Helmet from 'react-helmet';

export const GalleryTemplate = ({ content, contentComponent, description, title,hero, helmet }) => {
  const PostContent = contentComponent || Content;
  return <section className="section">
    { helmet ? helmet : ""}
    <div className="container content">
    <img src={hero} alt={title} />
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">{title}</h1>
          <p>{description}</p>
         
          <PostContent content={content} />
        </div>
      </div>
    </div>
  </section>;
}

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return <GalleryTemplate
    content={post.html}
    contentComponent={HTMLContent}
    description={post.frontmatter.description}
    helmet={<Helmet title={`Blog | ${post.frontmatter.title}`} />}
    title={post.frontmatter.title}
    hero={post.frontmatter.heroImage}
  />;
}

export const pageQuery = graphql`
  query GalleryByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        description
        heroImage
      }
    }
  }
`;
