import weaviate from "weaviate-ts-client";
import { readFileSync, readdirSync } from "fs";

const schemaConfig = {
  class: "Image",
  vectorizer: "img2vec-neural",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    { name: "image", dataType: ["blob"] },
    { name: "name", dataType: ["string"] },
    { name: "tags", dataType: ["string[]"] },
  ],
};

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const tags = {
  image1: ["plants", "bed", "window"],
  image4: ["plants", "wall", "sofa", "living room", "table"],
  image6: ["bed", "closet", "mirror", "bedroom", "lamp", "dark"],
  image7: ["lamp", "chair", "bed", "bedroom", "lamp"],
  image8: ["plants", "living room", "sofa", "painting", "lamp"],
  image9: ["plants", "bathtub", "wood"],
  image10: ["window", "painting", "chair", "plants", "natural light"],
  image11: ["desk", "lamp", "chair", "painting", "bird", "clock", "books"],
  image12: ["desk", "lamp", "green", "wood"],
  image14: ["desk", "lamp", "mouse", "natural light"],
  image15: ["nightstand", "lamp", "mirror", "tree"],
  image16: ["cute", "lamp", "desk"],
  image17: ["cute", "lamp", "desk", "cactus", "pencil"],
  image18: ["cheetah", "lamp", "desk", "wood", "natural light"],
  image20: ["plants", "computer", "desk", "office", "natural light"],
  image21: ["plants", "computer", "desk", "human", "home", "natural light"],
  image22: ["plants", "computer", "keyboard", "lamp", "wood", "natural light"],
  image25: ["plants", "mouse", "keyboard", "natural light"],
  image27: ["plants", "laptop", "diary", "desk"],
  image28: ["plants", "living room", "rug", "sofa", "natural light"],
  image30: ["chair", "computer", "dark", "water bottle"],
  image31: ["chair", "computer", "dark", "desk", "gaming"],
  image32: ["chair", "computer", "dark", "desk", "gaming", "window", "room"],
  image33: ["computer", "red", "desk", "gaming", "room"],
  image34: ["computer", "bicycle", "desk", "gaming", "figurines"],
  image36: ["computer", "chair", "desk", "gaming", "purple"],
  image37: ["computer", "red", "desk", "gaming", "headphones"],
  image37: ["tv", "dark", "desk", "gaming", "sofa", "lamp"],
  image39: ["computer", "desk", "gaming", "keyboard", "lamp", "lights"],
  image40: [
    "computer",
    "desk",
    "gaming",
    "keyboard",
    "lamp",
    "lights",
    "plants",
    "wood",
  ],
  image43: [
    "computer",
    "desk",
    "gaming",
    "keyboard",
    "lamp",
    "lights",
    "plants",
    "wood",
    "books",
  ],
  image44: ["window", "natural light", "fall", "mug", "plants", "wood"],
  image45: ["living room", "green", "sofa", "window"],
  image46: ["chair", "wood", "plants", "tv"],
  image47: ["window", "wood", "plants", "blue", "bedroom"],
  image48: ["window", "pots", "plants", "books", "natural light"],
  image49: ["bedroom", "pots", "plants", "books", "window", "natural light"],
  image50: ["cactus", "pots", "plants", "window", "natural light"],
  image51: [
    "bedroom",
    "computer",
    "chair",
    "plants",
    "window",
    "natural light",
  ],
  image53: ["bed", "chair", "plants", "window", "natural light", "office"],
  image54: [
    "human",
    "chair",
    "plants",
    "window",
    "natural light",
    "office",
    "wood",
  ],
  image56: ["cactus", "desk", "keyboard", "laptop"],
  image57: ["cactus"],
  image58: ["cactus", "green", "yellow", "books"],
  image59: ["gaming", "chair", "computer", "dark"],
  image60: ["gaming", "chair", "computer", "dark", "human"],
  image61: ["animals", "paintings", "pillows"],
  image62: ["animals", "paintings"],
  image63: ["animals", "paintings"],
  image64: ["animals", "plants"],
  image64: ["animals", "plants"],
  image65: ["animals", "paintings", "sofa"],
  image66: ["vibrant", "paintings", "sofa", "plants"],
  image67: ["green", "paintings", "sofa", "plants", "living room"],
  image69: ["gray", "paintings", "sofa", "plants", "living room"],
  image70: [
    "gray",
    "blue",
    "paintings",
    "dark",
    "sofa",
    "plants",
    "living room",
  ],
  image71: ["paintings", "chair", "window", "natural light"],
  image72: ["duck", "plants", "yellow"],
  image73: ["cactus", "plants"],
  image74: ["kirby", "plants"],
};

// const img = readFileSync("./images/image1.jpeg");
// const b64 = Buffer.from(img).toString("base64");

// const res = await client.data
//   .creator()
//   .withClassName("Post")
//   .withProperties({ image: b64, name: "image1" })
//   .do();

// const schemaRes = await client.schema.getter().do();
// console.log(schemaRes);

// getSchema();
// schemaConfigUpdate();
// queryTag(["plants", "kirby"]);
// addImages();
// readImages();
// deleteImages();
// queryImage("panda.webp");

async function schemaConfigUpdate() {
  await client.schema.classCreator().withClass(schemaConfig).do();
  console.log("Schema updated");
}

async function getSchema() {
  const schemaRes = await client.schema.getter().do();
  console.log(schemaRes);
  console.log(schemaRes.classes[1].properties);
}

// const img = readFileSync("./images/image1.jpeg");
// const b64 = Buffer.from(img).toString("base64");

// const res = await client.data
//   .creator()
//   .withClassName("Post")
//   .withProperties({ image: b64, name: "image1" })
//   .do();

// await client.data
//   .deleter()
//   .withClassName("Image")
//   .withId("d4844e7d-a50a-42c4-91ed-032b7e47b89e")
//   .do();

// async function addImages() {
//   let imgFiles = readdirSync("./images");

//   let promises = imgFiles.map(async (imgFile) => {
//     // console.log(imgFile);
//     const b64 = Buffer.from(readFileSync(`./images/${imgFile}`)).toString(
//       "base64"
//     );
//     // console.log({ image: b64, name: imgFile.split(".")[0] });

//     const res = await client.data
//       .creator()
//       .withClassName("Image")
//       .withProperties({
//         image: b64,
//         name: imgFile.split(".")[0],
//         tags: tags[imgFile.split(".")[0]],
//       })
//       .do();

//     // .withId(generateUuid5(JSON.stringify(dataObj)))
//   });

async function addImages() {
  let imgFiles = readdirSync("./images");

  let promises = imgFiles.map(async (imgFile) => {
    // console.log(imgFile.split(".")[0], tags[imgFile.split(".")[0]]);
    const b64 = Buffer.from(readFileSync(`./images/${imgFile}`)).toString(
      "base64"
    );
    // console.log({ image: b64, name: imgFile.split(".")[0] });

    const res = await client.data
      .creator()
      .withClassName("Image")
      .withProperties({
        image: b64,
        name: imgFile.split(".")[0],
        tags: tags[imgFile.split(".")[0]],
      })
      .do();

    // .withId(generateUuid5(JSON.stringify(dataObj)))
  });

  await Promise.all(promises);
  console.log("Images added");
}

async function readImages() {
  const query = await client.graphql
    .get()
    .withClassName("Image")
    .withFields("image name tags")
    .do();

  // console.log(query.data.Get.Post);
  // if (query.data.Get == undefined) {
  //   return;
  // }
  return query.data.Get.Test.map((d) => {
    console.log(d);
    return d.name;
  });
}

async function queryTag(tags) {
  const res = await client.graphql
    .get()
    .withClassName("Image")
    .withFields("image name tags")
    .withWhere({
      path: ["tags"],
      operator: "ContainsAll",
      valueTextArray: tags,
    })
    .do();

  // console.log(res.data.Get.Image);
  res.data.Get.Image.map((i) => console.log(i.name, i.tags));

  return res.data.Get;
}

// // DELETE COLLECTION
async function deleteImages() {
  await client.schema.classDeleter().withClassName("Image").do();
  console.log("Image collection deleted");
}

async function queryImage(fileName) {
  const queryImg = Buffer.from(readFileSync(`../images/${fileName}`)).toString(
    "base64"
  );
  const resImage = await client.graphql
    .get()
    .withClassName("Image")
    .withFields(["image", "name", "_additional {distance}"])
    .withNearImage({ image: queryImg })
    .do();

  resImage.data.Get.Image.map((i) => console.log(i.name, i._additional));
}

// const test = Buffer.from(readFileSync("./img/tiger.jpeg")).toString("base64");

// const resImage1 = await client.graphql
//   .get()
//   .withClassName("Image")
//   .withFields(["image"])
//   .withLimit(25)
//   .do();

// const resImage2 = await client.graphql
//   .get()
//   .withClassName("Image")
//   .withFields(["image"])
//   .do();

// resImage2.data.Get.Image.map((i, index) => {
//   console.log(index);
//     const result = i.image;
//     writeFileSync(`./result${index}.jpg`, result, "base64");
// });

// SINGLE IMG ADD
// const img = readFileSync(`./img/lamp.jpg`);
// const b64 = Buffer.from(img).toString("base64");

// const res = await client.data
//   .creator()
//   .withClassName("Image")
//   .withProperties({ image: b64, text: "mewing" })
//   .do();

// // GET SCHEMA
// const schemaRes = await client.schema.getter().do();
// console.log(schemaRes);

// module.exports = {
//   schemaConfigUpdate,
//   getSchema,
//   addImages,
//   readImages,
//   deleteImages,
//   queryImage,
// };
