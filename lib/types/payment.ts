export interface CreatePaymentMethodRequest {
  card_type: "credit" | "debit";
  card_brand: string;
  card_number: string;
  exp_month: number;
  exp_year: number;
  cvv: string;
  cardholder_name: string;
  is_default: boolean;
}

export interface PaymentMethodResponse {
  id: string;
  type: "card";
  card_number: string;
  card_brand: string;
  card_type: string;
  card_holder: string;
  expiry: string;
  is_default: boolean;
  status: string;
}
