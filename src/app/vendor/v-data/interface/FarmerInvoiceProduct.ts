export interface FarmerInvoiceProduct {
  id_farmer_invoice_product: number,
  farmer_id: number
  vendor_id: number
  code_unique: number
  date: number|string
  description: string
  status: number
  amount_final_price: number
  created_at: number
  updated_at: number
  delete: number
  Farmer: any,
  FarmerInvoiceProductDelivery: any[],
  FarmerInvoiceProductDetail: any[],
  PaymentFarmerInvoiceProduct: any[],
  Vendor: any
}
