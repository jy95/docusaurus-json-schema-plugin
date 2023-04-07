import React from "react"

import ImportFeature from "@site/src/components/toolbar-features/ImportFeature"
import ExportFeature from "@site/src/components/toolbar-features/ExportFeature"

type Params = {
  onRefresh: () => void
  onCopy: () => void
  onExport: () => string
  onImport: (jsonData: any) => void
}

const Toolbar = ({ onRefresh, onCopy, onExport, onImport }: Params) => {
  const styles = {
    toolbar: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "8px",
      backgroundColor: "inherit",
    },
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

  return (
    <div style={styles.toolbar}>
      <h1>Schema</h1>
      &nbsp;
      <div style={{ flex: 1 }} />
      <button
        style={styles.icon}
        onClick={onRefresh}
        title="Update Data Editor / Schema Viewer"
      >
        🌀
      </button>
      <button
        style={styles.icon}
        onClick={onCopy}
        title="Copy Schema to clipboard"
      >
        📋
      </button>
      <ImportFeature label="Import Schema from file" onImport={onImport} />
      <ExportFeature
        filename="schema.json"
        label="Export to JSON File"
        getValue={onExport}
      />
    </div>
  )
}

export default Toolbar
