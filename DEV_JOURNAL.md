# Dev Journal

## 2026-04-26 — Day 1

### Project Setup
Started by scaffolding the project with Vite + React + TypeScript and Tailwind CSS.
I chose this stack because it's fast to set up and keeps everything in one place —
no extra config needed to get TypeScript and CSS working together.

One thing I appreciated right away was TypeScript catching errors before I even ran
the app. For example, when I defined the `Asset` type, TypeScript immediately flagged
any component that was missing a required field. That kind of instant feedback made
the whole build feel more confident — I wasn't waiting until runtime to find mistakes.

### Building Components
I enjoyed the component-driven approach the most. Breaking the UI into small pieces
like `AssetCard`, `AssetList`, `SearchBar`, and `Sidebar` made the code much cleaner
than writing everything in one place. Each component has one job, which also makes it
easy to reuse — for example, the `AssetCard` is used in the grid without knowing
anything about filters or search.

### Why ES6
I used modern ES6+ throughout the project — arrow functions, destructuring, spread
operators, `const`/`let`, and `Array.filter/map`. I've been attending a programming
study group and one thing that really stuck with me is how ES6 makes JavaScript more
readable and less error-prone. Avoiding `var`, using destructuring instead of manual
property access, and writing concise arrow functions all contribute to code that's
easier to follow at a glance. That's why I made it a point to apply ES6 consistently
here rather than mixing old and new styles.

### Tailwind CSS Experience
One thing I genuinely enjoyed during this project was writing styles with Tailwind CSS.
Instead of jumping between a stylesheet and a component file, everything lives right in
the JSX — classes like `flex`, `gap-4`, `rounded-lg`, and `text-sm` are self-explanatory
at a glance. It made the UI come together quickly without losing control of the design.
I also appreciated how Tailwind's utility classes kept the visual consistency tight across
components. Things like spacing, colors, and typography stayed uniform without having to
define shared variables. The result is a UI that looks clean and polished with much less
effort than traditional CSS would have required.

### What I'd Do Differently
If I had more time I would add React Router DOM to make individual assets deep-linkable
via URL, and connect the form to a real backend instead of mock data. I'd also add
more test coverage for the `AssetDetail` and `Sidebar` components.
