````markdown
# Next.js Data Library & Project Team App

This is a [Next.js](https://nextjs.org) project created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It features a **Data Library**, **Project Team Modals**, dashboards, analytics, and other reusable components for modern web applications.

## Features

- Searchable and categorized **Data Library** with detailed modal views.
- **Project Team Modals** to display team members and their roles.
- Responsive UI with **Tailwind CSS** and `shadcn/ui` components.
- Smooth interactions using **Framer Motion**.
- Modular and scalable folder structure for easier development.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
````

Visit [http://localhost:3000](http://localhost:3000) in your browser.
Edit pages or components in `src/app` or `src/components` – hot reload updates changes automatically.

## Project Structure

```
src/
├─ app/
│  ├─ analytics/          # Pages for analytics, charts, and dashboards
│  ├─ dashboard/          # Main dashboard pages and overview components
│  ├─ lifecycle/          # Pages related to project lifecycle management
│  ├─ projects/           # Project pages and related components
│  ├─ reports/            # Report pages and features
│  ├─ team/               # Team-related pages, including team modals
│  └─ word-assistant/     # Word assistant feature pages
├─ components/
│  ├─ date-item/          # Components for data library items and modals
│  ├─ team/               # Components for team display and modals
│  └─ ui/                 # Reusable UI components (buttons, dialogs, inputs, tables, badges)
├─ lib/                   # Helper functions and utilities
└─ public/                # Static assets (images, icons, fonts)
```

### Folder Descriptions

- **analytics/** – Contains pages that render charts, KPIs, and other analytics components.
- **dashboard/** – Entry point and overview dashboards showing summarized metrics or key info.
- **lifecycle/** – Pages to track project lifecycle stages, status updates, or workflows.
- **projects/** – Displays project details, stacks, descriptions, and related team members.
- **reports/** – Handles report generation, visualization, and PDF/Excel exports.
- **team/** – Contains modals and pages for displaying team members and roles.
- **word-assistant/** – Feature for text processing, suggestions, or AI-powered word assistance.
- **components/date-item/** – Modular components for displaying library items with modal detail views.
- **components/team/** – Components for team tables and modals.
- **components/ui/** – Generic UI elements like buttons, dialogs, inputs, tables, and badges.
- **data/** – Stores JSON data for projects, library items, and other resources.
- **lib/** – Reusable helper functions or utility modules.
- **public/** – Static assets such as images, icons, and fonts.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) – Official docs for Next.js features.
- [Tailwind CSS](https://tailwindcss.com/docs) – Styling framework for responsive UI.
- [Framer Motion](https://www.framer.com/motion/) – Library for animations and smooth transitions.
- [Shadcn/ui](https://ui.shadcn.com/) – Component library built on Tailwind CSS for consistent design patterns..

## Deployment

Deploy your app easily with [Vercel](https://vercel.com/new?filter=next.js&utm_source=create-next-app).
For more deployment options, see [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).

---

Created with ❤️ for a professional and scalable frontend architecture.

```

```
