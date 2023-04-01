import React from "react"
import { toast } from "react-toastify"

type Params = { label: string; filename: string; getValue: () => string }
export default function ExportFeature({ label, filename, getValue }: Params) {
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

  // For export
  const handleExport = () => {
    // Get the text to export
    const textToCopy: string = getValue()

    // Stop if empty
    if (textToCopy.length === 0) return

    // Create a new Blob object containing the data
    const dataBlob = new Blob([textToCopy], { type: "application/json" })

    // Create a URL for the blob using URL.createObjectURL()
    const url = URL.createObjectURL(dataBlob)

    // Create a new <a> element and set its href attribute to the URL
    const a = document.createElement("a")
    a.href = url

    // Set the download attribute of the <a> element to the desired filename
    a.download = filename

    // Add the <a> element to the DOM and trigger a click event to download the file
    document.body.appendChild(a)
    a.click()

    // Remove the <a> element from the DOM
    document.body.removeChild(a)

    // Revoke the URL using URL.revokeObjectURL() to free up memory
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <button style={styles.icon} onClick={handleExport} title={label}>
        💾
      </button>
    </>
  )
}
