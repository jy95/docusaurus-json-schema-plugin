import React from "react"
import Data2Schema from "@site/src/components/shared-libs/generateDraft7JSONSchema"

import { toast } from "react-toastify"

// Context
import { usePlaygroundContext } from "@site/src/contexts/PlaygroundContext"

export default function InferSchemaFromData(): JSX.Element {
  const {
    state: { schemaRef, editorRef },
    updateState,
  } = usePlaygroundContext()

  const styles = {
    icon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "32px",
      height: "32px",
      marginRight: "8px",
      backgroundColor: "transparent",
      cursor: "pointer",
      border: "1px solid",
      fontWeight: "bold",
    },
  }

  const generateSchema = async () => {
    // Get the current payload
    // Monaco give it as string
    let jsonString = editorRef.getModel().getValue() as string

    try {
      // Data as JSON
      let data = JSON.parse(jsonString)
      // Generate a basic Draft-07 schema from that
      const schema = Data2Schema(data)

      // Update state according to that
      updateState({
        jsonPointer: "",
        userSchema: schema,
        fullSchema: schema,
      })
    } catch (error) {
      toast.error((error as Error).message, { autoClose: 5000 })
    }
  }

  return (
    <>
      <button
        style={styles.icon}
        onClick={generateSchema}
        title="Infer Schema from data"
      >
        ✨
      </button>
    </>
  )
}
