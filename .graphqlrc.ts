import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_URL,
  // schema: "https://graphql.hyperfunctor.com/graphql",
  documents: "src/graphql/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false
      },
      config: {
        defaultScalarType: "unknown",
        useTypeImports: true,
        skipTypename: true,
        documentMode: "string"
      },
      plugins: []
    }
  }
};

export default config;
function loadEnvConfig(arg0: string) {
  throw new Error('Function not implemented.');
}

