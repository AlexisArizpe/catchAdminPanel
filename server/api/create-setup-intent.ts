import Stripe from 'stripe';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const stripe = new Stripe(config.stripeSecretKey, {
    });

    const query = getQuery(event);
    const customerId = query.customerId as string;

    try {
        const setupIntent = await stripe.setupIntents.create({
            customer: customerId, // ID del cliente en Stripe
            payment_method_types: ['card'],
        });

        return setupIntent;
    } catch (error) {
        return {
            error: (error as Error).message,
        };
    }
});
