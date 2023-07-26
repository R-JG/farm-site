import Stripe from 'stripe';
import { STRIPE_API_SECRET } from '@/utils/config';

let stripe = new Stripe(STRIPE_API_SECRET, { 
  apiVersion: '2022-11-15', 
  typescript: true 
});

export default stripe;