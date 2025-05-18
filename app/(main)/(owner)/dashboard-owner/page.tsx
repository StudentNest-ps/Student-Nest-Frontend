'use client';
import { motion } from 'framer-motion';
import {
  Building,
  Calendar,
  DollarSign,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

const summaryData = [
  {
    title: 'Total Properties',
    value: '12',
    icon: Building,
    color: 'bg-teal-500',
    increase: '+2 from last month',
  },
  {
    title: 'Total Bookings',
    value: '48',
    icon: Calendar,
    color: 'bg-amber-500',
    increase: '+5 from last month',
  },
  {
    title: 'Earnings (This Month)',
    value: '$4,320',
    icon: DollarSign,
    color: 'bg-rose-500',
    increase: '+12% from last month',
  },
  {
    title: 'Pending Requests',
    value: '7',
    icon: Clock,
    color: 'bg-indigo-500',
    increase: '3 new requests',
  },
];


const recentBookings = [
  {
    id: 1,
    propertyName: 'Sunrise Apartment',
    studentName: 'Ahmed Khalid',
    checkInDate: '2023-09-01',
    status: 'Approved',
  },
  {
    id: 2,
    propertyName: 'City View Studio',
    studentName: 'Layla Mahmoud',
    checkInDate: '2023-09-15',
    status: 'Pending',
  },
  {
    id: 3,
    propertyName: 'Garden Condo',
    studentName: 'Omar Farooq',
    checkInDate: '2023-10-01',
    status: 'Pending',
  },
  {
    id: 4,
    propertyName: 'Mountain View Apartment',
    studentName: 'Nour Hassan',
    checkInDate: '2023-09-10',
    status: 'Rejected',
  },
  {
    id: 5,
    propertyName: 'Downtown Studio',
    studentName: 'Yara Ahmed',
    checkInDate: '2023-10-05',
    status: 'Pending',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export default function OwnerDashboard() {
  return (
    <motion.div
      className="p-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Dashboard Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your properties today.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        {summaryData.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full shadow-md border-0 bg-white dark:bg-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                    <item.icon
                      className={`h-5 w-5 ${item.color.replace('bg-', 'text-')}`}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.increase}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Booking Requests */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Recent Booking Requests
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
              >
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Property Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Student Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Check-In Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <td className="py-3 px-4">{booking.propertyName}</td>
                      <td className="py-3 px-4">{booking.studentName}</td>
                      <td className="py-3 px-4">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            booking.status === 'Approved' &&
                              'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800/30',
                            booking.status === 'Pending' &&
                              'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30',
                            booking.status === 'Rejected' &&
                              'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30'
                          )}
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
