export default function LaunchBadges() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 mb-8">
      
      {/* 1. PRODUCT HUNT BADGE - LCP PRIORITIZED */}
      <a href="https://www.producthunt.com/products/assetforge-labs?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-assetforge-labs" target="_blank" rel="noopener noreferrer">
        <img alt="AssetForge Labs - World's First Digital asset packaging tool | Product Hunt" width="250" height="54" fetchpriority="high" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1153627&amp;theme=light&amp;t=1779541569851" />
      </a>
      
      {/* 2. SHIPIT BADGE - LCP PRIORITIZED */}
      <a href="https://www.shipit.buzz/products/assetforge-labs?ref=badge" target="_blank" rel="noopener noreferrer">
        <img src="https://www.shipit.buzz/api/products/assetforge-labs/badge?theme=dark" alt="Featured on Shipit" width="250" height="54" fetchpriority="high" />
      </a>
      
    </div>
  );
}
