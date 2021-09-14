const title = "ETH2me – Receive ETH on your site";
const description = "ETH2me is a small widget for accepting donations in Ether";

const SEO = {
  title,
  description,
  canonical: "https://eth2me.vercel.app",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://eth2me.vercel.app",
    title,
    description,
    images: [
      {
        url: "https://eth2me.vercel.app/og.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
