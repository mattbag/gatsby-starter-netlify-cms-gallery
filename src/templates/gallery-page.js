import React from 'react';
import Content, { HTMLContent } from '../components/Content';
import Helmet from 'react-helmet';
import Img from "gatsby-image";
import './grid.css'

export const GalleryTemplate = ({ content, contentComponent, description, title,hero, helmet, gallery }) => {
  const PostContent = contentComponent || Content;
  return <section className="section">
    { helmet ? helmet : ""}
    <div className="container content">

      <div className="columns">
        <div className="column is-6">
        <Img sizes={gallery[0].node.childImageSharp.sizes} />
      </div>
        <div className="column is-6 is-pull-1" style={{backgroundColor:'#fff', zIndex: 1}}>
          <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
          <p>{description}</p>
          <PostContent content={content} />
      </div>
        
      </div>
      <div className="gr">
      {gallery.map(gal=>
      <div key={gal.node.id}>
        <Img sizes={gal.node.childImageSharp.sizes} />
        </div>
      )}
      </div>
    </div>
  </section>;
}

export default ({ data }) => {
  const { markdownRemark: post , allFile : gallery} = data;
  let temp = gallery.edges.filter(edge=>
     edge.node.relativeDirectory === post.frontmatter.path.replace('/','')
  );
  // console.log(temp);
  return <GalleryTemplate
    content={post.html}
    contentComponent={HTMLContent}
    description={post.frontmatter.description}
    helmet={<Helmet title={`${post.frontmatter.title}`} />}
    title={post.frontmatter.title}
    hero={post.frontmatter.heroImage}
    gallery={temp}
  />;
}

export const galleryQuery = graphql`
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
    allFile(filter: { id: { regex: "/galleries/" } }) {
      edges {
        node {
          relativeDirectory
          dir
          childImageSharp {
            id
            sizes {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
            }
          }
        }
      }
    }
  }
`;
