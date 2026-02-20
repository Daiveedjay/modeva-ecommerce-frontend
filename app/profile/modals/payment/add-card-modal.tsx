"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateUserPaymentMethod } from "@/app/_queries/profile/payment/create-user-payment-method";
import { Spinner } from "@/components/reuseables/spinner";
import { CreditCard } from "lucide-react";
import { usePaymentModalStore } from "@/app/profile/tabs/store/use-payment-store";
import { Separator } from "@/components/ui/separator";

// Card brand detection function
function detectCardBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\s/g, "");

  // Visa: starts with 4
  if (/^4/.test(digits)) return "Visa";

  // Mastercard: starts with 51-55 or 2221-2720
  if (
    /^5[1-5]/.test(digits) ||
    /^2(22[1-9]|2[3-9]|[3-6]|7[01]|720)/.test(digits)
  ) {
    return "Mastercard";
  }

  // American Express: starts with 34 or 37
  if (/^3[47]/.test(digits)) return "American Express";

  // Discover: starts with 6011, 622126-622925, 644-649, or 65
  if (
    /^6011|^622(1(2[6-9]|[3-9])|[2-8]|9([01]|2[0-5]))|^64[4-9]|^65/.test(digits)
  ) {
    return "Discover";
  }

  // Diners Club: starts with 36 or 300-305
  if (/^3(0[0-5]|6)/.test(digits)) return "Diners Club";

  // JCB: starts with 2131, 1800, or 35
  if (/^(2131|1800|35)/.test(digits)) return "JCB";

  return "Unknown";
}

// Get brand color for visual feedback
function getBrandColor(brand: string): string {
  switch (brand) {
    case "Visa":
      return "text-blue-600";
    case "Mastercard":
      return "text-orange-600";
    case "American Express":
      return "text-blue-500";
    case "Discover":
      return "text-orange-500";
    case "Diners Club":
      return "text-blue-700";
    case "JCB":
      return "text-red-600";
    default:
      return "text-muted-foreground";
  }
}

export function AddCardModal() {
  const { mutate: createUserPaymentMethod, isPending } =
    useCreateUserPaymentMethod();

  const { addPaymentModal, closeAddPaymentModal } = usePaymentModalStore(
    (state) => state,
  );

  const [formData, setFormData] = useState({
    card_type: "credit" as "credit" | "debit",
    card_holder: "",
    card_number: "",
    expiry: "",
    cvv: "",
    is_default: false,
  });
  const [cardBrand, setCardBrand] = useState<string>("Unknown");

  const handleClose = () => {
    if (isPending) return;
    setFormData({
      card_type: "credit",
      card_holder: "",
      card_number: "",
      expiry: "",
      cvv: "",
      is_default: false,
    });
    setCardBrand("Unknown");
    closeAddPaymentModal();
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    const [month, year] = formData.expiry.split("/");
    const fullYear = parseInt(year) + 2000;

    createUserPaymentMethod({
      card_type: formData.card_type,
      card_brand: cardBrand,
      card_number: formData.card_number.replace(/\s/g, ""),
      cardholder_name: formData.card_holder,
      exp_month: parseInt(month),
      exp_year: fullYear,
      cvv: formData.cvv,
      is_default: formData.is_default,
    });

    handleClose();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const limitedValue = value.slice(0, 16);
    const formattedValue = limitedValue.replace(/(\d{4})/g, "$1 ").trim();

    setFormData({ ...formData, card_number: formattedValue });

    // Detect card brand as user types
    const brand = detectCardBrand(limitedValue);
    setCardBrand(brand);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 1) {
      const firstDigit = parseInt(value[0]);
      if (firstDigit > 1) {
        value = "0" + value;
      }
    }

    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2));
      if (month > 12) {
        value = "12" + value.slice(2);
      }
    }

    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setFormData({ ...formData, expiry: value });
  };

  const isFormValid = () => {
    const cardNumberDigits = formData.card_number.replace(/\s/g, "");
    const expiryParts = formData.expiry.split("/");

    return (
      formData.card_holder.trim().length > 0 &&
      cardNumberDigits.length === 16 &&
      formData.expiry.length === 5 &&
      expiryParts.length === 2 &&
      parseInt(expiryParts[0]) >= 1 &&
      parseInt(expiryParts[0]) <= 12 &&
      formData.cvv.length === 3 &&
      cardBrand !== "Unknown"
    );
  };

  return (
    <Dialog
      open={addPaymentModal}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}>
      <DialogContent className="bg-background rounded-none border-none shadow-2xl w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[95vh] overflow-y-auto p-0 gap-0">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
          <DialogHeader className="text-left space-y-1 md:space-y-2">
            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-beatrice-deck font-normal tracking-tight">
              Add Payment Card
            </DialogTitle>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Enter your card details to add a new payment method.
            </p>
          </DialogHeader>

          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            {/* Card Type Dropdown */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 md:w-8 h-px bg-border" />
                <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-muted-foreground/80">
                  Card Type
                </Label>
              </div>
              <Select
                value={formData.card_type}
                onValueChange={(value: "credit" | "debit") =>
                  setFormData({ ...formData, card_type: value })
                }>
                <SelectTrigger className="h-12 md:h-14 text-sm md:text-base">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-border/50" />

            {/* Cardholder */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 md:w-8 h-px bg-border" />
                <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-muted-foreground/80">
                  Cardholder Name
                </Label>
              </div>
              <div className="relative">
                <Input
                  value={formData.card_holder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      card_holder: e.target.value,
                    })
                  }
                  maxLength={100}
                  placeholder="Enter name on card"
                  className="h-12 md:h-14 text-sm md:text-base"
                  required
                />
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium absolute -bottom-5 right-0">
                  {formData.card_holder.length} / 100
                </span>
              </div>
            </div>

            {/* Card number with brand detection */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 md:w-8 h-px bg-border" />
                <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-muted-foreground/80">
                  Card Number
                </Label>
              </div>
              <div className="relative">
                <Input
                  value={formData.card_number}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="font-mono pr-24 sm:pr-28 md:pr-32 h-12 md:h-14 text-sm md:text-base"
                  required
                />
                {/* Card brand indicator */}
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2">
                  {cardBrand !== "Unknown" && (
                    <>
                      <CreditCard
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${getBrandColor(cardBrand)}`}
                      />
                      <span
                        className={`text-[10px] sm:text-xs font-medium ${getBrandColor(
                          cardBrand,
                        )}`}>
                        {cardBrand}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Expiry / CVV */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-4 md:w-6 h-px bg-border" />
                  <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-muted-foreground/80">
                    Expiry
                  </Label>
                </div>
                <Input
                  value={formData.expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="font-mono h-12 md:h-14 text-sm md:text-base"
                  required
                />
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-4 md:w-6 h-px bg-border" />
                  <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-muted-foreground/80">
                    CVV
                  </Label>
                </div>
                <Input
                  value={formData.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setFormData({
                      ...formData,
                      cvv: value,
                    });
                  }}
                  placeholder="000"
                  maxLength={3}
                  className="font-mono h-12 md:h-14 text-sm md:text-base"
                  required
                />
              </div>
            </div>

            {/* Default checkbox */}
            <div
              className="flex items-start sm:items-center gap-3 md:gap-4 p-4 md:p-6 border-2 group cursor-pointer bg-input/10 transition-colors"
              onClick={() =>
                setFormData({ ...formData, is_default: !formData.is_default })
              }>
              <Checkbox
                id="setAsDefault"
                checked={formData.is_default}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    is_default: Boolean(checked),
                  })
                }
                className="w-4 h-4 md:w-5 md:h-5 data-[state=checked]:bg-foreground data-[state=checked]:border-primary mt-0.5 sm:mt-0 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="setAsDefault"
                  className="text-xs sm:text-sm font-semibold cursor-pointer block">
                  Set as default payment method
                </Label>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-light">
                  Use this card for all future purchases.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 bg-background/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 border-t border-border/40 flex-col sm:flex-row gap-3 md:gap-4 mt-0">
          <Button
            type="button"
            onClick={closeAddPaymentModal}
            variant="ghost"
            className="w-full sm:flex-1 h-12 sm:h-13 md:h-14 text-xs sm:text-sm font-semibold tracking-wide hover:bg-muted/50 transition-all order-2 sm:order-1">
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid() || isPending}
            className="w-full sm:flex-1 md:flex-2 h-12 sm:h-13 md:h-14 bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-xl disabled:bg-primary shadow-primary/20 transition-all text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isPending && <Spinner className="w-4 h-4" />}
            {isPending ? "Adding Card..." : "Add Card"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
