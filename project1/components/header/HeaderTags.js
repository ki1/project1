import React from 'react';
import Head from 'next/head';
import { FAVICON } from '../../config/constants/images';
import { BRAND_WOWCHER, SITE_NAME } from '../../config/setup/setup';
import PropTypes from 'prop-types';
import { FACEBOOK_ID } from '../../config/social/config';

const HeaderTags = ({
  title = '',
  description = '',
  image = '',
  canonicalUrl = '',
}) => {
  const Environment = process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER;
  const fav = FAVICON[Environment];

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={fav} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content="INDEX, FOLLOW" />
      <meta name="fragment" content="!" />
      <meta
        property="og:site_name"
        content={SITE_NAME[process.env.NEXT_PUBLIC_SITE]}
      />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta
        property="og:app_id"
        content={
          FACEBOOK_ID[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
            process.env.NEXT_PUBLIC_SITE || 'wowcher'
          ]
        }
      ></meta>
      <meta name="google-signin-scope" content="profile email" />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

HeaderTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  canonicalUrl: PropTypes.string,
};

export default HeaderTags;
