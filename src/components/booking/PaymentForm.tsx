import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Calendar, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  expiryDate: z.string().min(5, "Expiry date is required"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
});

interface PaymentFormProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  isProcessing?: boolean;
  totalAmount?: number;
}

const PaymentForm = ({
  onSubmit = () => {},
  isProcessing = false,
  totalAmount = 25.0,
}: PaymentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate payment processing
    setTimeout(() => {
      onSubmit(values);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Information</CardTitle>
        <CardDescription>
          Enter your card details to complete your booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...field}
                        className="pl-10"
                      />
                    </FormControl>
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="MM/YY"
                          {...field}
                          className="pl-10"
                        />
                      </FormControl>
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="123"
                          type="password"
                          {...field}
                          className="pl-10"
                        />
                      </FormControl>
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium">
                  ${(totalAmount * 0.9).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Tax</span>
                <span className="text-sm font-medium">
                  ${(totalAmount * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isSubmitting || isProcessing}
            >
              {isSubmitting || isProcessing
                ? "Processing..."
                : `Pay $${totalAmount.toFixed(2)}`}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-gray-100 pt-4">
        <div className="text-xs text-gray-500 text-center">
          <p>Your payment information is encrypted and secure.</p>
          <div className="flex justify-center space-x-2 mt-2">
            <img
              src="/visa.svg"
              alt="Visa"
              className="h-6 w-auto"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <img
              src="/mastercard.svg"
              alt="Mastercard"
              className="h-6 w-auto"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <img
              src="/amex.svg"
              alt="American Express"
              className="h-6 w-auto"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
