import LongArrow from "@/app/_resuseables/long-arrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function InformationTab() {
  return (
    <div className=" space-y-12">
      {" "}
      <div className=" space-y-4">
        {" "}
        <h3 className=" tracking-[0px] font-medium text-sm">CONTACT INFO</h3>
        <Input
          className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
          placeholder="Email"
          type="email"
        />
        <Input
          className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
          placeholder="Phone number"
          type="text"
        />
      </div>
      <div className=" space-y-4">
        {" "}
        <h3 className=" tracking-[0px] font-medium text-sm">
          SHIPPING ADDRESS
        </h3>
        <div className=" flex gap-2">
          {" "}
          <Input
            className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
            placeholder="First name"
            type="text"
          />
          <Input
            className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
            placeholder="Last name"
            type="text"
          />
        </div>
        <Input
          className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
          placeholder="Country"
          type="text"
        />
        <Input
          className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
          placeholder="State / Region"
          type="text"
        />
        <Input
          className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
          placeholder="Address"
          type="text"
        />{" "}
        <div className=" flex gap-2">
          {" "}
          <Input
            className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
            placeholder="City"
            type="text"
          />
          <Input
            className=" h-11 placeholder:tracking-[0px] placeholder:font-beatrice"
            placeholder="Postal code"
            type="text"
          />
        </div>
        <div className="   justify-end flex w-full">
          <div className="w-1/2  pl-1.5">
            <div className="  w-full h-full">
              <Button className=" flex w-full p-6! justify-between text-foreground! tracking-[0px]  ">
                {" "}
                <span>Shipping</span>
                <LongArrow strokeWidth={1.2} className="size-auto" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
