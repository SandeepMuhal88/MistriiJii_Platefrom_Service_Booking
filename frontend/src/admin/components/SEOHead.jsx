/**
 * SEOHead.jsx — Reusable per-page SEO component using react-helmet-async.
 *
 * Usage:
 *   <SEOHead
 *     title="Page Title | MistriJii"
 *     description="Page meta description..."
 *     canonical="https://mistrijii.in/page"
 *     ogImage="https://mistrijii.in/logo.png"
 *     schema={[...jsonLdObjects]}
 *   />
 */
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'MistriJii';
const DEFAULT_OG_IMAGE = 'https://mistrijii.in/logo.png';
const BASE_URL = 'https://mistrijii.in';

const SEOHead = ({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    schema = [],          // array of JSON-LD objects
    noindex = false,
}) => {
    const fullTitle = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} — Expert Home Services On Demand`;

    const resolvedCanonical = canonical
        ? `${BASE_URL}${canonical}`
        : BASE_URL;

    return (
        <Helmet>
            {/* Core */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={resolvedCanonical} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={resolvedCanonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD Structured Data */}
            {schema.map((obj, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(obj)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEOHead;
