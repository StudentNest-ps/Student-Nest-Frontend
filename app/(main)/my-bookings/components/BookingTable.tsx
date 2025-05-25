"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Star, MapPin } from "lucide-react"
import { Booking } from "../types/booking"


interface BookingTableProps {
  bookings: Booking[]
}

const tableVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const rowVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  hover: {
    backgroundColor: "rgba(var(--primary), 0.05)",
    transition: { duration: 0.2 },
  },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "accepted":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "rejected":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function BookingTable({ bookings }: BookingTableProps) {
  const router = useRouter()

  const handlePayment = (bookingId: string) => {
    router.push(`/payment?booking=${bookingId}`)
  }

  return (
    <motion.div variants={tableVariants} initial="initial" animate="animate" exit="exit">
      <Card className="bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-primary/10">
                  <TableHead className="text-headline font-semibold">Property</TableHead>
                  <TableHead className="text-headline font-semibold">Dates</TableHead>
                  <TableHead className="text-headline font-semibold">Guests</TableHead>
                  <TableHead className="text-headline font-semibold">Amount</TableHead>
                  <TableHead className="text-headline font-semibold">Status</TableHead>
                  <TableHead className="text-headline font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <motion.div variants={staggerContainer} initial="initial" animate="animate">
                  {bookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      variants={rowVariants}
                      whileHover="hover"
                      custom={index}
                      className="border-primary/10"
                      style={{ display: "table-row" }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.apartment.image || "/placeholder.svg"}
                            alt={booking.apartment.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-headline">{booking.apartment.name}</div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {booking.apartment.location}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-muted-foreground">{booking.apartment.rating}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium text-headline">{booking.checkIn}</div>
                          <div className="text-muted-foreground">to {booking.checkOut}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-headline">{booking.guests}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-bold text-primary">${booking.totalAmount}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {booking.status === "accepted" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Button
                              size="sm"
                              onClick={() => handlePayment(booking.id)}
                              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/25"
                            >
                              <CreditCard className="h-3 w-3 mr-1" />
                              Pay Now
                            </Button>
                          </motion.div>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.div>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
