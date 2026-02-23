import { useUserAddressStore } from "@/app/profile/_hooks/use-user-address-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

export function RecipientDetailsSection() {
  const { first_name, last_name, phone } = useUserAddressStore(
    (store) => store.formData,
  );

  const { setFirstName, setLastName, setPhone } = useUserAddressStore();
  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-6 sm:w-8 h-px bg-border" />
        <Label className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-muted-foreground/80">
          Recipient Details
        </Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5 sm:space-y-2">
          <Label
            htmlFor="first_name"
            className="text-xs sm:text-sm font-medium ml-1">
            First Name
          </Label>
          <Input
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className="h-10 sm:h-11 px-3 sm:px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-sm sm:text-base"
          />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <Label
            htmlFor="last_name"
            className="text-xs sm:text-sm font-medium ml-1">
            Last Name
          </Label>
          <Input
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className="h-10 sm:h-11 px-3 sm:px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-sm sm:text-base"
          />
        </div>
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label
          htmlFor="phone"
          className="text-xs sm:text-sm font-medium ml-1 flex items-center gap-2">
          Phone Number{" "}
          <span className="text-[10px] sm:text-xs font-normal text-muted-foreground/60">
            (Optional)
          </span>
        </Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 000-0000"
          className="h-10 sm:h-11 px-3 sm:px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-sm sm:text-base"
        />
      </div>
    </section>
  );
}
