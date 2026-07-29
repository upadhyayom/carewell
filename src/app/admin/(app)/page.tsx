"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** The clinic's admin home is the Reception desk. */
export default function AdminHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/reception");
  }, [router]);
  return null;
}
