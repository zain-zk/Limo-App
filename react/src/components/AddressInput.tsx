import { useEffect, useRef } from 'react';
import { Input } from '../app/components/ui/input';

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined;

interface AddressInputProps extends React.ComponentProps<typeof Input> {
  onPlaceSelect?: (address: string) => void;
}

export function AddressInput({ onPlaceSelect, ...props }: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!MAPS_KEY || !inputRef.current) return;

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'ca' },
        fields: ['formatted_address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onPlaceSelect?.(place.formatted_address);
          props.onChange?.({
            target: { name: props.name || '', value: place.formatted_address },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      });
    };

    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    const scriptId = 'google-maps-places';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  }, [onPlaceSelect, props]);

  return <Input ref={inputRef} {...props} />;
}

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: { componentRestrictions?: { country: string }; fields?: string[] },
          ) => {
            addListener: (event: string, cb: () => void) => void;
            getPlace: () => { formatted_address?: string };
          };
        };
      };
    };
  }
}
