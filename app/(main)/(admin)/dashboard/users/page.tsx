'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import UsersTable from './components/users-table';

function UsersPageHeader() {
  return (
    <div>
      <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-0.5 w-full"
        >
          <div className="flex items-center gap-2 ">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-center md:text-start">
              Users Management
            </h2>
          </div>
          <p className="text-muted-foreground text-center md:text-start">
            View and manage all users in your application
          </p>
        </motion.div>
      </div>
      <UsersTable />
    </div>
  );
}

export default UsersPageHeader;
