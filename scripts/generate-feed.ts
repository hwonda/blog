import fs from 'fs';
import { Feed } from 'feed';
import path from 'path';
import { getSortedPostList } from '../src/utils/postUtils';
import { blogMetadata } from '../src/constants';

async function generateRssFeed() {
  const posts = await getSortedPostList();
  const siteURL = blogMetadata.url;
  const date = new Date();

  // Create feed instance
  const feed = new Feed({
    title: blogMetadata.name,
    description: blogMetadata.description,
    id: siteURL,
    link: siteURL,
    image: blogMetadata.thumbnailURL,
    favicon: `${ siteURL }/favicon.ico`,
    copyright: `All rights reserved ${ date.getFullYear() }, ${ blogMetadata.author.name }`,
    updated: date,
    feedLinks: {
      rss2: `${ siteURL }/rss/feed.xml`,
      json: `${ siteURL }/rss/feed.json`,
      atom: `${ siteURL }/rss/atom.xml`,
    },
    author: {
      name: blogMetadata.author.name,
      email: blogMetadata.author.contacts.email,
      link: blogMetadata.author.contacts.github,
    },
  });

  // Add posts to feed
  posts.forEach((post) => {
    const url = `${ siteURL }${ post.url }`;

    // Make sure thumbnail URL is absolute
    let thumbnailUrl = undefined;
    if (post.thumbnail) {
      // Check if the thumbnail URL is already absolute
      if (post.thumbnail.startsWith('http')) {
        thumbnailUrl = post.thumbnail;
      } else {
        // Make it absolute by prepending the site URL
        thumbnailUrl = `${ siteURL }${ post.thumbnail.startsWith('/') ? '' : '/' }${ post.thumbnail }`;
      }
    }

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.desc,
      content: post.content,
      author: [
        {
          name: blogMetadata.author.name,
          email: blogMetadata.author.contacts.email,
          link: blogMetadata.author.contacts.github,
        },
      ],
      date: new Date(post.date),
      image: thumbnailUrl,
    });
  });

  // Ensure directory exists
  const publicDirectory = path.join(process.cwd(), 'public');
  const rssDirectory = path.join(publicDirectory, 'rss');

  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory);
  }

  if (!fs.existsSync(rssDirectory)) {
    fs.mkdirSync(rssDirectory);
  }

  // Write feed to files
  fs.writeFileSync(path.join(rssDirectory, 'feed.xml'), feed.rss2());
  fs.writeFileSync(path.join(rssDirectory, 'atom.xml'), feed.atom1());
  fs.writeFileSync(path.join(rssDirectory, 'feed.json'), feed.json1());

  console.log('RSS feed generated successfully!');
}

// Execute the function
generateRssFeed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  });
