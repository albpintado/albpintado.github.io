# Blog System

This is a simple, efficient blog system built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build process required!

## How It Works

The blog system consists of:

1. **posts.json** - A manifest file containing metadata for all blog posts
2. **posts/** - Directory containing individual HTML files for each blog post
3. **post-template.html** - A template file to copy when creating new posts

Blog posts are loaded dynamically on the homepage using JavaScript, but each post is a standalone HTML file (great for SEO and direct linking).

## Adding a New Blog Post

### Step 1: Create the HTML File

1. Copy `post-template.html` from the blog directory
2. Rename it to match your post slug (e.g., `my-new-post.html`)
3. Move it to the `blog/posts/` directory
4. Edit the content:
   - Update the `<title>` tag
   - Update the `<meta name="description">` tag
   - Change the `<h1 class="post-title">` to your post title
   - Update the post meta information (date, read time)
   - Update or add tags in the `<div class="post-tags">` section
   - Write your content in the `<div class="post-content">` section

### Step 2: Add Entry to posts.json

Add a new entry to the `posts.json` file in the blog directory:

```json
{
  "id": "my-new-post",
  "title": "My New Blog Post Title",
  "date": "2026-01-15",
  "excerpt": "A brief description of what your post is about. This will appear on the blog listing page.",
  "tags": ["JavaScript", "Web Development", "Tutorial"],
  "slug": "my-new-post",
  "readTime": "5 min read"
}
```

**Important:** The `slug` field should match your HTML filename (without the .html extension).

### Step 3: Commit and Push

That's it! Your new post will automatically appear on the blog section of the homepage.

## File Naming Convention

- Use lowercase letters
- Separate words with hyphens (kebab-case)
- Keep filenames descriptive but concise
- Example: `understanding-async-await-javascript.html`

## Writing Content

### Headings

Use `<h2>` for main sections and `<h3>` for subsections:

```html
<h2>Main Section</h2>
<h3>Subsection</h3>
```

### Code Blocks

For inline code, use `<code>`:

```html
<p>Use the <code>async</code> keyword to create async functions.</p>
```

For code blocks, use `<pre><code>`:

```html
<pre><code>const greeting = 'Hello, World!';
console.log(greeting);</code></pre>
```

### Syntax Highlighting

Add syntax highlighting using CSS classes:

```html
<pre><code><span class="keyword">const</span> user = {
  <span class="property">name</span>: <span class="string">'John'</span>,
  <span class="property">age</span>: <span class="string">30</span>
};

<span class="comment">// This is a comment</span>
<span class="keyword">function</span> <span class="function">greet</span>(name) {
  <span class="keyword">return</span> <span class="string">`Hello, ${name}!`</span>;
}</code></pre>
```

Available classes:
- `.keyword` - for language keywords (const, let, function, etc.)
- `.string` - for string values
- `.property` - for object properties
- `.function` - for function names
- `.comment` - for comments

### Lists

Unordered list:
```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

Ordered list:
```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

### Blockquotes

For important notes or quotes:

```html
<blockquote>
  This is an important note or quote that deserves special attention.
</blockquote>
```

### Links

```html
<p>Check out <a href="https://example.com">this resource</a> for more information.</p>
```

## Tips

1. **Keep posts focused** - One main topic per post
2. **Use descriptive titles** - Clear and SEO-friendly
3. **Write engaging excerpts** - This appears on the homepage
4. **Add relevant tags** - Helps categorize your content
5. **Estimate read time** - Use ~200 words per minute as a guideline
6. **Test locally** - Open the HTML file directly in a browser to preview
7. **Proofread** - Check for typos and formatting before publishing

## Advantages of This System

✅ **No build process** - Just create HTML files
✅ **SEO friendly** - Each post is a real HTML page
✅ **Fast loading** - Static files served directly
✅ **Works without JS** - Individual posts don't require JavaScript
✅ **Easy to maintain** - Plain HTML/CSS/JS, no dependencies
✅ **Version controlled** - All content in Git
✅ **Portable** - Works anywhere that serves static files

## Optional: Converting from Markdown

If you prefer writing in Markdown, you can create a simple build script (see the main README for details), but the system works perfectly well with plain HTML too!
