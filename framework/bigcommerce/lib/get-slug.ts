// Remove trailing and leading slash, usually included in nodes
// returned by the BigCommerce API

// const getSlug = (path: string) => path.replace(/^\/|\/$/g, '')


// export default getSlug

// OLD code ends here..........

// Remove trailing and leading slash, usually included in nodes
// returned by the BigCommerce API
const getSlug = (path: string) => {
let s1 = path
let s2 = s1.split("/")
let s3 = s2[s2.length-1].replace(".html", "")
console.log(s3)
return s3
}
//path.replace(/^\/|\/$/g, '')



export default getSlug