import React, {
  ReactNode,
  DetailedHTMLProps,
  DetailsHTMLAttributes,
} from "react"

// https://docusaurus.io/docs/swizzling#wrapping
import TabItem from "@theme-original/TabItem"
import Tabs from "@theme-original/Tabs"

import type {
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7TypeName,
} from "json-schema"

// https://stackoverflow.com/a/69328045/6149867
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

// For collapse component
export function Collapsible(props: {
  summary: ReactNode
  children: ReactNode
  detailsProps?: DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement
  >
}): JSX.Element {
  const { summary, children, detailsProps } = props

  return (
    <details {...detailsProps}>
      <summary>{summary}</summary>
      {children}
    </details>
  )
}

// generate a friendly name for the schema
export function generateFriendlyName(schema: JSONSchema7Definition): string {
  
  // unlikely at this point but technically possible
  if (typeof schema === "boolean") {
    return "boolean"
  }

  // Some people maintaining schemas provide a friendly name by themself
  if (schema?.title) {
    return schema.title
  }

  // handle both predefined formats (e.g. "time", "date-time" ,...) & additional attributes
  if (schema?.format) {
    return schema.format
  }

  // One of the common types around the world
  if (schema?.type === "object") {
    return "object"
  }

  // One of the common types around the world
  if (schema?.type === "array") {
    // Items property give the type of the array, when present
    if (schema?.items) {
      return `(${generateFriendlyName})[]`;
    }
    // Otherwise keep the plain old array type
    return "array"
  }

  // In "not" case, usual it is simple but I prefer to run recursively to be sure
  if (schema?.not) {
    return `NOT (${generateFriendlyName(schema.not)})`;
  }

  // With anyOf / allOf / oneOf, we could have some circular reference(s)
  // As using @stoplight $ref resolver, we don't have to care for that (at least for now ...)
  if (schema?.anyOf || schema?.oneOf || schema?.allOf) {
    const linkWord = (schema?.anyOf) ? "OR" : (schema?.oneOf) ? "XOR" : "AND";
    const elements = (schema?.anyOf || schema?.oneOf || schema?.allOf as JSONSchema7Definition[]).map(subSchema => generateFriendlyName(subSchema));
    const uniqueItems = [...new Set(elements)]; 

    return uniqueItems.join(` ${linkWord} `);
  }

  // When multiple types are provided, resolution becomes hard to understand
  // I will just concat the result without duplicate
  if (Array.isArray(schema?.type)) {
    return [...new Set(schema.type as JSONSchema7TypeName[])].join(" OR ")
  } else {
    // Default return the type or "unknown" as fallback
    return schema?.type || "unknown"
  }
}

// Creates the edges or "leaves" of a schema tree. Edges can branch into sub-nodes with createDetails().
type EdgeProps = {
  name: string
  schema: JSONSchema7Definition
}

export function createEdges({ name, schema }: EdgeProps): JSX.Element {
  throw new Error("Function not implemented.")
}

// Generate properties
export function createProperties(
  schema: WithRequired<JSONSchema7, "properties">
): JSX.Element {
  return (
    <>
      {Object.entries(schema.properties).map(([key, value]) => {
        return createEdges({
          name: key,
          schema: value,
        })
      })}
    </>
  )
}

// To handle Schema Composition (anyOf, oneOf)
// Remind that thanks prefiltering, we don't have to handle allOf case
export function renderAnyOneOf(
  schema:
    | WithRequired<JSONSchema7, "oneOf">
    | WithRequired<JSONSchema7, "anyOf">
): JSX.Element {
  let typeOf: "oneOf" | "anyOf" = schema.oneOf ? "oneOf" : "anyOf"

  return (
    <div>
      <span className="badge badge--info">{typeOf}</span>
      <Tabs>
        {(schema[typeOf] as JSONSchema7Definition[])
          // JSONSchema7Definition is either boolean or JSONSchema7 so better be safe that sorry
          .filter((subSchema) => typeof subSchema !== "boolean")
          .map((anyOneSchema, index) => {
            let subSchema = anyOneSchema as JSONSchema7
            const label = subSchema?.title || `${index + 1}`

            return (
              <TabItem
                key={`anyOneSchema_${index}`}
                value={`anyOneSchema_${index}`}
                label={label}
              >
                {/* Print the properties contained, if any */}
                {subSchema.properties !== undefined &&
                  createProperties(
                    subSchema as WithRequired<JSONSchema7, "properties">
                  )}
              </TabItem>
            )
          })}
      </Tabs>
    </div>
  )
}
