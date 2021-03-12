## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Test Apple Pay or Google Pay

To test apple pay and google pay locally, you need to serve the website on https

1. Install localtunnel: `yarn global add localtunnel`
2. Run lt --port 4000 --subdomain monsoon-local && lt --port 3000 --subdomain flare-local in separate terminals (the subdomains are global so you may need to pick a unique value if a couple of us are using it at the same time e.g. flare-local-luc)
3. Update your .env in flare to have MONSOON_ENDPOINT=https://monsoon-local.loca.lt
4. Go to https://flare-local.loca.lt in Safary for Apple pay and in Chrome for Google pay
