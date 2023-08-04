import { CartItem } from '@/utils/types';

export const parseCartItemArray = (body: unknown): CartItem[] => {
  const errorMessage = 'Cart session request body is missing or contains incorrect data';
  const parseNumber = (prop: unknown): number => {
    if (!prop || (typeof prop !== 'number')) throw new Error(errorMessage);
    return prop;
  };
  const parseString = (prop: unknown): string => {
    if (!prop || (typeof prop !== 'string')) throw new Error(errorMessage);
    return prop;
  };
  const parseCartItem = (params: unknown): CartItem => {
    if (!params || (typeof params !== 'object') || !('priceId' in params)
    || !('shopItemId' in params) || !('quantity' in params)) throw new Error(errorMessage);
    return { 
      priceId: parseString(params.priceId),
      shopItemId: parseString(params.shopItemId), 
      quantity: parseNumber(params.quantity) 
    };
  };
  if (!Array.isArray(body)) throw new Error(errorMessage);
  return body.map(el => parseCartItem(el));
};