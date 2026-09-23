# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/bc09f4c7-f5cc-48ec-85b1-24331eb5754f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bc09f4c7-f5cc-48ec-85b1-24331eb5754f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bc09f4c7-f5cc-48ec-85b1-24331eb5754f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Showcase and inquiries

The public site displays published projects and partners from Supabase. Admins can edit project case study fields and partner logos in the dashboard. Project cards link to `/projects/:id`. The Partners section appears once a partner has been published.

Contact inquiries are stored in `contact_messages` and can be reviewed in the dashboard. Careers submissions are stored in `job_applications`; errors leave the form intact and do not claim that an application was received. The dashboard shows database counts without demo estimates. Job listings and applications require a working Supabase connection and the careers migration.

Apply the migrations in `supabase/migrations` to the matching Supabase project before deploying this version, including `20260924010000_showcase_partners_contacts.sql`. The migration adds project details, partners, contact messages, RLS policies, and Data API grants. Confirm that this project exposes the `public` schema through the Data API. Add real project descriptions, image URLs, and partner logos through the dashboard; no partner names or logos are fabricated in code. Protect the public forms with rate limiting or CAPTCHA at the deployment boundary if they receive spam.
