import generatePath from "@site/src/components/shared-libs/generatePath"

// Here a workaround for Docusaurus, as your assets are public at the end, require them
export default function LocalFileResolver(basePath: string = "") {
  return {
    resolve: (ref: string) => {
      return new Promise((resolve, reject) => {
        const temp_url = generatePath(ref, basePath)
        //import("@site/static/schemas/examples/array/additionalItems1.json")
        import(`@site/static/${temp_url.substring(1)}`)
          .then((result) => resolve(result.default))
          .catch((err) => reject(err))
      })
    },
  }
}
