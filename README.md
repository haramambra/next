# Next js
Next js build with custom routing, includes graphql middleware and graphql-codegen, typescript support and css-modules support.

## Prepare

npm install

## Run

- **npm run dev:** runs development version.
- **npm run build:** generate production build.
- **npm run start:** runs production build.
- **npm run graphql-codegen:** runst graphql-codegen, wich generate types and hooks (see graphql-codegen.yml for options)

## Usage

- Determine enviroment variables in .env file.
- Add page to page directory (see index.tsx for example).
- Add route to /server/routes (see index for example).
- Add query to /query folder (optional).
- Run graphql-codegen script (optional).
- ???
- PROFIT!

Working graphql build available in [graphql repo](https://github.com/haramambra/Graphql).
