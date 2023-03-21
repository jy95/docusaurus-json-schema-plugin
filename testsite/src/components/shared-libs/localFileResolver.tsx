import generatePath from "@site/src/components/shared-libs/generatePath"
import useBaseUrl from "@docusaurus/useBaseUrl"

// Here a workaround for Docusaurus, use fetch as your assets are public at the end
export default function LocalFileResolver(basePath: string = "") {
  return {
    resolve: (ref: string) => {
      return new Promise((resolve, reject) => {
        const temp_url = generatePath(ref, basePath)
        console.log(temp_url)
        const url = useBaseUrl(temp_url)
        fetch(url, {
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => response.text())
          .then((json) => resolve(json))
          .catch((err) => reject(err))
      })
    },
  }
}
