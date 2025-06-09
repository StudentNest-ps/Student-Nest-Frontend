'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export function AccountsPageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-0.5"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            Account Management
          </h2>
        </div>
        <p className="text-muted-foreground">
          Create and manage owner and admin accounts
        </p>
      </motion.div>
    </div>
  );
}
