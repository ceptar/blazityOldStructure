// import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset"

// export default {
//   schema: ["https://shopify.dev/storefront-graphql-direct-proxy/2024-01", "https://shopify.dev/admin-graphql-direct-proxy/2024-01"],
//   documents: ["./**/*.{js,ts,jsx,tsx}"],
//   projects: {
//     default: shopifyApiProject({
//       apiType: ApiType.Storefront,
//       apiVersion: "2024-01",
//       documents: ["./platform/shopify/**/*.storefront.{js,ts,jsx,tsx}", "./platform/shopify/**/fragments/*.{js,ts,jsx,tsx}"],
//       outputDir: "./platform/shopify/types",
//     }),
//     admin: shopifyApiProject({
//       apiType: ApiType.Admin,
//       apiVersion: "2024-01",
//       documents: ["./platform/shopify/**/*.admin.{js,ts,jsx,tsx}"],
//       outputDir: "./platform/shopify/types/admin",
//     }),
//   },
// }

import { loadEnvConfig } from "@next/env"
import type { CodegenConfig } from "@graphql-codegen/cli"

loadEnvConfig(process.cwd())

let schemaUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL

if (process.env.GITHUB_ACTION === "generate-schema-from-file") {
  schemaUrl = "schema.graphql"
}

if (!schemaUrl) {
  console.error("Before GraphQL types can be generated, you need to set NEXT_PUBLIC_SALEOR_API_URL environment variable.")
  console.error("Follow development instructions in the README.md file.")
  process.exit(1)
}

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
  documents: "platform/saleor/graphql/*.graphql",
  generates: {
    "platform/saleor/codegen/": {
      preset: "client",
      plugins: [],
      config: {
        documentMode: "string",
        useTypeImports: true,
        strictScalars: true,
        scalars: {
          Date: "string",
          DateTime: "string",
          Day: "number",
          Decimal: "number",
          GenericScalar: "unknown",
          JSON: "unknown",
          JSONString: "string",
          Metadata: "Record<string, string>",
          Minute: "number",
          PositiveDecimal: "number",
          UUID: "string",
          Upload: "unknown",
          WeightScalar: "unknown",
          _Any: "unknown",
        },
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
}

export default config
