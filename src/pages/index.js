import React, { useRef } from "react"
import Isotope from "isotope-layout"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const isotope = React.useRef()
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = React.useState("*")

  React.useEffect(() => {
    isotope.current = new Isotope(".filter-container", {
      itemSelector: ".item",
      layoutMode: "fitRows",
    })
    // cleanup
    return () => isotope.current.destroy()
  }, [])

  // handling filter key change
  React.useEffect(() => {
    filterKey === "*"
      ? isotope.current.arrange({ filter: `*` })
      : isotope.current.arrange({ filter: `.${filterKey}` })
  }, [filterKey])

  const handleFilterKeyChange = key => () => setFilterKey(key)

  const data = useStaticQuery(graphql`
    query fruitsAndVeggies {
      fruits: allFruit {
        nodes {
          id
          name
          category
        }
      }
      veggies: allVegetable {
        nodes {
          id
          name
          category
        }
      }
    }
  `)

  const filters = ["fruit", "vegetable", "*"]

  const filterBtns = filters.map(el => (
    <button onClick={handleFilterKeyChange(el)} id={el}>
      {el}
    </button>
  ))
  const fruitTiles = data.fruits.nodes.map(el => (
    <div className={`item ${el.category} ${el.name}`}>{el.name}</div>
  ))
  const veggieTiles = data.veggies.nodes.map(el => (
    <div className={`item ${el.category} ${el.name}`}>{el.name}</div>
  ))

  const tiles = [...veggieTiles, ...fruitTiles]
  return (
    <Layout>
      {filterBtns}
      <div className="filter-container">{tiles}</div>
    </Layout>
  )
}

export default IndexPage
