'use client';

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import PropertiesTable from './components/properties-table';

function PropertiesPageHeader() {
  return (
    <div>
      <div className="p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-0.5"
        >
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">
              Properties Management
            </h2>
          </div>
          <p className="text-muted-foreground">
            View and manage all property listings in your application
          </p>
        </motion.div>
      </div>
      <PropertiesTable />
    </div>
  );
}

export default PropertiesPageHeader;
