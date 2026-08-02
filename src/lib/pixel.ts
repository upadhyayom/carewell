/** Meta Pixel helpers — fires standard events so ads optimise for bookings.
 *  (No "use client" directive: META_PIXEL_ID must be readable from server
 *  layouts too; pixelTrack only touches window inside the function body.) */

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
