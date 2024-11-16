"use client";

import { Suspense, useEffect, useState } from "react";
import { ChevronIcon } from "components/Icons/ChevronIcon";
import dynamic from "next/dynamic";
import { cn } from "utils/cn";
import { Autocomplete } from "./Autocomplete";
import { Cart } from "./Cart";
import { Favorites } from "./Favorites";
import {
  ImageGridItem,
  NavItem,
  TextGridItem,
  TextImageGridItem,
} from "./types";
import { ImageGridVariant } from "./variants/ImageGridVariant";
import { TextGridVariant } from "./variants/TextGridVariant";
import { TextImageGridVariant } from "./variants/TextImageGridVariant";
import { Skeleton } from "components/Skeleton/Skeleton";
import { CloseIcon } from "components/Icons/CloseIcon";
import { ProfileMenu } from "components/ProfileMenu/ProfileMenu";
import { SearchButton } from "./SearchButton";
import { NavigationItem } from "./NavigationItem";
import { Nav } from "@enterprise-commerce/core/platform/saleor/ui/components/nav/Nav";
import { Logo } from "components/Logo/Logo";

import { saleorAuthClient as client } from "@enterprise-commerce/core/platform/saleor/ui/components/AuthProvider";

// Dynamic import example
const ProductAddedAlert = dynamic(() =>
  import("views/Product/ProductAddedAlert").then((mod) => mod.ProductAddedAlert)
);

export function NavigationBar({ channel }: { channel: string }) {
  return (
    <header className="sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <div className="flex h-16 justify-between gap-4 md:gap-8">
          <Logo />
          <Nav channel={channel} />
        </div>
      </div>
    </header>
  );
}
