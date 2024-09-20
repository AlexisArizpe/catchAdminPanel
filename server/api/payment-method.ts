import Stripe from 'stripe';

const stripe = new Stripe(useRuntimeConfig().public.stripeSecretKey, {
    // Asegúrate de que la versión de la API de Stripe sea la correcta
    // apiVersion: '2022-11-15',
});

export default defineEventHandler(async (event) => {
    // Manejo de la solicitud
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
        const { bDefault, customerId, token } = body;
        // return {
        //     bDefault,
        //     customerId,
        //     token
        // }

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { token },
        });

        // Asociar el método de pago al cliente
        const attachedPaymentMethod = await stripe.paymentMethods.attach(
            paymentMethod.id,
            { customer: customerId }
        );
        
        if (bDefault) {
            await stripe.customers.update(customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethod.id,
                },
            });
        }

        return {
            success: true,
            paymentMethod,
            attachedPaymentMethod
        };
    } catch (error) {
        console.error('Error attaching payment method to customer:', error);
        return {
            error: 'Error attaching payment method to customer',
            details: error,
        };
    }
})



