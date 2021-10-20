const fruits = {
  category: "fruit",
  types: ["lemons", "pineapple", "kimi", "starfruit"],
}
const veggies = {
  category: "vegetable",
  types: ["broccoli", "carrots", "peas", "spinach"],
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  fruits.types.forEach((fruit, i) => {
    const node = {
      category: fruits.category,
      name: fruit,
      id: createNodeId(i),
      internal: {
        type: fruits.category,
        contentDigest: createContentDigest(fruit),
      },
    }
    actions.createNode(node)
  })
  veggies.types.forEach((veggie, i) => {
    const node = {
      category: veggies.category,
      name: veggie,
      id: createNodeId(i),
      internal: {
        type: veggies.category,
        contentDigest: createContentDigest(veggie),
      },
    }
    actions.createNode(node)
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /isotope-layout/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
