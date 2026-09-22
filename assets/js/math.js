// Renders the LaTeX that kramdown has marked up, using KaTeX.
// Loaded only on pages with `math: true`. See _includes/math.html.
(function () {
  function render() {
    if (!window.renderMathInElement) return;

    window.renderMathInElement(document.body, {
      // kramdown emits \[...\] for display math and \(...\) for inline math.
      // Deliberately no bare `$` delimiter: it would swallow dollar signs in
      // prose and shell snippets.
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      // Never let one bad command blank the page — show it in red instead.
      throwOnError: false,
      errorColor: '#c1442e',
      // Belt and braces; these are KaTeX's defaults, spelled out so it's
      // obvious that code blocks are left alone.
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option']
    });
  }

  // katex.min.js, auto-render.min.js and this file are all `defer`, so they
  // run in document order once parsing finishes. The readyState check is a
  // fallback in case that ever changes.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
