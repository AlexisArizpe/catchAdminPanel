import Stripe from 'stripe';

const stripe = new Stripe(useRuntimeConfig().public.stripeSecretKey, {});

export default defineEventHandler(async (event) => {
    try {
        let body;
        try {
            body = await readBody(event);
        } catch (error) {
            return {
                error: 'Error reading request body',
                event: event
            };
        }
        const { paymentMethodId } = body;


        // Eliminar el método de pago del cliente
        const detachedPaymentMethod = await stripe.paymentMethods.detach(paymentMethodId);

        return {
            success: true,
            detachedPaymentMethod,
        };
    } catch (error) {
        return {
            error: 'Error processing request',
            details: error,
        };
    }
});
