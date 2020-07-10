# Mumimal

[![CircleCI](https://circleci.com/gh/wabilin/mumimal.svg?style=shield)](https://circleci.com/gh/wabilin/mumimal)

> Mumi and minimal blog engine.

Thin, fast and extendable.

## Install
```sh
# use yarn
yarn add mumimal

# or use npm
npm install mumimal
```

## Usage

### Use command
`mumimal` or `mumimal --config config.js`

### Use module
```js
const { mumimal } = require('mumimal');
const config = {
  //...
}
mumimal(config).then(...)
```

Your project structure should look like
```
├── layouts/
│   ├── index.ejs
│   └── post.ejs
├── posts/
│   ├── 2020-02-02-my-post-1.md
│   └── 2020-03-24-my-post-2.md
├── config.js
├── dist/
└── static/
```

- All files inside `static` would be copy to `dist`.
- Mumimal builds: index, posts, rss and sitemap.

See [example project](https://github.com/wabilin/wabilin.github.io).

### Index
When rendering index, there are: `site` (site config) and
- `site`: site config
- `posts`: meta data of each posts

For example, you can use them like
```ejs
<% posts.forEach(post => { %>
  <header>
    <h3>
      <%= post.dateStr %>
    </h3>
    <h2>
      <a href="<%= post.link %>">
        <%= post.title %>
      </a>
    </h2>
  </header>
<% }) %>
```

To read post content when building index:
```ejs
<% const { content } = funcs.readPostSrc(post.postName) %>
```

### Post
When rendering index, there are:
- `site`: site config
- `meta`: meta data of this post
- `content`: html converted from markdown

For example, you can use them like
```ejs
<% posts.forEach(post => { %>
<head>
  <title>Site Name | <%= meta.title %></title>
</head>
<body>
 <div class="tags"><%= meta.tags.join(', ') %></dib>
  <article>
    <%- content %>
  </article>
</body>
```

And post markdown should in this format
```
---
title: My Post Title
tags: tag1 tag2
---

Text content in [markdown](/markdown.html)
```

### Configuration
Use `mumimal --config config.js` to apply custom config.

```js
// example config.js
const config = {
  site: {
    url: 'https://github.com/yourName/',
    title: 'My Cool Blog'
  },
  feed: {
    title: 'My Cool Blog',
    description: 'This is an apple',
    image: `https://somewhere.example.com/logo.png`,
    categories: ["Tech", "Node.js"]
  },
  build: {
    minify: true,
    minifyOptions: {},
  }
  afterBuild: (context) => {
    console.log(context)
  }
}
module.exports = { config }
```

## What is Mumi

Also known as "姆咪" (Chinese) and "ムミ" (Japanese), .

A characters of Battle Girl High School (バトガ).

Her name is Michelle Watagi (綿木 ミシェル).
But in Taiwan, we all call her Mumi.
