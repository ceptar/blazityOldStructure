import { cookies } from "next/headers"
import { CheckoutCreateDocument, CheckoutFindDocument } from "@enterprise-commerce/core/platform/saleor/codegen/graphql"
import { executeGraphQL } from "@enterprise-commerce/core/platform/saleor/lib/graphql"

export async function GET() {
  const cookieStore = cookies()
  // Your checkout logic here
  return Response.json({ success: true })
}

export async function POST() {
  const cookieStore = cookies()
  // Your checkout creation logic here
  return Response.json({ success: true })
}
