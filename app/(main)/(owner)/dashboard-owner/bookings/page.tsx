'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  Check,
  X,
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import StudentProfileModal, { StudentBooking } from './components/student-profile-modal';

// Define property type for the filter
interface Property {
  id: string;
  name: string;
}

// Define status type
type BookingStatus = 'pending' | 'approved' | 'rejected';

// Sample data for bookings
const bookingsData: StudentBooking[] = [
  {
    id: '1',
    propertyId: 'prop1',
    propertyName: 'Cozy Apartment near City Center',
    studentId: 'stud1',
    studentName: 'Ahmed Khalil',
    studentEmail: 'ahmed.k@example.com',
    studentPhone: '+970 59 123 4567',
    studentUniversity: 'Birzeit University',
    studentImage: '/placeholder.svg?height=100&width=100',
    checkIn: new Date('2023-09-01'),
    checkOut: new Date('2024-06-30'),
    status: 'pending',
    createdAt: new Date('2023-08-15'),
    notes: 'First-year student looking for accommodation near campus',
  },
  {
    id: '2',
    propertyId: 'prop2',
    propertyName: 'Modern Studio in Downtown',
    studentId: 'stud2',
    studentName: 'Layla Omar',
    studentEmail: 'layla.o@example.com',
    studentPhone: '+970 59 987 6543',
    studentUniversity: 'Al-Quds University',
    studentImage: '/placeholder.svg?height=100&width=100',
    checkIn: new Date('2023-08-15'),
    checkOut: new Date('2024-05-30'),
    status: 'approved',
    createdAt: new Date('2023-07-20'),
    notes: 'Graduate student, quiet and studious',
  },
  {
    id: '3',
    propertyId: 'prop3',
    propertyName: 'Spacious 2BR near Al-Quds University',
    studentId: 'stud3',
    studentName: 'Mahmoud Nasser',
    studentEmail: 'mahmoud.n@example.com',
    studentPhone: '+970 59 456 7890',
    studentUniversity: 'Al-Quds University',
    studentImage: '/placeholder.svg?height=100&width=100',
    checkIn: new Date('2023-09-01'),
    checkOut: new Date('2024-06-15'),
    status: 'rejected',
    createdAt: new Date('2023-08-05'),
    notes: 'Looking to share with a roommate',
  },
  {
    id: '4',
    propertyId: 'prop1',
    propertyName: 'Cozy Apartment near City Center',
    studentId: 'stud4',
    studentName: 'Nour Haddad',
    studentEmail: 'nour.h@example.com',
    studentPhone: '+970 59 234 5678',
    studentUniversity: 'Birzeit University',
    studentImage: '/placeholder.svg?height=100&width=100',
    checkIn: new Date('2023-09-15'),
    checkOut: new Date('2024-07-01'),
    status: 'pending',
    createdAt: new Date('2023-08-10'),
    notes: 'Third-year engineering student',
  },
  {
    id: '5',
    propertyId: 'prop4',
    propertyName: 'Luxury Condo with Mountain View',
    studentId: 'stud5',
    studentName: 'Rami Ayyad',
    studentEmail: 'rami.a@example.com',
    studentPhone: '+970 59 345 6789',
    studentUniversity: 'An-Najah National University',
    studentImage: '/placeholder.svg?height=100&width=100',
    checkIn: new Date('2023-08-20'),
    checkOut: new Date('2024-06-20'),
    status: 'approved',
    createdAt: new Date('2023-07-25'),
    notes: 'Medical student, needs quiet study environment',
  },
  {
    id: '6',
    propertyId: 'prop2',
    propertyName: 'Modern Studio in Downtown',
    studentId: 'stud6',
    studentName: 'Samira Khoury',
    studentEmail: 'samira.k@example.com',
    studentPhone: '+970 59 876 5432',
    studentUniversity: 'Bethlehem University',
    studentImage: '/placeholder.svg?height=100&width=100',
    checkIn: new Date('2023-09-05'),
    checkOut: new Date('2024-05-25'),
    status: 'pending',
    createdAt: new Date('2023-08-12'),
    notes: 'International student from Jordan',
  },
];

// Get unique properties for the filter
const properties: Property[] = [
  ...new Set(bookingsData.map((booking) => booking.propertyName)),
].map((name) => ({
  id: bookingsData.find((b) => b.propertyName === name)?.propertyId || '',
  name,
}));

export default function BookingsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<StudentBooking[]>(bookingsData);
  const [filteredBookings, setFilteredBookings] = useState<StudentBooking[]>(bookingsData);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [propertyFilter, setPropertyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<StudentBooking | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter bookings when filters change
  useEffect(() => {
    let filtered = bookings;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Apply property filter
    if (propertyFilter !== 'all') {
      filtered = filtered.filter(
        (booking) => booking.propertyId === propertyFilter
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.studentName.toLowerCase().includes(query) ||
          booking.propertyName.toLowerCase().includes(query)
      );
    }

    setFilteredBookings(filtered);
  }, [statusFilter, propertyFilter, searchQuery, bookings]);

  // Handle booking status change
  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    // In a real app, you would call an API here
    console.log(`Changing booking ${bookingId} status to ${newStatus}`);

    // Update local state
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
  };

  // Handle sending a message
  const handleSendMessage = (studentId: string) => {
    // In a real app, you would open a messaging interface
    console.log(`Opening message dialog for student ${studentId}`);
  };

  // Open student profile
  const openStudentProfile = (student: StudentBooking) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };

  // Get status badge color
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-rose-500 hover:bg-rose-600">Rejected</Badge>
        );
      case 'pending':
      default:
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>
        );
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  // Toggle mobile row expansion
  const toggleRowExpansion = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Booking Requests
            </CardTitle>
            <CardDescription>
              Manage booking requests from students for your properties
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={itemVariants}
      >
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search by student or property..."
            className="pl-10 cursor-pointer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="cursor-pointer">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              All Statuses
            </SelectItem>
            <SelectItem value="pending" className="cursor-pointer">
              Pending
            </SelectItem>
            <SelectItem value="approved" className="cursor-pointer">
              Approved
            </SelectItem>
            <SelectItem value="rejected" className="cursor-pointer">
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={propertyFilter} onValueChange={setPropertyFilter}>
          <SelectTrigger className="cursor-pointer">
            <SelectValue placeholder="Filter by property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              All Properties
            </SelectItem>
            {properties.map((property) => (
              <SelectItem
                key={property.id}
                value={property.id}
                className="cursor-pointer"
              >
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Bookings Table - Desktop */}
      <motion.div
        className="hidden md:block rounded-md border overflow-hidden"
        variants={itemVariants}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Check-in / Check-out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeletons
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-10 w-32" />
                    </TableCell>
                  </TableRow>
                ))
            ) : filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No bookings found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.propertyName}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => openStudentProfile(booking)}
                      className="flex items-center space-x-2 hover:text-teal-600 transition-colors cursor-pointer"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={booking.studentImage || '/placeholder.svg'}
                          alt={booking.studentName}
                        />
                        <AvatarFallback>
                          {booking.studentName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="underline underline-offset-2">
                        {booking.studentName}
                      </span>
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1 text-teal-600" />
                        {format(booking.checkIn, 'MMM d, yyyy')}
                      </span>
                      <span className="text-gray-500">to</span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1 text-rose-600" />
                        {format(booking.checkOut, 'MMM d, yyyy')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-9 w-9 p-0 cursor-pointer"
                                  onClick={() =>
                                    handleStatusChange(booking.id, 'approved')
                                  }
                                >
                                  <Check className="h-4 w-4 text-emerald-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Approve Request</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-9 w-9 p-0 cursor-pointer"
                                  onClick={() =>
                                    handleStatusChange(booking.id, 'rejected')
                                  }
                                >
                                  <X className="h-4 w-4 text-rose-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reject Request</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </>
                      )}

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-9 w-9 p-0 cursor-pointer"
                              onClick={() =>
                                handleSendMessage(booking.studentId)
                              }
                            >
                              <MessageSquare className="h-4 w-4 text-teal-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Message Student</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Bookings Cards - Mobile */}
      <motion.div className="md:hidden space-y-4" variants={itemVariants}>
        {isLoading ? (
          // Loading skeletons for mobile
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={`mobile-skeleton-${index}`} className="w-full">
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
        ) : filteredBookings.length === 0 ? (
          <Card className="w-full">
            <CardContent className="text-center py-8 text-gray-500">
              No bookings found matching your filters
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={`mobile-${booking.id}`} className="w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  {booking.propertyName}
                </CardTitle>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openStudentProfile(booking)}
                    className="flex items-center space-x-2 hover:text-teal-600 transition-colors cursor-pointer"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={booking.studentImage || '/placeholder.svg'}
                        alt={booking.studentName}
                      />
                      <AvatarFallback>
                        {booking.studentName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="underline underline-offset-2 text-sm">
                      {booking.studentName}
                    </span>
                  </button>
                  {getStatusBadge(booking.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-3 pt-0">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1 text-teal-600" />
                      {format(booking.checkIn, 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1 text-rose-600" />
                      {format(booking.checkOut, 'MMM d, yyyy')}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-8 w-8 cursor-pointer"
                    onClick={() => toggleRowExpansion(booking.id)}
                  >
                    {expandedRow === booking.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                </div>

                {expandedRow === booking.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-2 border-t"
                  >
                    <div className="text-sm text-gray-500 mb-2">
                      {booking.notes}
                    </div>
                    <div className="flex space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 cursor-pointer"
                            onClick={() =>
                              handleStatusChange(booking.id, 'approved')
                            }
                          >
                            <Check className="h-4 w-4 mr-1 text-emerald-600" />
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 cursor-pointer"
                            onClick={() =>
                              handleStatusChange(booking.id, 'rejected')
                            }
                          >
                            <X className="h-4 w-4 mr-1 text-rose-600" />
                            Reject
                          </Button>
                        </>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 cursor-pointer"
                        onClick={() => handleSendMessage(booking.studentId)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1 text-teal-600" />
                        Message
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </motion.div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onApprove={() => handleStatusChange(selectedStudent.id, 'approved')}
          onReject={() => handleStatusChange(selectedStudent.id, 'rejected')}
          onMessage={() => handleSendMessage(selectedStudent.studentId)}
        />
      )}
    </motion.div>
  );
}
