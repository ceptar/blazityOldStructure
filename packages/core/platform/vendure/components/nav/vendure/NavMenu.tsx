// Add this line at the top to make the component a Client Component
"use client"

import * as React from "react"
import { arrayToTree, TreeNode } from "./array-to-tree"
import axios from "axios"

export default function NavMenu() {
  // Define state for collections, loading, and error
  const [collections, setCollections] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch the data inside useEffect
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://discobabes.club/shop-api",
          {
            query: `query GetAllCollections {
              collections {
                items {
                  id
                  slug
                  name
                  parentId
                  featuredAsset {
                    id
                    preview
                  }
                }
              }
            }`,
            variables: {},
          },
          {
            headers: {
              Authorization: 'bearer W/"3b3-rWDOls5thiJ8R8wjRoZ23nSvBnA"',
              "Content-Type": "application/json",
            },
          }
        )

        // Set the collections data in state
        setCollections(response.data.data.collections.items)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch collections")
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty array means this effect runs only once on component mount

  // Show loading or error messages if applicable
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  // If collections are not found, show a message
  if (!collections || collections.length === 0) {
    return <p>No collections found.</p>
  }

  return <CollectionList collection={arrayToTree(collections)} />
}

// Function to render the collection tree
function CollectionList(props: { collection: TreeNode<any> }) {
  return (
    <div>
      {props.collection.children.map((child: any, index: number) => (
        <div key={index}>
          <a href={child.slug}>{child.name}</a>
          <CollectionList collection={child} />
        </div>
      ))}
    </div>
  )
}
