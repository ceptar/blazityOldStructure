import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { unstable_cache } from "next/cache"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { Suspense } from "react"

import { FacetsSection } from "views/Search/FacetsSection"
import { HitsSection } from "views/Search/HitsSection"
import { HitsSectionSkeleton } from "views/Search/HitsSectionSkeleton"
import { PaginationSection } from "views/Search/PaginationSection"
import { Sorter } from "views/Search/Sorter"
import { composeFilters } from "views/Search/composeFilters"

export const runtime = "edge"

export const revalidate = 3600

export const fetchCache = "default-cache"

const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  sortBy: parseAsString.withDefault(""),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  vendors: parseAsArrayOf(parseAsString).withDefault([]),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  colors: parseAsArrayOf(parseAsString).withDefault([]),
  sizes: parseAsArrayOf(parseAsString).withDefault([]),
})

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
      <Suspense fallback={<HitsSectionSkeleton />}>
        <SearchView searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function SearchView({ searchParams }: SearchPageProps) {
  const { q, sortBy, page, ...rest } = searchParamsCache.parse(searchParams)

  const meilisearchResults = await searchProducts(q, sortBy, page, composeFilters(rest).build())

  if (!meilisearchResults) return <></>

  const hits = meilisearchResults.hits
  const totalPages = meilisearchResults.totalPages
  // const availableForSale = meilisearchResults.facetDistribution?.["variants.availableForSale"]

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <FacetsSection facetDistribution={meilisearchResults.facetDistribution} />
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Products</h1>
          <Sorter />
        </div>

        <HitsSection hits={hits} />

        <PaginationSection totalPages={totalPages} />
      </div>
    </div>
  )
}

const searchProducts = unstable_cache(
  async (query: string, sortBy: string, page: number, filter: string) => {
    const index = await meilisearch?.getIndex<PlatformProduct>("products")

    if (!index) return null

    const results = await index.search(query, {
      sort: sortBy ? [sortBy] : undefined,
      hitsPerPage: 25,
      facets: ["collections.title", "tags", "vendor", "variants.availableForSale", "flatOptions.Size", "flatOptions.Color", "minPrice"],
      filter,
      page,
    })

    return results
  },
  ["products-search"],
  { revalidate: 3600 }
)
