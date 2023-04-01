type JsonSchema =
  | {
      type: "string" | "number" | "integer" | "boolean" | "null"
    }
  | {
      type: "array"
      items: JsonSchema | JsonSchema[]
    }
  | {
      type: "object"
      properties: {
        [key: string]: JsonSchema
      }
    }

function generateJsonSchema(obj: any): JsonSchema {
  if (Array.isArray(obj)) {
    return {
      type: "array",
      items: obj.map((s) => generateJsonSchema(s)),
    }
  } else if (typeof obj === "object" && obj !== null) {
    const properties: { [key: string]: JsonSchema } = {}
    for (const key of Object.keys(obj)) {
      properties[key] = generateJsonSchema(obj[key])
    }
    return {
      type: "object",
      properties,
    }
  } else {
    const typeMap: { [key: string]: JsonSchema } = {
      string: { type: "string" },
      number: { type: "number" },
      boolean: { type: "boolean" },
      undefined: { type: "null" },
    }
    return typeMap[typeof obj]
  }
}

export default function generateJsonSchemaWithRoot(obj: any): JsonSchema {
  const schema = generateJsonSchema(obj)
  schema["$schema"] = "http://json-schema.org/draft-07/schema#"
  return schema
}
