This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


# 01 Render the file structure
Render the tree of example data located in `src/data/itemsToCreate`
See visualization under `src/tasks/01`

# 02 Create items by sending them to the API
* create logic which will handle creation of items
* parse data to be forwarded to the API

You can use `src/mutations/useCreateResourceMutation` to create items

# Preinstalled packages
* styled-components
* react-query
* ts-deepmerge
* zustand