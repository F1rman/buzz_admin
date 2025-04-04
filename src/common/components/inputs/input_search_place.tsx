import { useEffect, useRef, useState } from "react";
import useGoogleMap from "hooks/useGoogleMap";
import Input from "./input";

interface InputSearchPlaceProps {
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: any } }) => void;
  onClick?: (info: { description: string; geo_lat?: number; geo_long?: number }) => void;
  label?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  value?: string;
  mapValue?: string;
  error?: boolean;
  setMapInfo?: (info: string) => void;
  id?: string;
}

interface PlacePrediction {
  description: string;
  place_id: string;
}

export default function InputSearchPlace({
  onChange,
  onClick = () => { },
  label,
  placeholder = "Search place",
  name = "",
  className = "",
  value,
  error = false,
  id = "defaultInput",
}: InputSearchPlaceProps) {
  const { load, isError } = useGoogleMap();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [hideResults, setHideResults] = useState(false);
  const [placePredictions, setPlacePredictions] = useState<PlacePrediction[]>([]);
  const [isPlacePredictionsLoading, setIsPlacePredictionsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedPlace) {
        getPlacePredictions(selectedPlace);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedPlace]);


  const getPlacePredictions = (input: string) => {
    setIsPlacePredictionsLoading(true);

    if (isError) {
      console.error("Google Maps API error");
      return;
    }
console.log(load)
    if (!load) {
      console.error("Google Maps API is not loaded");
      return;
    }

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
      if (status === "OK" && predictions) {
        setPlacePredictions(predictions);
        setIsPlacePredictionsLoading(false);
      } else {
        setHideResults(false);
      }
    });
  };

  const getPlaceDetails = (placeId: string): Promise<{ geo_lat: number; geo_long: number }> => {
    return new Promise((resolve, reject) => {
      const placesService = new window.google.maps.places.PlacesService(document.createElement("div"));
      const request = {
        placeId: placeId,
        fields: ["geometry.location"],
      };

      placesService.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          resolve({
            geo_lat: place.geometry.location.lat(),
            geo_long: place.geometry.location.lng(),
          });
        } else {
          console.error("Failed to get place details");
          reject(new Error("Failed to get place details"));
        }
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(e);
    setSelectedPlace(input);
    setHideResults(true);
  };

  const handlePredictionClick = (info: { description: string; geo_lat?: number; geo_long?: number }) => {
    onChange({ target: { name: "location", value: info } });
    onClick(info);
    setHideResults(false);
    setSelectedPlace(info.description);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setHideResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full relative">
      {label && <div className="label">{label}</div>}
      <Input
        id={id}
        name={name}
        onChange={handleInputChange}
        value={value || selectedPlace}
        placeholder={placeholder}
        wrapperClassName="!mb-0 w-full"
      />

      {hideResults && (
        <ul className={`results ${label && "!top-[79px]"} bg-white py-2 gap-1 flex flex-col border-[1px] border-solid rounded-lg rounded-t-none absolute z-50`}>
          {!isPlacePredictionsLoading ? (
            placePredictions.map((item, i) => (
              <li
                key={"search" + i}
                title={item.description}
                onClick={async () => {
                  const { geo_lat, geo_long } = await getPlaceDetails(item.place_id);
                  handlePredictionClick({ description: item.description, geo_lat, geo_long });
                }}
                className="hover:bg-[#f5f5f5] text-[#1b1b1b] px-2 py-[3px] cursor-pointer"
              >
                {item.description}
              </li>
            ))
          ) : (
            <li className=" text-[#1b1b1b] dark:text-[#c6c6c6]">Loading...</li>
          )}
        </ul>
      )}
    </div>
  );
}
