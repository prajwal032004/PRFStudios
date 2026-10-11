"use client";

import { useState } from "react";
import { contact } from "@/lib/site";
import Icon from "./Icon";

// Google Maps pulls in several hundred KB of third-party script, so the embed loads only when asked
// for. Until then nothing is requested from Google.
export default function MapEmbed() {
  const [show, setShow] = useState(false);
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;

  if (show)
    return (
      <iframe
        title="Map: PRF Studios, Trinity Pothraj Building, 154 Old Madras Road, Trinity Circle, Bengaluru"
        src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`}
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[0.9] contrast-[1.05]"
      />
    );

  return (
    <div className="root-lattice absolute inset-0 isolate flex flex-col items-center justify-center gap-5 bg-sand p-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-gold-ink ring-1 ring-ash">
        <Icon name="pin" size={22} />
      </span>
      <p className="max-w-md text-[16px] leading-relaxed text-carbon md:text-[17px]">{contact.address}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => setShow(true)} className="btn btn-outline">
          Show map
        </button>
        <a href={directions} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          Open in Google Maps <Icon name="external" size={16} />
        </a>
      </div>
      <p className="text-[13px] text-smoke">Showing the map loads content from Google.</p>
    </div>
  );
}
