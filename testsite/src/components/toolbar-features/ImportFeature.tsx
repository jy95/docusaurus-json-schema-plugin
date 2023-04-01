import React from "react"
import { toast } from "react-toastify"

type Params = { label: string; onImport: (jsonData: any) => void }
export default function ImportFeature({ label, onImport }: Params) {
  // Ref
  const fileInputRef = React.createRef<HTMLInputElement>()

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

  // Handle change
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // get the selected file
    const file = event.target.files[0]

    // check if a file was selected
    if (!file) return

    // create a new FileReader object
    const reader = new FileReader()

    // set the callback function to be executed when the file is loaded
    reader.onload = () => {
      try {
        // parse the JSON data from the file
        const jsonData = JSON.parse(reader.result as string)

        // use the jsonData object
        onImport(jsonData)
      } catch (error) {
        toast.error((error as Error).message, { autoClose: 5000 })
      }
    }

    // read the file as text
    reader.readAsText(file)
  }

  return (
    <>
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      <button
        style={styles.icon}
        onClick={() => fileInputRef.current.click()}
        title={label}
      >
        📥
      </button>
    </>
  )
}
