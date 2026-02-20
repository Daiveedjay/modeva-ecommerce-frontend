import { useUserAddressStore } from "@/app/profile/_hooks/use-user-address-store";
import { useCities } from "@/app/profile/_hooks/use-cities";
import { useCountries } from "@/app/profile/_hooks/use-countries";
import { useStates } from "@/app/profile/_hooks/use-locations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationComboBox } from "@/components/ui/location-combobox";

export function AddressInfoSection() {
  const { street, country, state, city, zip } = useUserAddressStore(
    (store) => store.formData
  );

  // Fetch location data
  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStates(country);
  const { data: cities = [], isLoading: loadingCities } = useCities(
    country,
    state
  );

  const { setCity, setCountry, setState, setStreet, setZip } =
    useUserAddressStore((store) => store);
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-8 h-px bg-border" />
        <Label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
          Address Information
        </Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="street" className="text-sm font-medium ml-1">
          Street Address
        </Label>
        <Input
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="e.g. 123 Luxury Lane, Suite 400"
          className="h-12 px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium ml-1">Country</Label>
          <LocationComboBox
            value={country}
            onValueChange={setCountry}
            items={countries}
            placeholder="Select country"
            isLoading={loadingCountries}
            className="h-12 bg-muted/30"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium ml-1">State / Province</Label>
          <LocationComboBox
            value={state}
            onValueChange={setState}
            items={states}
            placeholder="Select state"
            disabled={!country}
            isLoading={loadingStates}
            className="h-12 bg-muted/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium ml-1">City</Label>
          <LocationComboBox
            value={city}
            onValueChange={setCity}
            items={cities}
            placeholder="Select city"
            disabled={!state}
            isLoading={loadingCities}
            className="h-12 bg-muted/30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-sm font-medium ml-1">
            Zip / Postal Code
          </Label>
          <Input
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter zip code"
            className="h-12 px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
          />
        </div>
      </div>
    </section>
  );
}
