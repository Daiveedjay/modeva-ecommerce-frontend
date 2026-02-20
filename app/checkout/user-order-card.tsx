"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UserOrderCard() {
  const [currentPage, setCurrentPage] = useState(0);

  // Mock products data - replace with your actual products
  const products = [
    {
      id: 1,
      name: "Basic Heavy White Tee",
      variant: "Black / L",
      quantity: 1,
      price: 99,
      image: "/image-1.png",
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      variant: "Blue / M",
      quantity: 1,
      price: 81,
      image: "/image-1.png",
    },
    {
      id: 3,
      name: "Cotton Sweatshirt",
      variant: "Gray / XL",
      quantity: 2,
      price: 65,
      image: "/image-1.png",
    },
    {
      id: 4,
      name: "Slim Fit Chinos",
      variant: "Khaki / 32",
      quantity: 1,
      price: 75,
      image: "/image-1.png",
    },
  ];

  const itemsPerPage = 2;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="relative h-fit flex-1 border border-border tracking-[0px] p-10">
      <div className="space-y-6">
        <h4 className="tracking-[1px] font-medium">YOUR ORDER</h4>
        <div className="border-b border-border pb-10 flex flex-col gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="flex">
              <div className="border border-border relative w-[155px] h-[140px]">
                <Image
                  src={product.image}
                  fill
                  alt=""
                  className="object-cover aspect-auto"
                />
              </div>
              <div className="p-4 flex w-full justify-between">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <p className="text-[14px] font-medium">{product.name}</p>
                    <p className="text-base text-foreground/65">
                      {product.variant}
                    </p>
                  </div>
                  <p className="text-[#000E8A]">({product.quantity})</p>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <button className="underline cursor-pointer">Change</button>
                  <p>${product.price}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex  items-center justify-end gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-2 py-2 border cursor-pointer border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/5 transition-colors">
                <ChevronLeft />
              </button>
              <span className="text-sm">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
                }
                disabled={currentPage === totalPages - 1}
                className="px-2 py-2 border cursor-pointer border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/5 transition-colors">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>

        <div className="border-b border-border pb-10 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Shipping</span>
            <span className="text-foreground/55">Calculated at next step</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="absolute font-medium top-0 p-2 bg-background right-0 text-[#000E8A]">
        ({totalQuantity})
      </div>
    </div>
  );
}
