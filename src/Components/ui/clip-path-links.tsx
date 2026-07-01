"use client";

import React from "react";
import type { IconType } from "react-icons";
import { FaDiscord } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import { useAnimate } from "framer-motion";

type HoverSide = "left" | "right" | "top" | "bottom";
type LinkIcon = LucideIcon | IconType;

export interface ClipPathLinkItem {
  label: string;
  href?: string;
  icon?: LinkIcon;
  imgSrc?: string;
  imgClassName?: string;
}

interface ClipPathLinksProps {
  items?: ClipPathLinkItem[];
  className?: string;
  itemClassName?: string;
}

const defaultItems: ClipPathLinkItem[] = [
  {
    label: "Email",
    icon: SiGoogle,
    href: "https://mail.google.com/mail/u/0/?fs=1&to=kamalkamalesh316@gmail.com&tf=cm",
  },
  { label: "GitHub", icon: Github, href: "https://github.com/kamaleshsa" },
  { label: "X", icon: Twitter, href: "https://x.com/Kamales71036733" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/kamaleshsa" },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/k.a.m.a_l?igsh=ZmRzbXF6NTBwOXIw",
  },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/16Zgo4MK6M/" },
  { label: "Discord", icon: FaDiscord, href: "https://discord.com/users/1367756111725334599" },
  {
    label: "21st.dev",
    href: "https://21st.dev/kamaleshsa",
    imgSrc:
      "https://media.licdn.com/dms/image/v2/D4E0BAQH3Jqtih4t7-A/company-logo_200_200/B4EZY_fSK1HUAM-/0/1744821888382/21st_dev_logo?e=2147483647&v=beta&t=8hoDRfmpNQR3aqnKWef5U0bW9Mg2GCbgwvgeQ5MKaKU",
    imgClassName: "h-6 w-auto object-contain",
  },
  {
    label: "Portfolio",
    href: "https://kamaleshsaportfolio.netlify.app/",
    imgSrc: "https://i.ibb.co/q36kg6qT/fotor-2025052503615.png",
    imgClassName: "h-8 w-auto object-contain",
  },
];

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES: Record<HoverSide, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<HoverSide, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

export function ClipPathLinks({
  items = defaultItems,
  className = "",
  itemClassName = "",
}: ClipPathLinksProps) {
  return (
    <div className={`grid grid-cols-2 divide-y divide-neutral-200 border border-neutral-200 sm:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <LinkBox key={`${item.label}-${item.href ?? item.imgSrc ?? "item"}`} item={item} className={itemClassName} />
      ))}
    </div>
  );
}

export function ClipPathLogoGrid({
  items,
  className = "",
  itemClassName = "",
}: Required<Pick<ClipPathLinksProps, "items">> & Omit<ClipPathLinksProps, "items">) {
  return (
    <div className={`grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-7 ${className}`}>
      {items.map((item) => (
        <LinkBox
          key={item.label}
          item={item}
          className={`rounded-2xl border border-black/5 bg-white/80 shadow-sm backdrop-blur-sm ${itemClassName}`}
          showLabel
        />
      ))}
    </div>
  );
}

function LinkBox({
  item,
  className = "",
  showLabel = false,
}: {
  item: ClipPathLinkItem;
  className?: string;
  showLabel?: boolean;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const Icon = item.icon;
  const Tag = item.href ? "a" : "div";

  const getNearestSide = (e: React.MouseEvent<HTMLElement>): HoverSide => {
    const box = e.currentTarget.getBoundingClientRect();
    const sortedProximity = [
      { proximity: Math.abs(box.left - e.clientX), side: "left" as const },
      { proximity: Math.abs(box.right - e.clientX), side: "right" as const },
      { proximity: Math.abs(box.top - e.clientY), side: "top" as const },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" as const },
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)],
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[getNearestSide(e)],
    });
  };

  return (
    <Tag
      href={item.href}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noopener noreferrer" : undefined}
      aria-label={item.label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative grid aspect-square w-full cursor-default place-content-center overflow-hidden text-neutral-900 transition-colors duration-300 ${className}`}
    >
      <LinkContent item={item} Icon={Icon} showLabel={showLabel} muted />
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-gradient-to-br from-[#8a35ff] to-[#246dff] text-white"
      >
        <LinkContent item={item} Icon={Icon} showLabel={showLabel} />
      </div>
    </Tag>
  );
}

function LinkContent({
  item,
  Icon,
  showLabel,
  muted = false,
}: {
  item: ClipPathLinkItem;
  Icon?: LinkIcon;
  showLabel: boolean;
  muted?: boolean;
}) {
  return (
    <span className="flex min-w-0 flex-col items-center justify-center gap-2.5 px-2 text-center">
      {item.imgSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imgSrc}
          alt=""
          width={32}
          height={32}
          className={`${item.imgClassName ?? "h-7 w-7 object-contain sm:h-8 sm:w-8"} ${
            muted ? "brightness-0 opacity-85" : "opacity-95"
          }`}
        />
      ) : Icon ? (
        <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      ) : null}
      {showLabel ? (
        <span className={`max-w-full text-[11px] leading-tight transition-colors duration-300 sm:text-xs ${muted ? "text-neutral-500" : "text-white"}`}>
          {item.label}
        </span>
      ) : null}
    </span>
  );
}
