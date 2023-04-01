import React from "react"

const Toolbar = ({ onGenerate, onCopy, onExport }) => {
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
      <button style={styles.icon} onClick={onGenerate} title="Generate Data">
        🔄
      </button>
      <button style={styles.icon} onClick={onCopy} title="Copy Data">
        📋
      </button>
      <button
        style={styles.icon}
        onClick={onExport}
        title="Export to JSON File"
      >
        💾
      </button>
    </div>
  )
}

export default Toolbar
