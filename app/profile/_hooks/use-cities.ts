import { ComboItem } from "@/components/ui/location-combobox";
import { useQuery } from "@tanstack/react-query";

// Fetch cities for a specific country and state
export const fetchCities = async (
  country: string,
  state: string
): Promise<ComboItem[]> => {
  const response = await fetch(
    `https://countriesnow.space/api/v0.1/countries/state/cities`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, state }),
    }
  );
  if (!response.ok) throw new Error("Error fetching cities");
  const data = await response.json();
  return data.data.map((city: string) => ({
    value: city,
  }));
};

export const useCities = (country: string, state: string) => {
  return useQuery<ComboItem[], Error>({
    queryKey: ["cities", country, state],
    queryFn: () => fetchCities(country, state),
    select: (data) => data.sort((a, b) => a.value.localeCompare(b.value)),
    enabled: !!country && !!state, // Only fetch when both country and state are selected
    staleTime: Infinity,
  });
};
