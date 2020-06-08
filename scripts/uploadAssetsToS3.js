const fs = require("fs")
const readDir = require("recursive-readdir")
const path = require("path")
const AWS = require("aws-sdk")
const mime = require("mime-types")

// This script is taken from: https://www.inextenso.dev/deploy-static-assets-to-aws-s3-with-nextjs

/*

You will run this script from your CI/Pipeline after build has completed.

It will read the content of the build directory and upload to S3 (live assets bucket)

Every deployment is immutable. Cache will be invalidated every time you deploy.

*/

const directoryPath = path.resolve(__dirname, "../.next/static/images")

// Retrive al the files path in the build directory
const getDirectoryFilesRecursive = (dir, ignores = []) => {
  return new Promise((resolve, reject) => {
    readDir(dir, ignores, (err, files) => (err ? reject(err) : resolve(files)))
  })
}

// The Key will look like this: _next/static/<buildid>/pages/index.js
// the <buildid> is exposed by nextJS and it's unique per deployment.
// See: https://nextjs.org/blog/next-7/#static-cdn-support
const generateFileKey = (fileName) => {
  // Removes the generated hash and returns just the original static name
  // E.G. https://flare-web-staging.s3.amazonaws.com/images/CouchPhoto_final.png
  const removeInitialRoute = fileName.split("/.next/static/")[1]
  const splitByPeriod = removeInitialRoute.split(".")
  const suffix = splitByPeriod[splitByPeriod.length - 1]
  const splitByDash = removeInitialRoute.split("-")
  const assetPath = splitByDash.slice(0, splitByDash.length - 1).join("-")
  return assetPath + "." + suffix
}

const s3 = new AWS.S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const uploadToS3 = async () => {
  try {
    const fileArray = await getDirectoryFilesRecursive(directoryPath, ["BUILD_ID"])
    fileArray.map((file) => {
      // Configuring parameters for S3 Object
      const S3params = {
        Bucket: process.env.NODE_ENV === "production" ? "flare-web" : "flare-web-staging",
        Body: fs.createReadStream(file),
        Key: generateFileKey(file),
        ACL: "public-read",
        ContentType: mime.lookup(file),
        ContentEncoding: "utf-8",
        CacheControl: "immutable,max-age=31536000,public",
      }
      s3.upload(S3params, function (err, data) {
        if (err) {
          // Set the exit code while letting
          // the process exit gracefully.
          console.error(err)
          process.exitCode = 1
        } else {
          console.log(`Assets uploaded to S3: `, data)
        }
      })
    })
  } catch (error) {
    console.error(error)
  }
}

uploadToS3()
