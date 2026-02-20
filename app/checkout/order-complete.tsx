import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderCompleteProps {
  email: string;
}

export function OrderComplete({ email }: OrderCompleteProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="p-8 bg-white border-gray-300 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Complete!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="bg-gray-50 p-4 rounded mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="font-mono font-bold">
              #ORD-2024-{Math.floor(Math.random() * 100000)}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            A confirmation email has been sent to {email}
          </p>
          <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
            Continue Shopping
          </Button>
        </Card>
      </div>
    </div>
  );
}
