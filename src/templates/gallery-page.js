import React from 'react';
import Content, { HTMLContent } from '../components/Content';
import Helmet from 'react-helmet';
import Img from "gatsby-image";
import Lightbox from 'react-images';
// import LightboxGallery from "../components/lb";
import './grid.css'

// export const GalleryTemplate = ({ content, contentComponent, description, title, hero, helmet, gallery }) => {
class GalleryTemplate extends React.Component {
  constructor(){
    super();
    this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
    };
    
    this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
  }
  // openLightbox(){
  // }
  openLightbox (index, event) {
    // event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
  render() {
    let { content, contentComponent, description, title, hero, helmet, gallery } = this.props
    const PostContent = contentComponent || Content;
    // console.log(this.props)
    let LightboxImages = [];
    gallery.forEach(g=>{
      let temp = { src :g.node.childImageSharp.sizes.originalImg }
      LightboxImages.push(temp);
    });
    
    return <section className="section">
      {helmet ? helmet : ""}
      <div className="container content">

        <div className="columns">
          <div className="column is-6">
            {gallery.length &&
              <Img sizes={gallery[0].node.childImageSharp.sizes} />
              || <img src={hero} alt={title} />
            }
          </div>
          <div className="column is-6 is-pull-1" style={{ backgroundColor: '#fff', zIndex: 1 }}>
            <h1 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h1>
            <p>{description}</p>
            <PostContent content={content} />
          </div>

        </div>
        <div className="gr">
          {gallery && gallery.map((gal, i) =>
            <div key={i} onClick={(e) => this.openLightbox(i, e)}>
              <Img sizes={gal.node.childImageSharp.sizes} />
            </div> || <h2>Coming Soon!</h2>
          )}
        </div>
        <Lightbox
                currentImage={this.state.currentImage}
                onClickThumbnail={this.gotoImage}
                images={LightboxImages}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeLightbox}
                showThumbnails={true}
            />

      </div>
    </section>;
  }
}

export default ({ data }) => {
  const { markdownRemark: post, allFile: gallery } = data;
  let temp = gallery.edges.filter(edge =>
    edge.node.relativeDirectory === post.frontmatter.path.replace('/', '')
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
