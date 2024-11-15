import "./globals.css"

import nextDynamic from "next/dynamic"
import Script from "next/script"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { CallToAction } from "components/CallToAction/CallToAction"
import { Footer } from "components/Footer/Footer"
import { Modals } from "components/Modals/Modals"
import { mobileInlineScript } from "components/NavigationBar/mobileInlineScript"
import { NavigationBar } from "components/NavigationBar/NavigationBar"
import { NavItem } from "components/NavigationBar/types"
import { NavLinks } from "@enterprise-commerce/core/platform/saleor/ui/components/nav/components/NavLinks"
import { TopBar } from "components/TopBar/TopBar"
import { FlagValues } from "views/FlagValues"
import { ThirdParties } from "views/ThirdParties"
import { env } from "env.mjs"
import { Metadata } from "next"
import { GithubBadge } from "views/GithubBadge"
// import { DemoModeAlert } from "views/DemoModeAlert"
import { CartView } from "views/Cart/CartView"

const DraftToolbar = nextDynamic(() => import("views/DraftToolbar"), {
  ssr: false,
})

export const revalidate = 3600

const navigationItems = {
  NavLinks,
}

export const metadata: Metadata = {
  title: "Next.js Enterprise Commerce | Blazity",
  description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
  metadataBase: new URL(env.LIVE_URL!),
  openGraph: {
    title: "Next.js Enterprise Commerce | Blazity",
    description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Enterprise Commerce | Blazity",
    description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
    creator: "@blazity",
    images: ["/opengraph-image.jpg"],
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  generator: "Next.js",
  applicationName: "Next.js",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="mobileMegaMenuLogic" strategy="lazyOnload">{`${mobileInlineScript}`}</Script>

        <TopBar />
        <NavigationBar items={navigationItems} />

        {children}

        <CallToAction />
        <Footer />
        <Modals />

        <CartView />

        <Toaster position="bottom-left" />

        <DraftToolbar />

        <Suspense>
          <FlagValues />
        </Suspense>

        <Suspense>
          <ThirdParties />
        </Suspense>

        <GithubBadge />
        {/* <DemoModeAlert /> */}
      </body>
    </html>
  )
}
