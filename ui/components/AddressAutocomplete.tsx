"use client";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

interface AddressAutocompleteProps {
  placeholder: string;
  onAddressSelect: (address: string, lat?: number, lng?: number) => void;
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: string;
}

export function AddressAutocomplete({
  placeholder,
  onAddressSelect,
  className,
  style,
  defaultValue = "",
}: AddressAutocompleteProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: "fr" },
    },
    debounce: 300,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue, false);
    }
  }, [defaultValue, setValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      onAddressSelect(description, lat, lng);
    });
  };

  // Fermer les suggestions si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clearSuggestions();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearSuggestions]);

  return (
    <div className="relative" ref={ref}>
      <MapPin
        size={16}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37] z-10"
      />
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
        className={className}
        style={style}
      />
      {status === "OK" && (
        <ul className="absolute z-50 w-full mt-2 bg-white border rounded-xl shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden">
          {data.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={handleSelect(suggestion)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm font-bold text-black border-b last:border-0"
            >
              <strong>{suggestion.structured_formatting.main_text}</strong>{" "}
              <small className="text-gray-500 font-medium">
                {suggestion.structured_formatting.secondary_text}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
