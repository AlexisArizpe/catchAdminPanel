import Stripe from 'stripe';

const stripe = new Stripe(useRuntimeConfig().stripeSecretKey, {

});

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
        const { paymentMethodId, customerId } = body;

        // Asociar el método de pago al cliente
        const attachedPaymentMethod = await stripe.paymentMethods.attach(
            paymentMethodId,
            { customer: customerId }
        );

        // Actualizar el cliente para establecer el método de pago por defecto
        const updatedCustomer = await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        return {
            success: true,
            attachedPaymentMethod,
            updatedCustomer,
        };
    } catch (error) {
        return {
            error: 'Error attaching payment method to customer',
            details: error,
        };
    }
});
