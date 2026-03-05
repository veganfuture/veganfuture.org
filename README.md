This is a [Next.js](https://nextjs.org/) project.

## Developing, Getting Started

### With Nix

If you have [Nix](https://nixos.org) installed start a shell with:

```bash
nix develop
```
### Without Nix

You need to install:

 - NodeJs 22 or later.
 - TypeScript 5.8.2 or later.
 - AWS-cli and AWS sam CLI if you want to update the backend

 ## Frontend, running and deploying

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file.

To deploy a new version of the frontend you simply need to merge your code into the main branch.

## Serverless Backend, building and deploying

The backend of this website is built using AWS serverless. To first deploy the backend to AWS run:

```bash
sam build -t api/template.yaml
sam deploy --guided -t api/template.yaml
```

After the first deploy, you can run:

```bash
sam build -t api/template.yaml
sam deploy -t api/template.yaml
```

## Various Scripts

### Send RAAF email via SES

Create a txt and html variant for the email and then send it to attendees of a certain RAAF like this:

```bash
node scripts/raaf-send.js \
  --subject "RAAF #4 — Announcement" \
  --text scripts/raaf4_announcement.txt \
  --html scripts/raaf4_announcement.html \
  --event raaf4
  --dry-run # <- remove to really send
```

Optional flags: `--dry-run`, `--limit <n>`, `--rate <n>`, `--table <name>`, `--ddb-region <region>`, `--ses-region <region>`.

### List RAAF attendees

```bash
node scripts/raaf-attendees.js
node scripts/raaf-attendees.js --event raaf4
```

Optional flags: `--table <name>`, `--ddb-region <region>`.
