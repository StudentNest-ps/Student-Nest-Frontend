'use client';
import { format } from 'date-fns';
import {
  MessageSquare,
  Mail,
  Phone,
  School,
  Calendar,
  Home,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookingStatus } from '@/module/types/Student';

// Define the student booking type
export interface StudentBooking {
  id: string;
  propertyId: string;
  propertyName: string;
  studentId: string;
  propertyImage: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentUniversity: string;
  studentImage: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  createdAt: Date;
  notes?: string;
}

// Define the component props
interface StudentProfileModalProps {
  student: StudentBooking;
  isOpen: boolean;
  onClose: () => void;
  onMessage: () => void;
}

export default function StudentProfileModal({
  student,
  isOpen,
  onClose,

  onMessage,
}: StudentProfileModalProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
          <DialogDescription>Booking request details</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          {/* Student Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={student.studentImage || '/placeholder.svg'}
                alt={student.studentName}
              />
              <AvatarFallback>
                {student.studentName
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{student.studentName}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <School className="h-3.5 w-3.5 mr-1" />
                {student.studentUniversity}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>{student.studentEmail}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>{student.studentPhone}</span>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-background p-3 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Booking Details</h4>
              {getStatusBadge(student.status)}
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-2 text-gray-500" />
                <span>{student.propertyName}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                <span>Check-in: {format(student.checkIn, 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-rose-600" />
                <span>
                  Check-out: {format(student.checkOut, 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            {student.notes && (
              <div className="mt-2 text-sm text-gray-600 border-t pt-2">
                <p className="italic">{student.notes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={() => {
                onMessage();
                onClose();
              }}
            >
              <MessageSquare className="h-4 w-4 mr-1 text-teal-600" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
