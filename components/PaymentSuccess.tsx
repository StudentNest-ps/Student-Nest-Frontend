import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-card rounded-xl shadow-lg p-8 text-center max-w-md w-full border border-border"
      >
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-16 h-16 text-primary animate-pulse" />
        </motion.div>

        <h1 className="text-2xl font-bold text-card-foreground mb-2">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your payment. Your booking is now confirmed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
          <Link href="/my-bookings">
            <Button className="w-full sm:w-auto">View My Bookings</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
