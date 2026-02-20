import { useUserAddressStore } from "@/app/profile/_hooks/use-user-address-store";
import { Label } from "@/components/ui/label";
import { Briefcase, Home, MapPin } from "lucide-react";

const ADDRESS_LABELS = [
  { value: "Home", icon: Home },
  { value: "Work", icon: Briefcase },
  { value: "Other", icon: MapPin },
];

export function AddressTypeSelector() {
  const selectedLabel = useUserAddressStore((store) => store.formData.label);
  const setLabel = useUserAddressStore((store) => store.setLabel);

  return (
    <section className="space-y-3 md:space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-6 md:w-8 h-px bg-border" />
        <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-muted-foreground/80">
          Select Location Type
        </Label>
      </div>
      <div className="flex gap-2 sm:gap-3">
        {ADDRESS_LABELS.map((label) => {
          const Icon = label.icon;
          const isActive = selectedLabel === label.value;
          return (
            <button
              key={label.value}
              type="button"
              onClick={() => setLabel(label.value)}
              className={`flex flex-col items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-none sm:w-20 md:w-24 h-20 sm:h-22 md:h-24 border-2 transition-all cursor-pointer duration-300 ${
                isActive
                  ? "bg-foreground border-none border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                  : "bg-white border-border text-muted-foreground hover:border-primary/30 hover:bg-input"
              }`}>
              <Icon
                className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 ${
                  isActive ? "text-white" : "text-muted-foreground"
                }`}
              />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wide">
                {label.value}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
