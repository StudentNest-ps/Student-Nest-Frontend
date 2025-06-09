'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
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

import { toast } from 'sonner';
import { Property } from '@/module/types/Admin';
import { PropertyFormDialog } from './components/property-form-dialog';
import owner from '@/module/services/Owner';
import Loading from './loading';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
];

const initialData: Property = {
  title: '',
  description: '',
  type: '',
  price: 0,
  address: '',
  ownerName: '',
  ownerPhoneNumber: '',
  amenities: [],
  image: '',
  country: '',
  city: '',
  availableFrom: '',
  availableTo: '',
  maxGuests: '',
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await owner.getPropertiesByOwnerId();
        setProperties(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  const itemsPerPage = 5;

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());
    let isPublished = false;
    if (property._id) {
      isPublished = parseInt(property._id) % 3 !== 0;
    }

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && isPublished) ||
      (statusFilter === 'unpublished' && !isPublished);

    return matchesSearch && matchesStatus;
  });

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

  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleAddEditProperty = (property: Property, isEditing: boolean) => {
    if (isEditing) {
      setProperties((prev) =>
        prev.map((p) => (p._id === property._id ? property : p))
      );
      toast.success('Property updated successfully');
    } else {
      const newProperty = {
        ...property,
        _id: Date.now().toString(36),
      };
      setProperties((prev) => [...prev, newProperty]);
      toast.success('Property added successfully');
    }
    setIsFormOpen(false);
    setSelectedProperty(initialData);
  };

  const handleDeleteProperty = async () => {
    if (propertyToDelete) {
      setProperties((prev) => prev.filter((p) => p._id !== propertyToDelete));
      try {
        await owner.deleteProperty(propertyToDelete);
        toast.success('Property deleted successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed deleting property');
      }
      setIsDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

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
    hidden: { opacity: 0, y: 0 },
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
    hidden: { opacity: 0, y: 10 },
    visible: (customDelay: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: customDelay, // delay based on row index or custom number
      },
    }),
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (loading) {
    return <Loading />;
  }

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
              setSelectedProperty(initialData);
              setIsFormOpen(true);
            }}
            size="lg"
            className="cursor-pointer bg-primary hover:bg-primary/90"
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
            <SelectTrigger className="cursor-pointer w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem
                  className="cursor-pointer"
                  key={option.value}
                  value={option.value}
                >
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
                    className="cursor-pointer flex items-center"
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
                    className="cursor-pointer flex items-center"
                  >
                    Location
                    {sortColumn === 'location' && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Address</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('price')}
                    className="cursor-pointer flex items-center"
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
                    className="cursor-pointer flex items-center"
                  >
                    Available Period
                    {sortColumn === 'availableFrom' && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Max Guests</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {paginatedProperties.map((property, index) => {
                  // Format dates without random month addition
                  const availableFrom = new Date(property.availableFrom);
                  const availableTo = new Date(property.availableTo);

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
                      custom={index * 0.1}
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
                      <TableCell>{property.address}</TableCell>

                      <TableCell>
                        <div className="font-medium">${property.price}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {fromDate} - {toDate}
                        </div>
                      </TableCell>
                      <TableCell>{property.maxGuests}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer h-8 w-8"
                            title="Edit property"
                            onClick={() => {
                              setSelectedProperty(property);
                              setIsEditing(true);
                              setIsFormOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer h-8 w-8 text-destructive hover:text-destructive"
                            title="Delete property"
                            onClick={() => {
                              setPropertyToDelete(property._id!);
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
                className="cursor-pointer"
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
                className="cursor-pointer"
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
        isEditing={isEditing}
        onSubmit={(data, isEditing) =>
          handleAddEditProperty(data as Property, isEditing)
        }
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
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
