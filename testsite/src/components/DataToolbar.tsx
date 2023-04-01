import React from "react"

import ImportFeature from "@site/src/components/toolbar-features/ImportFeature"
import ExportFeature from "@site/src/components/toolbar-features/ExportFeature"

type Params = {
  onGenerate: () => void
  onCopy: () => void
  onExport: () => string
  onImport: (jsonData: any) => void
}

const Toolbar = ({ onGenerate, onCopy, onExport, onImport }: Params) => {
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
      <h1>Data</h1>
      &nbsp;
      <div style={{ flex: 1 }} />
      <button style={styles.icon} onClick={onGenerate} title="Generate Data">
        🔄
      </button>
      <button
        style={styles.icon}
        onClick={onCopy}
        title="Copy Data to clipboard"
      >
        📋
      </button>
      <ImportFeature label="Import Data from file" onImport={onImport} />
      <ExportFeature
        filename="data.json"
        label="Export to JSON File"
        getValue={onExport}
      />
    </div>
  )
}

export default Toolbar
