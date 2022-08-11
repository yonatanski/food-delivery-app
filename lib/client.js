import sanityClient from "@sanity/client"
import ImagUrlBuilder from "@sanity/image-url"

export const client = new sanityClient({
  projectId: "hrvwe6r9",
  dataset: "production",
  apiVersion: "2022-08-11",
  useCdn: true,
  token: "sknN90vI1usBW2w0hyXdWpz8eHSnpcBTZj6oeHlHywuL45YmDPTT81M29k1z2tbPwBoTHAiE0uvYVHQQioExQ1qo2h4ANEyHq9OUcctvZ8uH8pyz79YCrUDFFXbBhiYCQheSDAxG8F9MZ3kuLVRBby0T8EeXCLb92hrYiWz2cDa9IxRjgS1M",
})

const builder = ImagUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
