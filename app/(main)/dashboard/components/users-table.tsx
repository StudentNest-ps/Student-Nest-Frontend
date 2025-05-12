'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import DeleteUserButton from './delete-user-button';

// Mock data for demonstration
const users = [
  {
    id: 'USR001',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
  },
  {
    id: 'USR002',
    username: 'janedoe',
    email: 'jane.doe@example.com',
    phoneNumber: '+1 (555) 987-6543',
  },
  {
    id: 'USR003',
    username: 'mikebrown',
    email: 'mike.brown@example.com',
    phoneNumber: '+1 (555) 456-7890',
  },
  {
    id: 'USR004',
    username: 'sarahsmith',
    email: 'sarah.smith@example.com',
    phoneNumber: '+1 (555) 234-5678',
  },
  {
    id: 'USR005',
    username: 'alexjohnson',
    email: 'alex.johnson@example.com',
    phoneNumber: '+1 (555) 876-5432',
  },
  {
    id: 'USR006',
    username: 'emilywilson',
    email: 'emily.wilson@example.com',
    phoneNumber: '+1 (555) 345-6789',
  },
  {
    id: 'USR007',
    username: 'davidmiller',
    email: 'david.miller@example.com',
    phoneNumber: '+1 (555) 654-3210',
  },
];

export default function UsersTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} of {users.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2 rounded-md border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="border-0 p-0 shadow-none focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: 'easeOut',
                      }}
                      className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                    >
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell className="text-right">
                        <DeleteUserButton userId={user.id} />
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
