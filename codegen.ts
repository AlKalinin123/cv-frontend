import 'dotenv/config'
import type { CodegenConfig } from '@graphql-codegen/cli'

const schema =
  process.env.CODEGEN_SCHEMA_URL?.trim() ||
  'src/shared/api/graphql/schema.graphql'

const config: CodegenConfig = {
  schema,
  documents: ['src/**/*.{graphql,gql}'],
  ignoreNoDocuments: true,
  generates: {
    'src/shared/api/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-rtk-query'],
      config: {
        importBaseApiFrom: '@/shared/api/graphql/base-api',
        exportHooks: true,
        overrideExisting: 'import.meta.hot != null',
      },
    },
  },
}

export default config
