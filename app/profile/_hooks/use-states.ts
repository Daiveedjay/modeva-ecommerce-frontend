import { ComboItem } from "@/components/ui/location-combobox";
import { useQuery } from "@tanstack/react-query";

// Fetch states for a specific country
export const fetchStates = async (country: string): Promise<ComboItem[]> => {
  const response = await fetch(
    `https://countriesnow.space/api/v0.1/countries/states`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    }
  );
  if (!response.ok) throw new Error("Error fetching states");
  const data = await response.json();
  return data.data.states.map((state: { name: string }) => ({
    value: state.name,
  }));
};

export const useStates = (country: string) => {
  return useQuery<ComboItem[], Error>({
    queryKey: ["states", country],
    queryFn: () => fetchStates(country),
    select: (data) => data.sort((a, b) => a.value.localeCompare(b.value)),
    enabled: !!country, // Only fetch when country is selected
    staleTime: Infinity,
  });
};
