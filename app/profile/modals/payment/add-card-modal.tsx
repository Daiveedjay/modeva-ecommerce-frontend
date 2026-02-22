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
import { useGetUserPaymentMethods } from "@/app/_queries/profile/payment/get-user-payment-methods";

// Card brand detection
function detectCardBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\s/g, "");
  if (/^4/.test(digits)) return "Visa";
  if (
    /^5[1-5]/.test(digits) ||
    /^2(22[1-9]|2[3-9]|[3-6]|7[01]|720)/.test(digits)
  )
    return "Mastercard";
  if (/^3[47]/.test(digits)) return "American Express";
  if (
    /^6011|^622(1(2[6-9]|[3-9])|[2-8]|9([01]|2[0-5]))|^64[4-9]|^65/.test(digits)
  )
    return "Discover";
  if (/^3(0[0-5]|6)/.test(digits)) return "Diners Club";
  if (/^(2131|1800|35)/.test(digits)) return "JCB";
  return "Unknown";
}

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
  const { data, isLoading } = useGetUserPaymentMethods();
  const payment_methods = data?.data ?? [];
  const { addPaymentModal, closeAddPaymentModal } = usePaymentModalStore(
    (state) => state,
  );

  const isFirstPayment = !isLoading && payment_methods.length === 0;

  const [formData, setFormData] = useState({
    card_type: "credit" as "credit" | "debit",
    card_holder: "",
    card_number: "",
    expiry: "",
    cvv: "",
    is_default: isFirstPayment,
  });

  const [cardBrand, setCardBrand] = useState<string>("Unknown");

  const [errors, setErrors] = useState({
    card_holder: "",
    card_number: "",
    expiry: "",
    cvv: "",
  });

  const handleClose = () => {
    if (isPending) return;
    setFormData({
      card_type: "credit",
      card_holder: "",
      card_number: "",
      expiry: "",
      cvv: "",
      is_default: isFirstPayment,
    });
    setCardBrand("Unknown");
    setErrors({ card_holder: "", card_number: "", expiry: "", cvv: "" });
    closeAddPaymentModal();
  };

  const validateForm = () => {
    const newErrors: typeof errors = {
      card_holder: "",
      card_number: "",
      expiry: "",
      cvv: "",
    };
    const cardNumberDigits = formData.card_number.replace(/\s/g, "");
    const expiryParts = formData.expiry.split("/");

    if (!formData.card_holder.trim())
      newErrors.card_holder = "Cardholder name is required.";
    if (cardNumberDigits.length !== 16 || cardBrand === "Unknown")
      newErrors.card_number = "Invalid card number.";
    if (formData.cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits.";
    if (formData.expiry.length !== 5 || expiryParts.length !== 2) {
      newErrors.expiry = "Expiry must be in MM/YY format.";
    } else {
      const month = parseInt(expiryParts[0]);
      const year = parseInt(expiryParts[1]) + 2000;
      const now = new Date();
      if (month < 1 || month > 12) newErrors.expiry = "Invalid month.";
      else if (
        new Date(year, month - 1, 1) <
        new Date(now.getFullYear(), now.getMonth(), 1)
      ) {
        newErrors.expiry = "Expiry date cannot be in the past.";
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

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
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = value.replace(/(\d{4})/g, "$1 ").trim();
    setFormData({ ...formData, card_number: formattedValue });
    setCardBrand(detectCardBrand(value));
    setErrors({ ...errors, card_number: "" });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 1 && parseInt(value[0]) > 1) value = "0" + value;
    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2));
      if (month > 12) value = "12" + value.slice(2);
    }
    if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    setFormData({ ...formData, expiry: value });
    setErrors({ ...errors, expiry: "" });
  };

  const isFormValid = () => {
    return validateForm();
  };

  return (
    <Dialog
      open={addPaymentModal}
      onOpenChange={(open) => !open && handleClose()}>
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

          {/* Card Type */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 md:w-8 h-px bg-border" />
              <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
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
              <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
                Cardholder Name
              </Label>
            </div>
            <div className="relative">
              <Input
                value={formData.card_holder}
                onChange={(e) =>
                  setFormData({ ...formData, card_holder: e.target.value })
                }
                maxLength={100}
                placeholder="Enter name on card"
                className="h-12 md:h-14 text-sm md:text-base"
                required
              />
              <span className="text-[10px] md:text-xs text-muted-foreground font-medium absolute -bottom-5 right-0">
                {formData.card_holder.length} / 100
              </span>
              {errors.card_holder && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.card_holder}
                </p>
              )}
            </div>
          </div>

          {/* Card Number */}
          <div className="space-y-3 md:space-y-4 relative">
            <div className="flex items-center gap-2">
              <span className="w-6 md:w-8 h-px bg-border" />
              <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
                Card Number
              </Label>
            </div>
            <Input
              value={formData.card_number}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="font-mono pr-32 h-12 md:h-14 text-sm md:text-base"
              required
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {cardBrand !== "Unknown" && (
                <>
                  <CreditCard
                    className={`w-4 h-4 ${getBrandColor(cardBrand)}`}
                  />
                  <span
                    className={`text-[10px] sm:text-xs font-medium ${getBrandColor(cardBrand)}`}>
                    {cardBrand}
                  </span>
                </>
              )}
            </div>
            {errors.card_number && (
              <p className="text-red-500 text-xs mt-1">{errors.card_number}</p>
            )}
          </div>

          {/* Expiry / CVV */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-4 md:w-6 h-px bg-border" />
                <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
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
              {errors.expiry && (
                <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
              )}
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-4 md:w-6 h-px bg-border" />
                <Label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
                  CVV
                </Label>
              </div>
              <Input
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                  })
                }
                placeholder="000"
                maxLength={3}
                className="font-mono h-12 md:h-14 text-sm md:text-base"
                required
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Default Checkbox */}
          <div
            className={`flex items-start sm:items-center gap-3 md:gap-4 p-4 md:p-6 border-2 transition-colors ${
              isFirstPayment
                ? "bg-input/10 cursor-not-allowed"
                : "bg-input/10 cursor-pointer"
            }`}
            onClick={() =>
              !isFirstPayment &&
              setFormData({ ...formData, is_default: !formData.is_default })
            }>
            <Checkbox
              id="setAsDefault"
              checked={formData.is_default}
              disabled={isFirstPayment}
              onCheckedChange={(checked) =>
                !isFirstPayment &&
                setFormData({ ...formData, is_default: Boolean(checked) })
              }
              className="w-4 h-4 md:w-5 md:h-5 data-[state=checked]:bg-foreground data-[state=checked]:border-primary mt-0.5 sm:mt-0 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <Label
                htmlFor="setAsDefault"
                className={`text-xs sm:text-sm font-semibold block ${
                  isFirstPayment ? "cursor-not-allowed" : "cursor-pointer"
                }`}>
                Set as default payment method
              </Label>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-light">
                Use this card for all future purchases.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 bg-background/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 border-t border-border/40 flex-col sm:flex-row gap-3 md:gap-4 mt-0">
          <Button
            type="button"
            onClick={handleClose}
            variant="ghost"
            className="w-full sm:flex-1 h-12 sm:h-13 md:h-14 text-xs sm:text-sm font-semibold tracking-wide hover:bg-muted/50 transition-all order-2 sm:order-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full sm:flex-1 md:flex-2 h-12 sm:h-13 md:h-14 bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-xl disabled:bg-primary shadow-primary/20 transition-all text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isPending && <Spinner className="w-4 h-4" />}
            {isPending ? "Adding Card..." : "Add Card"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
