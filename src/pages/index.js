import React, { useRef } from "react"
import Isotope from "isotope-layout"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const isotope = React.useRef()
  const container = React.useRef()
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = React.useState("*")
  const [input, setInput] = React.useState("")
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

  // handle search
  React.useEffect(() => {
    if (input) {
      isotope.current.arrange({ filter: `.${input}` })
    }
  }, [input])

  const handleFilterKeyChange = key => () => { key === "*" ? setInput("") : setFilterKey(key)}

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

  const allTiles = [...data.fruits.nodes, ...data.veggies.nodes].map(el => (
    <div
      className={`item ${el.category} ${el.name} ${
        input && filterKey === el.category && el.name.includes(input) ? input : ""
      }`}
    >
      {el.name}
    </div>
  ))

  const handleSearch = e => {
    setInput(e.target.value)
  }
  return (
    <Layout>
      <input type="text" className="quicksearch" onKeyUp={handleSearch} />
      {filterBtns}
      <div ref={container} className="filter-container">
        {allTiles}
      </div>
    </Layout>
  )
}

export default IndexPage
