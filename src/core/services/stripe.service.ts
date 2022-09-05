import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import configuration from '../config/configuration';

@Injectable()
export default class StripeService {
  async removePlan(stripePlanId: string) {
    return await this.stripe.plans.del(stripePlanId);
  }
  async removeProduct(stripeProductId: string) {
    return await this.stripe.products.del(stripeProductId);
  }
  private stripe: Stripe;

  // Stripe Config
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configuration().stripe.secretKey, {
      apiVersion: '2020-08-27',
    });
  }

  // Customer Create
  async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  // Product Create {service = main package / addons}
  async createProduct(productName: string) {
    return this.stripe.products.create({
      name: productName,
    });
  }

  // Plan Create
  async createPlan(planAmount: number, planInterval: any, productId: string, currencyType: string) {
    return this.stripe.plans.create({
      amount: planAmount,
      currency: currencyType,
      interval: planInterval,
      product: productId,
    });
  }

  // Subcription Create | itemPriceId array - { price: itemPriceId }
  async createSubcription(userStripeId: string, itemPriceId: any) {
    return await this.stripe.subscriptions.create({
      customer: userStripeId,
      items: itemPriceId,
    });
  }

  // Subcription Cancel
  async cancelSubcription(SubId: string) {
    const deleted = await this.stripe.subscriptions.del(SubId);
    if (deleted.status == 'canceled') {
      return true;
    }
    return false;
  }
}
