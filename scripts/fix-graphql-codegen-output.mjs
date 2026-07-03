import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const target = path.join(root, 'src/shared/api/graphql/generated.ts')

let source = fs.readFileSync(target, 'utf8')

// graphql-codegen + graphql@16: TypedDocumentString is referenced without a runtime import.
// graphql-request accepts a plain string document.
source = source.replace(/new TypedDocumentString\((`[\s\S]*?`)\)/g, '$1')

// Webpack-only HMR guard; use Vite-friendly override.
source = source.replace(
  /overrideExisting:\s*module\.hot\?\.\s*status\(\)\s*===\s*"apply",/,
  'overrideExisting: import.meta.hot != null,',
)

fs.writeFileSync(target, source)
