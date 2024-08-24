// server/api/payment-methods.ts
import Stripe from 'stripe';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const stripe = new Stripe(config.stripeSecretKey, {
        // apiVersion: '2020-08-27',
    });

    const query = getQuery(event);
    const customerId = query.customerId as string;

    try {
        // Obtener los métodos de pago del cliente
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });

        // Obtener la configuración del cliente
        const customer = await stripe.customers.retrieve(customerId);
        const defaultPaymentMethodId = (customer.invoice_settings as any)?.default_payment_method as string;
        
        // Marcar el método de pago predeterminado
        paymentMethods.data.forEach((method) => {
            (method as any).isDefault = method.id === defaultPaymentMethodId;
        });

        return paymentMethods.data;
    } catch (error) {
        return {
            error: (error as Error).message,
        };
    }
});
