import { appName } from '@/constants';
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string; // Declared in interface
}

const SEO = ({
  title = 'StarlearnAI', // Fixed: Added comma
  description = 'The Course Alchemist', // Fixed: Added comma
  keywords = 'StarlearnAI COURSE GENERATOR, COURSE CREATOR, AI-Powered Learning', // Fixed: Added comma
  canonicalUrl = '', // Fixed: Added comma
  ogImage = '' // Fixed: Destructured and provided a default empty string
}: SEOProps) => {
  // Format the title to include the brand name
  const formattedTitle = `${title} | ${appName}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />} {/* Added og:image */}
      {/* Optional: Add og:url if you have a way to get the current page URL reliably */}
      {/* <meta property="og:url" content={window.location.href} /> */}


      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />} {/* Added twitter:image */}
      {/* Optional: Add twitter:site or twitter:creator if applicable */}
      {/* <meta name="twitter:site" content="@yourtwitterhandle" /> */}
    </Helmet>
  );
};

export default SEO;