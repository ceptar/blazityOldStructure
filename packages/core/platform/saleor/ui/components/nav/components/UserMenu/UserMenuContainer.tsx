import { UserIcon } from "lucide-react"
import { UserMenu } from "./UserMenu"
import { CurrentUserDocument } from "@enterprise-commerce/core/platform/saleor/codegen/graphql"
import { executeGraphQL } from "@enterprise-commerce/core/platform/saleor/lib/graphql"
import { LinkWithChannel } from "@enterprise-commerce/core/platform/saleor/ui/atoms/LinkWithChannel"

export async function UserMenuContainer() {
  const { me: user } = await executeGraphQL(CurrentUserDocument, {
    cache: "no-cache",
  })

  if (user) {
    return <UserMenu user={user} />
  } else {
    return (
      <LinkWithChannel href="/login" className="h-6 w-6 flex-shrink-0">
        <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">Log in</span>
      </LinkWithChannel>
    )
  }
}
