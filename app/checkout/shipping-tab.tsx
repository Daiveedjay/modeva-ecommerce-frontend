// "use client";

// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// interface ShippingTabProps {
//   shippingMethod: string;
//   onShippingChange: (value: string) => void;
//   onBack: () => void;
//   onNext: () => void;
// }

// export function ShippingTab({
//   shippingMethod,
//   onShippingChange,
//   onBack,
//   onNext,
// }: ShippingTabProps) {
//   return (
//     <div className="space-y-6  ">
//       <div>
//         <h2 className="text-base  mb-4">SHIPPING METHOD</h2>
//         <RadioGroup value={shippingMethod} onValueChange={onShippingChange}>
//           <div className="space-y-5">
//             <div className="flex items-center space-x-3 p-4 border border-gray-300  cursor-pointer hover:bg-gray-50">
//               <RadioGroupItem value="standard" id="standard" />
//               <Label
//                 htmlFor="standard"
//                 className="flex-1 space-x-4 cursor-pointer">
//                 <div className="font-semibold">Standard</div>
//                 <div className="text-sm text-gray-600">
//                   Delivery in 5-7 business days
//                 </div>
//               </Label>
//               <span className="font-semibold">FREE</span>
//             </div>

//             <div className="flex items-center space-x-3 p-4 border border-gray-300  cursor-pointer hover:bg-gray-50">
//               <RadioGroupItem value="express" id="express" />
//               <Label
//                 htmlFor="express"
//                 className="flex-1 space-x-4 cursor-pointer">
//                 <div className="font-semibold">Express</div>
//                 <div className="text-sm text-gray-600">
//                   Delivery in 2-3 business days
//                 </div>
//               </Label>
//               <span className="font-semibold">$15.00</span>
//             </div>

//             <div className="flex items-center space-x-3 p-4 border border-gray-300  cursor-pointer hover:bg-gray-50">
//               <RadioGroupItem value="overnight" id="overnight" />
//               <Label
//                 htmlFor="overnight"
//                 className="flex-1 space-x-4 cursor-pointer">
//                 <div className="font-semibold">Overnight</div>
//                 <div className="text-sm text-gray-600">
//                   Delivery next business day
//                 </div>
//               </Label>
//               <span className="font-semibold">$30.00</span>
//             </div>
//           </div>
//         </RadioGroup>
//       </div>

//       <div className="flex justify-between">
//         <Button
//           onClick={onBack}
//           variant="outline"
//           className="px-8 py-4 bg-transparent">
//           ← Back
//         </Button>
//         <Button
//           onClick={onNext}
//           className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 ">
//           Payment →
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ShippingTabProps {
  onBack: () => void;
  onNext: () => void;
}

export function ShippingTab({ onBack, onNext }: ShippingTabProps) {
  const [shippingMethod, setShippingMethod] = useState("standard");

  const shippingOptions = [
    {
      id: "standard",
      label: "Standard",
      description: "Delivery in 5-7 business days",
      price: "FREE",
    },
    {
      id: "express",
      label: "Express",
      description: "Delivery in 2-3 business days",
      price: "$15.00",
    },
    {
      id: "overnight",
      label: "Overnight",
      description: "Delivery next business day",
      price: "$30.00",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base mb-4">SHIPPING METHOD</h2>

        <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
          <div className="space-y-5">
            {shippingOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setShippingMethod(option.id)}
                className={`flex items-center space-x-3 p-4 border cursor-pointer hover:bg-gray-50 transition-colors ${
                  shippingMethod === option.id
                    ? "border-black bg-gray-50"
                    : "border-gray-300"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  setShippingMethod(option.id)
                }>
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  checked={shippingMethod === option.id}
                  onChange={() => setShippingMethod(option.id)}
                />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                </Label>
                <span className="font-semibold">{option.price}</span>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="p-6! bg-transparent">
          ← Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-gray-800 hover:bg-gray-900 text-white p-6!">
          Payment →
        </Button>
      </div>
    </div>
  );
}
