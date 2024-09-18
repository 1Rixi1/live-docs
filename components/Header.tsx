import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderProps } from "@/types";
import { cn } from "@/lib/utils";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link className="flex" href="/">
        <Image
          className="hidden md:block"
          src="/assets/icons/logo.svg"
          alt={"Logo Large"}
          width={120}
          height={32}
        />
        <Image
          className="mr-2 md:hidden"
          src="/assets/icons/logo-icon.svg"
          alt={"Logo small"}
          width={32}
          height={32}
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
