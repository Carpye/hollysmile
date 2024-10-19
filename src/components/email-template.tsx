import * as React from 'react';
import { ShippingFormInputs } from './checkout';
import Stripe from 'stripe';
import { Product, Variant } from '@prisma/client';

interface EmailTemplateProps {
  shippingInfo: ShippingFormInputs;
  productDetails: (Variant & { product: Product, quantity: number } )[]
}

export const CustomerEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  shippingInfo,
  productDetails
}) => (
  <div>
    <h1 className='text-blue-500'>Dziękujemy za złożenie zamówienia!</h1>
    <p>Twoje zamówienie zostało przyjęte i jest w trakcie realizacji.</p>
    <p>Dane zamówienia:</p>
    <ul>
      <li>Email: {shippingInfo.email}</li>
      <li>Miasto: {shippingInfo.city}</li>
      <li>Kod paczkomatu InPost: {shippingInfo.inPostCode}</li>
      <li>Numer telefonu: {shippingInfo.phoneNumber}</li>
    </ul>
    <p>Zamówione produkty:</p>
    <ul>
      {productDetails.map((item, index) => (
        <li key={index}>
          <p>Nazwa: {item.product.name}</p>
          <p>Kolor: {item.name}</p>
          <p>Ilość: {item.quantity}</p>
          <p>Cena: {item.product.price} zł</p>
        </li>
      ))}
    </ul>
    <p>Całkowita wartość zamówienia: {productDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0)} zł</p>
    <p>Dziękujemy za zakupy w Holly Smile!</p>
  </div>
);

export const OwnerEmailTemplate: React.FC<Readonly<EmailTemplateProps & {sessionData: Stripe.Checkout.Session}>> =({
  shippingInfo,
  sessionData,
  productDetails
}) => (
  <div>
    <h1>Nowe zamówienie z Holly Smile</h1>
    <p>Numer zamówienia: {sessionData.id}</p>
    <p>Informacje kupującego:</p>
    <ul>
      <li>Email: {shippingInfo.email}</li>
      <li>Miasto: {shippingInfo.city}</li>
      <li>Kod paczkomatu InPost: {shippingInfo.inPostCode}</li>
      <li>Numer telefonu: {shippingInfo.phoneNumber}</li>
    </ul>
    <p>Zamówione produkty:</p>
    <ul>
      {productDetails.map((item, index) => (
        <li key={index}>
          <p>Nazwa: {item.product.name}</p>
          <p>Kolor: {item.name}</p>
          <p>Ilość: {item.quantity}</p>
          <p>Cena: {item.product.price} zł</p>
        </li>
      ))}
    </ul>
    <p>Całkowita wartość zamówienia: {productDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0)} zł</p>
  </div>
)