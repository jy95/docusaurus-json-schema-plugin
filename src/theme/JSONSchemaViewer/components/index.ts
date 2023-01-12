// To avoid circular dependancies issue, let's have a single place for exports and imports

// Collapsible componenent
export { default as Collapsible } from "./Collapsible"

// CreateDetailsNode component
export { default as CreateDetailsNode } from "./CreateDetailsNode"

// CreateEdges component
export { default as CreateEdges } from "./CreateEdges"

// CreateProperties component
export { default as CreateProperties } from "./CreateProperties"

// RenderAnyOneOf component
export { default as RenderAnyOneOf } from "./RenderAnyOneOf"

// https://stackoverflow.com/a/69328045/6149867
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
