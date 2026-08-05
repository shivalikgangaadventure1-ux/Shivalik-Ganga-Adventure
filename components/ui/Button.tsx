"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type ButtonVariant = "primary" | "outline" | "whatsapp" | "call" | "white" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-heading hover:bg-primary-dark focus-visible:ring-primary shadow-sm",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-heading focus-visible:ring-white",
  whatsapp: "bg-success text-white hover:brightness-110 focus-visible:ring-success",
  call: "bg-dark text-white hover:bg-dark-deep focus-visible:ring-dark",
  white: "bg-white text-heading hover:bg-light focus-visible:ring-white",
  ghost: "bg-transparent text-heading hover:bg-light focus-visible:ring-primary",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className,
  ariaLabel,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full font-heading font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon size={18} aria-hidden="true" />}
    </>
  );

  const motionProps = {
    whileHover: { y: -3, scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2, ease: "easeOut" as const },
  };

  if (href) {
    const isInternal = href.startsWith("/") && !target;

    if (isInternal) {
      return (
        <MotionLink href={href} onClick={onClick} aria-label={ariaLabel} className={classes} {...motionProps}>
          {content}
        </MotionLink>
      );
    }

    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        className={classes}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
