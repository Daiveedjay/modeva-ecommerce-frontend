"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Credit/Debit Card Component
function CardPaymentForm({
  formData,
  onInputChange,
  onCardNumberChange,
  onExpiryChange,
  billingAddressSame,
  onBillingAddressSameChange,
}: {
  formData: unknown;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  billingAddressSame: boolean;
  onBillingAddressSameChange: (checked: boolean) => void;
}) {
  return (
    <div className="space-y-6 p-6 bg-white border border-gray-300">
      <div>
        <h3 className="font-semibold mb-4">Card Details</h3>
        <div className="space-y-3">
          <Input
            name="cardName"
            placeholder="Cardholder Name"
            // value={formData.cardName}
            onChange={onInputChange}
            className="bg-gray-50 border-gray-300"
          />
          <Input
            name="cardNumber"
            placeholder="Card Number"
            // value={formData.cardNumber}
            onChange={onCardNumberChange}
            maxLength={19}
            className="bg-gray-50 border-gray-300 font-mono"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="expiryDate"
              placeholder="MM/YY"
              // value={formData.expiryDate}
              onChange={onExpiryChange}
              maxLength={5}
              className="bg-gray-50 border-gray-300 font-mono"
            />
            <Input
              name="cvv"
              placeholder="CVV"
              // value={formData.cvv}
              onChange={onInputChange}
              maxLength={4}
              className="bg-gray-50 border-gray-300 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="billing-same"
            checked={billingAddressSame}
            onChange={(e) => onBillingAddressSameChange(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="billing-same" className="cursor-pointer">
            Billing address same as shipping
          </Label>
        </div>

        {!billingAddressSame && (
          <div className="space-y-3">
            <h3 className="font-semibold">Billing Address</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="billingFirstName"
                placeholder="First Name"
                // value={formData.billingFirstName}
                onChange={onInputChange}
              />
              <Input
                name="billingLastName"
                placeholder="Last Name"
                // value={formData.billingLastName}
                onChange={onInputChange}
              />
            </div>
            <Input
              name="billingAddress"
              placeholder="Address"
              // value={formData.billingAddress}
              onChange={onInputChange}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="billingCity"
                placeholder="City"
                // value={formData.billingCity}
                onChange={onInputChange}
              />
              <Input
                name="billingPostalCode"
                placeholder="Postal Code"
                // value={formData.billingPostalCode}
                onChange={onInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="billingState"
                placeholder="State / Region"
                // value={formData.billingState}
                onChange={onInputChange}
              />
              <Input
                name="billingCountry"
                placeholder="Country"
                // value={formData.billingCountry}
                onChange={onInputChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// PayPal Component
function PayPalPaymentForm({
  formData,
  onInputChange,
}: {
  formData: unknown;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-4 p-6 bg-white border border-gray-300">
      <h3 className="font-semibold">PayPal Account</h3>
      <Input
        name="paypalEmail"
        type="email"
        placeholder="PayPal Email Address"
        // value={formData.paypalEmail}
        onChange={onInputChange}
        className="bg-gray-50 border-gray-300"
      />
      <p className="text-sm text-gray-600">
        You will be redirected to PayPal to complete your purchase securely.
      </p>
    </div>
  );
}

// Apple Pay Component
function ApplePayPaymentForm() {
  return (
    <div className="space-y-4 p-6 bg-white border border-gray-300 text-center">
      <h3 className="font-semibold">Apple Pay</h3>
      <p className="text-gray-600 mb-4">
        Click &apos;Complete Purchase&apos; to authenticate with Face ID or
        Touch ID
      </p>
      <div className="text-4xl">🍎</div>
    </div>
  );
}

// Google Pay Component
function GooglePayPaymentForm() {
  return (
    <div className="space-y-4 p-6 bg-white border border-gray-300 text-center">
      <h3 className="font-semibold">Google Pay</h3>
      <p className="text-gray-600 mb-4">
        Click &apos;Complete Purchase&apos; to authenticate with your Google
        account
      </p>
      <div className="text-4xl">🔵</div>
    </div>
  );
}

// Main Payment Tab Component
export function PaymentTab({
  onBack,
  onCompletePayment,
}: {
  onBack: () => void;
  onCompletePayment: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingAddressSame, setBillingAddressSame] = useState(true);
  const [total] = useState(129.99);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .substring(0, 19);
    setFormData((prev) => ({ ...prev, cardNumber: value }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    setFormData((prev) => ({ ...prev, expiryDate: value.substring(0, 5) }));
  };

  const handleCompletePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCompletePayment();
    }, 2000);
  };

  const paymentOptions = [
    {
      id: "credit-card",
      label: "Credit Card",
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "debit-card",
      label: "Debit Card",
      description: "Direct bank debit",
    },
    {
      id: "paypal",
      label: "PayPal",
      description: "Fast and secure PayPal checkout",
    },
    // {
    //   id: "apple-pay",
    //   label: "Apple Pay",
    //   description: "Quick and secure with Face ID or Touch ID",
    // },
    // {
    //   id: "google-pay",
    //   label: "Google Pay",
    //   description: "Fast checkout with your Google account",
    // },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          PAYMENT METHOD
        </h2>

        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="space-y-3 mb-6">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setPaymentMethod(option.id)}
                className={`p-4 border-2 cursor-pointer transition-colors ${
                  paymentMethod === option.id
                    ? "border-black bg-gray-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  setPaymentMethod(option.id)
                }>
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    checked={paymentMethod === option.id}
                    onChange={() => setPaymentMethod(option.id)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Render appropriate payment form based on selection */}
      {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
        <CardPaymentForm
          formData={formData}
          onInputChange={handleInputChange}
          onCardNumberChange={handleCardNumberChange}
          onExpiryChange={handleExpiryChange}
          billingAddressSame={billingAddressSame}
          onBillingAddressSameChange={setBillingAddressSame}
        />
      )}

      {paymentMethod === "paypal" && (
        <PayPalPaymentForm
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}

      {/* {paymentMethod === "apple-pay" && <ApplePayPaymentForm />} */}

      {/* {paymentMethod === "google-pay" && <GooglePayPaymentForm />} */}

      {/* Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="p-6! bg-transparent">
          ← Back
        </Button>
        <Button
          onClick={handleCompletePayment}
          disabled={isProcessing}
          className="bg-gray-800 hover:bg-gray-900 text-white p-6! disabled:opacity-50">
          {isProcessing
            ? "Processing..."
            : `Complete Purchase - $${total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
}
