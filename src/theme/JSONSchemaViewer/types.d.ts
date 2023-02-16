import type { JSONSchema as Draft_07 } from "json-schema-typed/draft-07"
import type { JSONSchema as Draft_2019_09 } from "json-schema-typed/draft-2019-09"
import type { JSONSchema as Draft_2020_12 } from "json-schema-typed/draft-2020-12"

export type JSONSchema = Draft_07 | Draft_2019_09 | Draft_2020_12

// In case I want to cover one specific file
export type JSONSchema_Draft_07 = Draft_07
export type JSONSchema_Draft_2019_09 = Draft_2019_09
export type JSONSchema_Draft_2020_12 = Draft_2020_12

// Namespace, In case I need to cast to a specific type (array / object)
import type { JSONSchema as JSONSchemaNS } from "json-schema-typed"
export { JSONSchemaNS }

import type { TypeName } from "json-schema-typed"
// I'm only interested with the values behind that enum
export type TypeValues = `${TypeName}`
export type { keywords } from "json-schema-typed"
