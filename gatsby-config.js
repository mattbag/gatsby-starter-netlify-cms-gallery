module.exports = {
  siteMetadata: {
    title: `Netlifolio feat. Gatsby`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img`,
        name: 'images'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/galleries`,
        name: 'galleries'
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
        `gatsby-plugin-sharp`,
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            // maxWidth: 590,
            // Remove the default behavior of adding a link to each
            // image.
            linkImagesToOriginal: true,
            // Analyze images' pixel density to make decisions about
            // target image size. This is what GitHub is doing when
            // embedding images in tickets. This is a useful setting
            // for documentation pages with a lot of screenshots.
            // It can have unintended side effects on high pixel
            // density artworks.
            //
            // Example: A screenshot made on a retina screen with a
            // resolution of 144 (e.g. Macbook) and a width of 100px,
            // will be rendered at 50px.
            //
            // Defaults to false.
            // sizeByPixelDensity: false,
          },
        },
      ],
      }
    },
    `gatsby-plugin-react-next`
  ]
};
