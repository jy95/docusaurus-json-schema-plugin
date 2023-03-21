import generatePath from "@site/src/components/shared-libs/generatePath"

// Here a workaround for Docusaurus, as your assets are public at the end, require them
export default function LocalFileResolver(basePath: string = "") {
  return {
    resolve: (ref: string) => {
      return new Promise((resolve, reject) => {
        const url = generatePath(ref, basePath)
        // To help webpack consider only json files & from my folder
        const filepath = url.substring(1, url.lastIndexOf("."))
        //import("@site/static/schemas/examples/array/additionalItems1.json")
        import(`@site/static/${filepath}.json`)
          .then((result) => resolve(result.default))
          .catch((err) => reject(err))
      })
    },
  }
}
