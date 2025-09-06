<?php
/*

# bufy |=> Buildify app prefix | The best page builder for Shopify
# shopify app | Buildify → Buildify Page Builder ("The best page builder for Shopify" in app description) { main compititor is PageFly, Gempages, Shogun & Pagetify, Canva page builder, Insert page builder }

# npm install -g @shopify/cli@latest |=> install shopify cli globally 

# Buildify - The best page builder for Shopify
> shopify app init --template remix | cd Buildify => The best page builder for Shopify
> cd Buildify |=> shopify app generate extension |=> Extension-only apps can use metafields and metaobjects for basic data storage capabilities rather than hosting a server/db.
> shopify app dev --store vir-za.myshopify.com
> shopify backend ui |=> https://polaris-react.shopify.com/components
> Remix doc |=> https://v2.remix.run/docs/discussion/data-flow/
> Prisma ORM(Object-Relational Mapping) |=> https://www.prisma.io/ |=> Next-generation Node.js and TypeScript ORM || next-gen serverless Postgres database.
> npm run prisma migrate dev -- --name create-settings-table |=> https://www.prisma.io/docs/getting-started/quickstart-sqlite
> npx prisma migrate dev --name add-shop-to-settings |=> if add new column in existing table

# https://shopify.dev/docs/api/admin-graphql |=> To know more about Admin GraphQL API
# https://shopify.dev/docs/api/shopify-app-remix/v2/apis/admin-api |=> To know more about Admin API
# Alpine.js |=> https://alpinejs.dev/globals/alpine-data |=> A rugged, minimal framework for composing JavaScript behavior in your markup.
# Tailwind CSS |=> https://tailwindcss.com/docs/installation/tailwind-cli |=> A utility-first CSS framework for rapidly building custom designs.
# https://heroicons.com |=> free svg icons

### wishlist-icon extension |=>
> shopify app generate extension |=> https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/build
  > Theme app extensions |=> wishlist-icon |=> https://github.com/Hujjat/wishlist-inspire-app
  > npm run deploy |=> https://shopify.dev/docs/apps/deployment

### Issue_Traker_Action extension |=> https://www.shopifyacademy.com/path/developing-apps-for-shopify/creating-an-app-for-shopify/2234068
# my 1st admin-action app extension | extension-only apps can use metafields and metaobjects for basic data storage
> shopify app generate extension |=> 
  > Admin action app extensions |=> Issue_Traker_Action 
  > shopify app build
  > shopify app deploy

### prouduct-faq extension |=>
> shopify app generate extension |=> 
  > Theme app extensions |=> prouduct-faq
  > npm run deploy |=>
  > shopify app build






### Prisma ORM(Object-Relational Mapping) |=> https://www.prisma.io/ |=> Next-generation Node.js and TypeScript ORM || next-gen serverless Postgres database.
> npm run prisma migrate dev -- --name create-settings-table |=> https://www.prisma.io/docs/getting-started/quickstart-sqlite
> npx prisma migrate dev --name add-shop-to-settings |=> if add new column in existing table
  > npx prisma generate |=> Generates the Prisma Client
> npm run prisma studio | it run http://localhost:5555/ |=> GUI to view and edit data in your database.

> shopify app dev || npm run dev -- --theme [add_your_theme_id_here] |=> to see the changes in the store
  > shopify app build
  > shopify app deploy
> npm run tailwind:dev:app |=> to run tailwind css in dev mode for app
  > tailwind:build:app
> npm run tailwind:dev:extensions:theme-apps |=> package.json setting > to run tailwind css in dev mode for wishlist-icon extension
  > napm run tailwind:build:extensions:theme-apps || create tailwind.input.css <- @import "tailwindcss"; && create assets/tailwind.css
>




# shopify.app.toml -> application_url = "" |=> D:\shopify\buildify\extensions\wishlist-icon\blocks\wishlist-icon.liquid and set line no 31 appUrl = application_url


<!-- Debug: Output section.settings -->
  <pre style="background:#eee; color:#333; font-size:12px;">{{ block.settings | json }}</pre>
  {{ product.metafields.namespace.key }}
  {{ product.metafields.namespace.key.value }}

*/

# https://polaris-react.shopify.com/design/pro-design-language#what-is-pro
# https://shopify.dev/docs/api/shopify-app-remix/v1/apis/admin-api
