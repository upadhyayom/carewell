"use client";

/** Meta Pixel helpers — fires standard events so ads optimise for bookings. */

export const META_PIXEL_ID = "1613060277112141";

type Fbq = (...args: unknown[]) => void;

export function pixelTrack(event: string, params?: Record<string, unknown>) {
  try {
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    if (fbq) fbq("track", event, params);
  } catch {
    /* never let tracking break the UI */
  }
}
