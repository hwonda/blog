import { promises as fs } from 'fs';
import { blogMetadata } from '../src/constants';

(() => {
  const createRobotsTxt = () => {
    const siteUrl = blogMetadata.url;

    const text = "User-agent: *\n" +
                 "Allow: /\n" +
                 `Sitemap: ${siteUrl}/sitemap.xml\n` +
                 `Host: ${siteUrl}`;

    return text;
  };

  fs.writeFile('public/robots.txt', createRobotsTxt(), 'utf-8');
  console.log('robots.txt generated');
})();
