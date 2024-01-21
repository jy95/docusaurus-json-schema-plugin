;(function (Prism) {
  function escapeRegExp(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  function createJsonSchemaRegex(keywords) {
    const keywordPattern = keywords
      .map((keyword) => `${escapeRegExp(keyword)}`)
      .join("|")
    return new RegExp(`\\b(?:${keywordPattern})\\b`)
  }

  //console.log(createJsonSchemaRegex([]));

  Prism.languages["json-schema"] = Prism.languages.extend("json5", {
    // Explanations
    // https://prismjs.com/faq.html#how-do-i-know-which-tokens-i-can-style-for
    // https://prismjs.com/tokens.html
    keyword: [
      // 'control-flow'
      {
        pattern: createJsonSchemaRegex(["if", "then", "else"]),
        alias: ["control-flow", "schema-conditionally"],
      },
      // "schema-composition"
      {
        pattern: createJsonSchemaRegex(["allOf", "anyOf", "oneOf", "not"]),
        alias: "schema-composition",
      },
      // "refs"
      {
        pattern: createJsonSchemaRegex([
          "$ref",
          "$defs",
          "$anchor",
          "$defs",
          "$dynamicRef",
          "$dynamicAnchor",
          "$recursiveAnchor",
          "$recursiveRef",
        ]),
        alias: "refs",
      },
      // schema-conditionally
      {
        pattern: createJsonSchemaRegex([
          "dependencies",
          "dependentSchemas",
          "dependentRequired",
          "dependentSchemas",
        ]),
        alias: "schema-conditionally",
      },
      // array
      {
        pattern: createJsonSchemaRegex([
          "additionalItems",
          "contains",
          "items",
          "minItems",
          "maxItems",
          "minContains",
          "maxContains",
          "prefixItems",
          "unevaluatedItems",
          "uniqueItems",
        ]),
        alias: "array",
      },
      // Annotations
      {
        pattern: createJsonSchemaRegex([
          "title",
          "description",
          "default",
          "examples",
          "deprecated",
          "readOnly",
          "writeOnly",
          "$comment",
        ]),
        alias: "annotations",
      },
      // enums
      {
        pattern: createJsonSchemaRegex(["enum"]),
        alias: "enum",
      },
      // Constant values
      {
        pattern: createJsonSchemaRegex(["const"]),
        alias: "const",
      },
      // string
      {
        pattern: createJsonSchemaRegex([
          "contentEncoding",
          "contentMediaType",
          "contentSchema",
          "format",
          "minLength",
          "maxLength",
          "pattern",
        ]),
        alias: "string",
      },
      // number
      {
        pattern: createJsonSchemaRegex([
          "multipleOf",
          "minimum",
          "exclusiveMinimum",
          "maximum",
          "exclusiveMaximum",
        ]),
        alias: "number",
      },
      // object
      {
        pattern: createJsonSchemaRegex([
          "additionalProperties",
          "patternProperties",
          "properties",
          "propertyNames",
          "required",
          "minProperties",
          "maxProperties",
          "unevaluatedProperties",
        ]),
        alias: "object",
      },
    ],
  })
})(Prism)
