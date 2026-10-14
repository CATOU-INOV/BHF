import Link from "next/link";
import { PhoneIcon } from "./Icons";
import { COMPANY } from "@/lib/constants";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden grid grid-cols-2 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]">
      <a href={`tel:${COMPANY.phoneRaw}`}
        className="flex items-center justify-center gap-2 bg-foret-800 text-white py-4 font-bold text-sm uppercase tracking-wide">
        <PhoneIcon /> Appeler
      </a>
      <Link href="/devis"
        className="flex items-center justify-center gap-2 bg-ecorce-600 text-white py-4 font-bold text-sm uppercase tracking-wide">
        Devis gratuit
      </Link>
    </div>
  );
}
