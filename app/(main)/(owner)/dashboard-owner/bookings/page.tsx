'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import {
  Check,
  X,
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
  LoaderCircle,
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
import StudentProfileModal, {
  StudentBooking,
} from './components/student-profile-modal';
import { BookingStatus, Booking } from '@/module/types/Student';
import owner from '@/module/services/Owner';
import { toast } from 'sonner';
import Image from 'next/image';

interface Property {
  id: string;
  name: string;
}

export default function BookingsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<StudentBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<StudentBooking[]>(
    []
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [propertyFilter, setPropertyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<StudentBooking | null>(
    null
  );
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingApprove, setLoadingApprove] = useState<string | null>(null);
  const [loadingReject, setLoadingReject] = useState<string | null>(null);

  // Convert API booking to StudentBooking format
  //TODO: Utils folder
  const mapBookingToStudentBooking = (booking: Booking): StudentBooking => {
    return {
      id: booking.id,
      propertyId: booking.apartment.id,
      propertyName: booking.apartment.name,
      propertyImage: booking.apartment.image || '',
      studentId: booking.student.id,
      studentName: booking.student.name,
      studentEmail: booking.student.email || '',
      studentPhone: booking.student.phone || '',
      studentUniversity: 'AnNajah National', // This might need to be added to the Student interface if needed
      studentImage: '/placeholder.svg?height=100&width=100', // Student image placeholder
      checkIn: parseISO(booking.checkIn),
      checkOut: parseISO(booking.checkOut),
      status: booking.status,
      createdAt: parseISO(booking.bookingDate),
      notes: `Guests: ${booking.guests}, Total Amount: $${booking.totalAmount}`,
    };
  };

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await owner.getBookings();
        if (data && Array.isArray(data)) {
          const mappedBookings = data.map(mapBookingToStudentBooking);
          setBookings(mappedBookings);
          setFilteredBookings(mappedBookings);

          // Extract unique properties for the filter
          const uniqueProperties = [
            ...new Set(mappedBookings.map((b) => b.propertyId)),
          ].map((id) => {
            const booking = mappedBookings.find((b) => b.propertyId === id);
            return {
              id,
              name: booking?.propertyName || 'Unknown Property',
            };
          });
          setProperties(uniqueProperties);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
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
  const handleStatusChange = async (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    try {
      // Set loading state based on action type
      if (newStatus === BookingStatus.Confirmed) {
        setLoadingApprove(bookingId);
        await owner.approveBooking(bookingId);
      } else if (newStatus === BookingStatus.AlreadyBooked) {
        setLoadingReject(bookingId);
        await owner.rejectBooking(bookingId);
      }

      toast.success('Booking status updated successfully');

      // Update local state
      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      toast.error('Error updating booking status: ' + error);
    } finally {
      // Clear loading states
      setLoadingApprove(null);
      setLoadingReject(null);
    }
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
      case BookingStatus.Confirmed:
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            Confirmed
          </Badge>
        );
      case BookingStatus.AlreadyBooked:
        return (
          <Badge className="bg-sky-500 hover:bg-sky-600">Already Booked</Badge>
        );
      case BookingStatus.Cancelled:
        return (
          <Badge className="bg-rose-500 hover:bg-rose-600">Rejected</Badge>
        );
      case BookingStatus.Pending:
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
            <SelectItem value="confirmed" className="cursor-pointer">
              Confirmed
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
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                        <Image
                          src={
                            booking.propertyImage ||
                            '/placeholder.svg?height=100&width=100'
                          }
                          width={100}
                          height={100}
                          alt={booking.propertyName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{booking.propertyName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openStudentProfile(booking)}
                      className="flex items-center space-x-2 text-foreground hover:bg-primary/40 hover:text-background transition-colors cursor-pointer bg-transparent"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={booking.studentImage || '/placeholder.svg'}
                          alt={booking.studentName}
                        />
                        <AvatarFallback className="bg-primary text-background">
                          {booking.studentName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="underline underline-offset-2">
                        {booking.studentName}
                      </span>
                    </Button>
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
                                    handleStatusChange(
                                      booking.id,
                                      BookingStatus.Confirmed
                                    )
                                  }
                                  disabled={
                                    loadingApprove === booking.id ||
                                    loadingReject === booking.id
                                  }
                                >
                                  {loadingApprove === booking.id ? (
                                    <LoaderCircle className="h-4 w-4 animate-spin text-emerald-600" />
                                  ) : (
                                    <Check className="h-4 w-4 text-emerald-600" />
                                  )}
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
                                    handleStatusChange(
                                      booking.id,
                                      BookingStatus.AlreadyBooked
                                    )
                                  }
                                  disabled={
                                    loadingApprove === booking.id ||
                                    loadingReject === booking.id
                                  }
                                >
                                  {loadingReject === booking.id ? (
                                    <LoaderCircle className="h-4 w-4 animate-spin text-rose-600" />
                                  ) : (
                                    <X className="h-4 w-4 text-rose-600" />
                                  )}
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
                <CardTitle className="text-base font-medium flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                    <Image
                      src={
                        booking.studentImage ||
                        '/placeholder.svg?height=100&width=100'
                      }
                      alt={booking.propertyName}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>{booking.propertyName}</span>
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
                              handleStatusChange(
                                booking.id,
                                BookingStatus.Confirmed
                              )
                            }
                            disabled={
                              loadingApprove === booking.id ||
                              loadingReject === booking.id
                            }
                          >
                            {loadingApprove === booking.id ? (
                              <LoaderCircle className="h-4 w-4 mr-1 animate-spin text-emerald-600" />
                            ) : (
                              <Check className="h-4 w-4 mr-1 text-emerald-600" />
                            )}
                            {loadingApprove === booking.id
                              ? 'Approving...'
                              : 'Approve'}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 cursor-pointer"
                            onClick={() =>
                              handleStatusChange(
                                booking.id,
                                BookingStatus.AlreadyBooked
                              )
                            }
                            disabled={
                              loadingApprove === booking.id ||
                              loadingReject === booking.id
                            }
                          >
                            {loadingReject === booking.id ? (
                              <LoaderCircle className="h-4 w-4 mr-1 animate-spin text-rose-600" />
                            ) : (
                              <X className="h-4 w-4 mr-1 text-rose-600" />
                            )}
                            {loadingReject === booking.id
                              ? 'Rejecting...'
                              : 'Reject'}
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
          onMessage={() => handleSendMessage(selectedStudent.studentId)}
        />
      )}
    </motion.div>
  );
}
