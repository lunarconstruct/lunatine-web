import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Head } from "./Head"

function GlosserCSS(_: QuartzComponentProps) {
  // This component doesn't render any visible content, just adds to the <head>
  return null
}

GlosserCSS.afterDOMLoaded = () => {
  // You can add logic here if needed, but the link tag in Head is sufficient
}

// This is where we inject the link tag into the Head component
Head.css = Head.css + `
  <link rel="stylesheet" href="/styles.css">
`
// Note: This approach requires you to check how Quartz handles shared component modification.
// A safer, more direct approach might be to modify the Head component directly.

// --- Alternative direct modification of Head.tsx (if you prefer modifying existing files) ---
// If you edit quartz/components/Head.tsx directly:
// Find the `Head.css` property or where styles are defined and add the link tag there:
/*
Head.css = `
  // ... existing styles ...
  @import url(\'https://example.com/path/to/your/styles.css\'); // Example using @import
  <link rel="stylesheet" href="/styles.css"> // Using link tag
`
*/

// --- Using the component's own CSS property (another option) ---
// This adds the CSS inline to the head. It's fine for small snippets, but a full file is bulky.
GlosserCSS.css = `
  /* PASTE ALL the content of the plugin's styles.css file here */
`

export default (() => GlosserCSS) satisfies QuartzComponentConstructor