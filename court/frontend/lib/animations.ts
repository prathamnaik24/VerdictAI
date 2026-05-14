/**
 * Shared animation configuration and reusable variant definitions.
 * Centralizes easing curves, durations, and viewport-aware triggers
 * to ensure a consistent, premium feel across all interactions.
 */

import type { Easing, Variants } from 'framer-motion';

// ── Timing tokens ──────────────────────────────────────────────

/** Quick UI feedback (button hover, toggle) */
export const FAST = 0.15;

/** Standard micro-interaction (card hover, section reveal) */
export const NORMAL = 0.3;

/** Deliberate content transition (page mount, stagger sequences) */
export const SLOW = 0.5;

/** Long narrative motion (hero, full-page transitions) */
export const SLOWEST = 0.8;

// ── Easing ────────────────────────────────────────────────────

/** Signature ease — slightly decelerating, premium feel */
export const EASE_OUT: Easing = [0.25, 0.1, 0.25, 1];

/** Gentle spring for hover states */
export const EASE_SOFT_SPRING: Easing = [0.34, 1.56, 0.64, 1];

/** Smooth entrance deceleration */
export const EASE_DECELERATE: Easing = [0.4, 0, 0.2, 1];

// ── Viewport-aware defaults ───────────────────────────────────

export const VIEWPORT_ONCE = { once: true, margin: '-60px' };

// ── Reusable variant presets ──────────────────────────────────

/** Fade in from invisible — no movement */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: NORMAL, ease: EASE_OUT },
  },
};

/** Fade in while sliding upward */
export const fadeInUp = (distance = 20): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: NORMAL, ease: EASE_OUT },
  },
});

/** Staggered children reveal */
export const staggerChildren = (delay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0,
    },
  },
});

/** Each child fades up in sequence */
export const staggerItem = (delay = 0, distance = 12): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: NORMAL,
      ease: EASE_OUT,
    },
  },
});

/** Card entrance — subtle scale + fade */
export const cardIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: NORMAL, ease: EASE_SOFT_SPRING },
  },
};

/** Hover lift with shadow deepening */
export const hoverLift = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  hover: {
    y: -2,
    boxShadow: '0 8px 24px rgba(31,40,57,0.10)',
    transition: { duration: FAST, ease: EASE_SOFT_SPRING },
  },
};

/** Button press feedback */
export const buttonPress = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: FAST, ease: EASE_SOFT_SPRING } },
  tap: { scale: 0.97, transition: { duration: FAST } },
};

/** Section slide up on scroll */
export const sectionReveal = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: SLOW, ease: EASE_DECELERATE },
  },
});

/** Horizontal slide in from the right */
export const slideInRight = (distance = 30): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: NORMAL, ease: EASE_OUT },
  },
});

/** Rotate in for loading indicators */
export const gentleSpin = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: { duration: 0.8, ease: 'easeInOut', repeat: Infinity },
  },
};

/** Skeleton shimmer timing */
export const shimmerPulse = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
  },
};