/* ============================================================
   Blog posts — maintain the list here, no HTML changes needed
   ------------------------------------------------------------
   To add a post: copy one object into the POSTS array below.
   Fields:
     date  date (e.g. '2026' or '2026.04')
     title title
     desc  one-line summary
     tag   tag (e.g. 'Paper' / 'WeChat' / 'Tech'; leave '' for none)
     url   link (leave '' to render a non-clickable entry)
   ============================================================ */
(function () {
  'use strict';

  var POSTS = [
    {
      date: '2026',
      title: 'SceneGate: Scene-Adaptive OVOD',
      desc: 'ICIC 2026 Oral — a training-free scene-adaptive inference bridge connecting frozen YOLO + CLIP, +8.1 AP on COCO novel classes.',
      tag: 'Paper',
      url: 'https://link.springer.com/chapter/10.1007/978-981-92-3531-5_36'
    },
    {
      date: '2024',
      title: 'Rural Teaching in Zunyi, Guizhou',
      desc: 'Taught Grade 5 English and music, directed a large arts gala, and organized a science festival and sports day.',
      tag: 'WeChat',
      url: 'https://mp.weixin.qq.com/s/kHKY8L17FYt0b55MtTfjlw'
    }
  ];

  var list = document.getElementById('blogList');
  if (!list) return;

  POSTS.forEach(function (p) {
    var isLink = typeof p.url === 'string' && p.url.length > 0;
    var post = document.createElement(isLink ? 'a' : 'div');
    post.className = 'blog-post';
    if (isLink) {
      post.href = p.url;
      post.target = '_blank';
      post.rel = 'noopener';
    }

    var meta = document.createElement('div');
    meta.className = 'blog-meta';
    if (p.date) {
      var date = document.createElement('span');
      date.className = 'blog-date';
      date.textContent = p.date;
      meta.appendChild(date);
    }
    if (p.tag) {
      var tag = document.createElement('span');
      tag.className = 'blog-tag';
      tag.textContent = p.tag;
      meta.appendChild(tag);
    }

    var body = document.createElement('div');
    body.className = 'blog-body';
    var title = document.createElement('div');
    title.className = 'blog-title';
    title.textContent = p.title;
    body.appendChild(title);
    if (p.desc) {
      var desc = document.createElement('div');
      desc.className = 'blog-desc';
      desc.textContent = p.desc;
      body.appendChild(desc);
    }
    if (isLink) {
      var more = document.createElement('span');
      more.className = 'blog-more';
      more.textContent = 'Read more →';
      body.appendChild(more);
    }

    post.appendChild(meta);
    post.appendChild(body);
    list.appendChild(post);
  });
})();
