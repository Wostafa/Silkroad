import { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { StripeConfig } from '../Constants';

type StripeType = Stripe | null;

export default function useStripe(): StripeType {
  const [stripe, setStripe] = useState<StripeType>(null);

  useEffect(() => {
    (async () => {
      const _stripe = await loadStripe(StripeConfig.PUB_KEY);
      console.log('Stripe is loaded');
      setStripe(_stripe);
    })().catch(e => {
      console.log('Failed to load Stripe: ', e);
    });
  }, []);

  return stripe;
}
