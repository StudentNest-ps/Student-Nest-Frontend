'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Building,
  Bed,
  Bath,
  MapPin,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

import { toast } from 'sonner';
import { Property } from '@/module/types/Admin';
import { PropertyFormDialog } from './components/property-form-dialog';

// Sample property data
const sampleProperties: Property[] = [
  {
    _id: '1',
    title: 'Modern Studio Apartment',
    description:
      'A cozy studio apartment close to An-Najah National University, perfect for students.',
    type: 'studio',
    price: 350,
    address: '123 University St, Nablus',
    ownerName: 'Ahmad Khalid',
    ownerPhoneNumber: '+970 59 123 4567',
    amenities: ['wifi', 'ac', 'furnished'],
    country: 'Palestine',
    images: ['/placeholder.svg?height=100&width=100'],
    city: 'Nablus',
    availableFrom: '2023-09-01',
    availableTo: '2023-12-31',
    maxGuests: '1',
  },
  {
    _id: '2',
    title: 'Spacious 2-Bedroom Apartment',
    description:
      'A spacious 2-bedroom apartment with a balcony and great views of the city.',
    type: 'apartment',
    price: 550,
    address: '456 College Ave, Ramallah',
    ownerName: 'Layla Ibrahim',
    ownerPhoneNumber: '+970 59 234 5678',
    amenities: ['wifi', 'parking', 'furnished', 'balcony'],
    country: 'Palestine',
    images: ['/placeholder.svg?height=100&width=100'],
    city: 'Ramallah',
    availableFrom: '2023-08-15',
    availableTo: '2023-12-31',
    maxGuests: '4',
  },
  {
    _id: '3',
    title: 'Cozy 1-Bedroom Apartment',
    description:
      'A cozy 1-bedroom apartment with modern amenities, walking distance to campus.',
    type: 'apartment',
    price: 400,
    address: '789 Campus Rd, Ramallah',
    ownerName: 'Omar Nasser',
    ownerPhoneNumber: '+970 59 345 6789',
    amenities: ['wifi', 'ac', 'furnished', 'tv'],
    country: 'Palestine',
    images: ['/placeholder.svg?height=100&width=100'],
    city: 'Ramallah',
    availableFrom: '2023-09-01',
    availableTo: '2023-12-31',
    maxGuests: '2',
  },
  {
    _id: '4',
    title: 'Luxury 3-Bedroom Condo',
    description:
      'A luxury 3-bedroom condo with high-end finishes and amenities.',
    type: 'condo',
    price: 800,
    address: '101 Luxury Lane, Ramallah',
    ownerName: 'Nour Haddad',
    ownerPhoneNumber: '+970 59 456 7890',
    amenities: ['wifi', 'parking', 'furnished', 'gym', 'pool'],
    country: 'Palestine',
    images: ['/placeholder.svg?height=100&width=100'],
    city: 'Ramallah',
    availableFrom: '2023-10-01',
    availableTo: '2023-12-31',
    maxGuests: '6',
  },
  {
    _id: '5',
    title: 'Student-Friendly Studio',
    description: 'A budget-friendly studio apartment perfect for students.',
    type: 'studio',
    price: 300,
    address: '202 Student Lane, Bethlehem',
    ownerName: 'Rami Khoury',
    ownerPhoneNumber: '+970 59 567 8901',
    amenities: ['wifi', 'furnished'],
    country: 'Palestine',
    images: ['/placeholder.svg?height=100&width=100'],
    city: 'Bethlehem',
    availableFrom: '2023-09-15',
    availableTo: '2023-12-31',
    maxGuests: '1',
  },
];

// Status options
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const itemsPerPage = 5;

  // Filter and sort properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && Math.random() > 0.3) || // Mock published status
      (statusFilter === 'unpublished' && Math.random() <= 0.3); // Mock unpublished status

    return matchesSearch && matchesStatus;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (!sortColumn) return 0;

    let valueA, valueB;

    switch (sortColumn) {
      case 'title':
        valueA = a.title;
        valueB = b.title;
        break;
      case 'location':
        valueA = a.city;
        valueB = b.city;
        break;
      case 'price':
        valueA = a.price;
        valueB = b.price;
        break;
      case 'availableFrom':
        valueA = new Date(a.availableFrom).getTime();
        valueB = new Date(b.availableFrom).getTime();
        break;
      default:
        return 0;
    }

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate properties
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle add/edit property
  const handleAddEditProperty = (property: Property) => {
    if (property._id) {
      // Edit existing property
      setProperties((prev) =>
        prev.map((p) => (p._id === property._id ? property : p))
      );
      toast.success('Property updated successfully');
    } else {
      // Add new property
      const newProperty = {
        ...property,
        _id: Math.random().toString(36).substring(2, 9),
      };
      setProperties((prev) => [...prev, newProperty]);
      toast.success('Property added successfully');
    }
    setIsFormOpen(false);
    setSelectedProperty(null);
  };

  // Handle delete property
  const handleDeleteProperty = () => {
    if (propertyToDelete) {
      setProperties((prev) => prev.filter((p) => p._id !== propertyToDelete));
      toast.success('Property deleted successfully');
      setIsDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
            <p className="text-muted-foreground mt-1">
              Manage your student housing properties
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedProperty(null);
              setIsFormOpen(true);
            }}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Properties Table */}
        <motion.div
          variants={itemVariants}
          className="rounded-md border bg-card"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('title')}
                    className="flex items-center"
                  >
                    Property
                    {sortColumn === 'title' && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('location')}
                    className="flex items-center"
                  >
                    Location
                    {sortColumn === 'location' && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('price')}
                    className="flex items-center"
                  >
                    Rent/month
                    {sortColumn === 'price' && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('availableFrom')}
                    className="flex items-center"
                  >
                    Available Period
                    {sortColumn === 'availableFrom' && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {paginatedProperties.map((property) => {
                  // Mock status
                  const status =
                    Math.random() > 0.3 ? 'published' : 'unpublished';

                  // Mock available period
                  const availableFrom = new Date(property.availableFrom);
                  const availableTo = new Date(property.availableTo);
                  availableTo.setMonth(
                    availableTo.getMonth() + Math.floor(Math.random() * 12) + 1
                  );

                  // Format dates
                  const fromDate = new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(availableFrom);

                  const toDate = new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(availableTo);

                  // Get property details
                  const bedsCount =
                    property.type === 'studio'
                      ? 0
                      : property.type === 'apartment'
                        ? property.title.includes('1-Bedroom')
                          ? 1
                          : property.title.includes('2-Bedroom')
                            ? 2
                            : property.title.includes('3-Bedroom')
                              ? 3
                              : 1
                        : property.title.includes('3-Bedroom')
                          ? 3
                          : 1;

                  const bathsCount =
                    property.type === 'studio'
                      ? 1
                      : property.type === 'apartment'
                        ? 1
                        : property.title.includes('3-Bedroom')
                          ? 2
                          : 1;

                  return (
                    <motion.tr
                      key={property._id}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="group"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <Building className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-3">
                              <span>{property.type}</span>
                              <span className="flex items-center">
                                <Bed className="h-3 w-3 mr-1" />
                                {bedsCount} bed
                              </span>
                              <span className="flex items-center">
                                <Bath className="h-3 w-3 mr-1" />
                                {bathsCount} bath
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{property.city}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${property.price}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {fromDate} - {toDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            status === 'published' ? 'default' : 'outline'
                          }
                          className={
                            status === 'published'
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'text-amber-500 border-amber-500'
                          }
                        >
                          {status === 'published' ? 'Published' : 'Unpublished'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="View property"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit property"
                            onClick={() => {
                              setSelectedProperty(property);
                              setIsFormOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            title="Delete property"
                            onClick={() => {
                              setPropertyToDelete(property._id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>

              {paginatedProperties.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No properties found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, sortedProperties.length)} of{' '}
              {sortedProperties.length} properties
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Property Form Dialog */}
      <PropertyFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={selectedProperty}
        isEditing={!!selectedProperty}
        onSubmit={(data) => handleAddEditProperty(data as Property)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
