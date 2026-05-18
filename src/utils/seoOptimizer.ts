export type AssetCategory =
  | 'graphic-design'
  | 'procreate'
  | 'notion'
  | 'canva'
  | 'shopify'
  | 'photography'
  | 'font'
  | 'kdp'
  | 'teacherspay'
  | 'figma'
  | 'lottie'
  | 'ui-kit'
  | 'general'

export interface MetadataInput {
  productTitle: string
  category: AssetCategory
  features: string
  license: string
  fileFormats: string
}

const keywordMap: Record<AssetCategory, string[]> = {
  'graphic-design':  ['graphic design elements', 'digital design assets', 'commercial use svg', 'vector bundle', 'design toolkit', 'instant download', 'creative elements'],
  'procreate':       ['procreate brushes', 'procreate stamp set', 'ipad artist tools', 'digital art brushes', 'procreate texture pack', 'brush bundle', 'digital painting tools'],
  'notion':          ['notion template', 'productivity system', 'notion dashboard', 'digital planner notion', 'content calendar notion', 'life os template', 'second brain notion'],
  'canva':           ['canva template', 'editable social media', 'instagram canva', 'brand kit canva', 'content creator template', 'canva pro elements', 'small business canva'],
  'shopify':         ['shopify theme', 'ecommerce store template', 'conversion optimized theme', 'dropshipping theme', 'online store design', 'shopify 2.0 theme', 'modern shopify'],
  'photography':     ['lightroom preset', 'photo editing preset', 'moody preset pack', 'portrait lightroom', 'professional photo filter', 'adobe lightroom bundle', 'camera raw preset'],
  'font':            ['commercial font license', 'handwritten typeface', 'modern display font', 'logo font bundle', 'branding typeface', 'sans serif font', 'multilingual font'],
  'kdp':             ['kdp interior template', 'amazon kdp', 'low content book', 'journal template kdp', 'planner kdp interior', 'activity book kdp', 'kdp notebook interior'],
  'teacherspay':     ['teachers pay teachers', 'classroom resource', 'printable worksheet', 'educational activity', 'lesson plan template', 'student activity sheet', 'homeschool resource'],
  'figma':           ['figma ui kit', 'figma component library', 'figma design system', 'figma template', 'web design figma', 'figma wireframe kit', 'figma mobile ui'],
  'lottie':          ['lottie animation', 'json animation file', 'web animation', 'motion graphics file', 'animated icon pack', 'lottie json bundle', 'after effects lottie'],
  'ui-kit':          ['ui kit design', 'web ui components', 'design system ui', 'mobile app ui kit', 'dashboard ui template', 'saas ui kit', 'react component kit'],
  'general':         ['digital download instant', 'commercial use license', 'digital product bundle', 'creative asset pack', 'digital tools bundle', 'professional resource kit', 'instant digital file'],
}

const templates: Record<AssetCategory, string> = {
  'graphic-design': `# {product_title}

## ✨ Transform Your Creative Projects
{product_title} is a premium graphic design asset collection built for designers, marketers, and creators who refuse to settle for average.

## 🎨 What's Inside
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 SEO Keywords
{keywords}

---
*Works on Canva, Photoshop, Illustrator, Affinity, Figma and more. Instant ZIP download.*`,

  'procreate': `# {product_title}

## 🖌️ Elevate Your iPad Art
{product_title} — handcrafted Procreate brushes built by artists, for artists. Stop settling for basic brushes.

## 🎨 What's Included
{features}

## 📁 Compatibility
{file_formats}

## ⚖️ License
{license}

## 🔍 Tags
{keywords}

---
*Procreate 5.2+ compatible. One-tap install. Instant download.*`,

  'notion': `# {product_title}

## 📋 Your New Productivity Superpower
Stop wasting time building systems from scratch. {product_title} is a ready-to-use Notion workspace built for high performers.

## ✅ What's Inside
{features}

## 📁 Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*Duplicate to your Notion in one click. Works on Free and Plus plans.*`,

  'canva': `# {product_title}

## 🎨 Stand Out Everywhere You Post
{product_title} — fully editable Canva templates designed to make you look like you hired a professional designer.

## ✨ What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Tags
{keywords}

---
*Requires free Canva account. Editable in Canva Free and Pro.*`,

  'shopify': `# {product_title}

## 🛍️ Launch a Store That Converts
{product_title} — a high-performance Shopify theme engineered for maximum sales and minimum setup time.

## 💼 What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*Compatible with Shopify 2.0. Full documentation included.*`,

  'photography': `# {product_title}

## 📸 Professional Photos in One Click
{product_title} — cinema-quality Lightroom presets used by professional photographers worldwide.

## 🌟 What's Included
{features}

## 📁 Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Tags
{keywords}

---
*Works with Lightroom Classic, CC, and Mobile. Adobe Camera Raw compatible.*`,

  'font': `# {product_title}

## ✍️ The Typeface Your Brand Deserves
{product_title} — a premium typeface crafted for logos, packaging, editorial design, and brand identity.

## 🔤 What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*OTF and TTF included. Works on Mac, Windows, Canva, and Adobe suite.*`,

  'kdp': `# {product_title}

## 📚 Ready-to-Upload KDP Interior
{product_title} — a professionally designed Amazon KDP interior template. Upload, publish, and start earning royalties.

## 📖 What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*Print-ready PDF included. Sized for all standard KDP trim sizes.*`,

  'teacherspay': `# {product_title}

## 🍎 Save Hours of Lesson Planning
{product_title} — a classroom-ready resource that teachers love and students actually engage with.

## ✅ What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*Print-ready and digital versions included. Google Slides compatible.*`,

  'figma': `# {product_title}

## 🎯 Ship Better Designs Faster
{product_title} — a production-ready Figma resource that saves your team weeks of design work.

## 🖥️ What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*Figma 2026 compatible. Auto-layout and variables ready.*`,

  'lottie': `# {product_title}

## ✨ Add Life to Your Interfaces
{product_title} — smooth, lightweight Lottie animations that make your app or website feel premium.

## 🎬 What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*JSON and dotLottie formats included. Web, iOS, and Android compatible.*`,

  'ui-kit': `# {product_title}

## 🚀 Build Faster. Design Smarter.
{product_title} — a complete UI design system that gives your team a consistent, scalable design foundation from day one.

## 🧩 What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*Includes Figma source files, CSS variables, and developer handoff notes.*`,

  'general': `# {product_title}

## 📦 Professional Quality, Instant Results
{product_title} — a premium digital resource designed to save you time and elevate every project you touch.

## ✅ What's Included
{features}

## 📁 File Formats
{file_formats}

## ⚖️ License
{license}

## 🔍 Keywords
{keywords}

---
*Instant ZIP download. Compatible with all major creative tools.*`,
}

export function generateMetadata(input: MetadataInput): string {
  const keywords = keywordMap[input.category].join(', ')
  const template = templates[input.category]
  return template
    .replace(/{product_title}/g, input.productTitle || 'My Digital Product')
    .replace(/{features}/g,      input.features     || '- See ZIP contents for full list')
    .replace(/{file_formats}/g,  input.fileFormats   || 'See ZIP contents')
    .replace(/{license}/g,       input.license       || 'Personal and commercial use allowed')
    .replace(/{keywords}/g,      keywords)
}