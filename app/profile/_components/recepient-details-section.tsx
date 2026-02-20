import { useUserAddressStore } from "@/app/profile/_hooks/use-user-address-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

export function RecipientDetailsSection() {
  const { first_name, last_name, phone } = useUserAddressStore(
    (store) => store.formData
  );

  const { setFirstName, setLastName, setPhone } = useUserAddressStore();
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-8 h-px bg-border" />
        <Label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
          Recipient Details
        </Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-sm font-medium ml-1">
            First Name
          </Label>
          <Input
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className="h-12 px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-sm font-medium ml-1">
            Last Name
          </Label>
          <Input
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className="h-12 px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className="text-sm font-medium ml-1 flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" /> Phone Number{" "}
          <span className="text-xs font-normal text-muted-foreground/60">
            (Optional)
          </span>
        </Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 000-0000"
          className="h-12 px-4 bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
        />
      </div>
    </section>
  );
}
