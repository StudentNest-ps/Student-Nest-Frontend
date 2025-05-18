'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PropertyFormDialog } from './components/property-form-dialog';

// Sample property data
const properties = [
  {
    id: 'prop-1',
    _id: '6809340ea030eb703c203696',
    title: 'Modern Studio Apartment',
    location: {
      city: 'Nablus',
      country: 'Palestine',
    },
    address: 'Near An-Najah University, Nablus',
    image: '/placeholder.svg?height=80&width=120',
    images: ['/placeholder.svg?height=300&width=400&text=Property+Image+1'],
    rent: 350,
    price: 350,
    availability: {
      availableFrom: '2023-09-01',
      availableTo: '2024-06-30',
    },
    status: 'Published',
    type: 'studio',
    description:
      'A cozy studio apartment, perfect for students at An-Najah University.',
    amenities: ['wifi', 'ac', 'furnished'],
    blockedDates: ['2023-12-24', '2023-12-25', '2023-12-31', '2024-01-01'],
    ownerId: '6809371f0c4d1230d7294b99',
    createdAt: '2023-04-23T20:31:10.673+00:00',
    updatedAt: '2023-05-07T08:17:58.133+00:00',
    bedrooms: 0,
    bathrooms: 1,
  },
  {
    id: 'prop-2',
    _id: '6809340ea030eb703c203697',
    title: 'Spacious 2-Bedroom Apartment',
    location: {
      city: 'Ramallah',
      country: 'Palestine',
    },
    address: 'Downtown Ramallah, 5 min from Birzeit University',
    image: '/placeholder.svg?height=80&width=120',
    images: [
      '/placeholder.svg?height=300&width=400&text=Property+Image+1',
      '/placeholder.svg?height=300&width=400&text=Property+Image+2',
    ],
    rent: 550,
    price: 550,
    availability: {
      availableFrom: '2023-08-15',
      availableTo: '2024-07-31',
    },
    status: 'Published',
    type: 'apartment',
    description:
      'A spacious 2-bedroom apartment in downtown Ramallah, perfect for students or young professionals.',
    amenities: ['wifi', 'ac', 'heating', 'washer', 'parking'],
    blockedDates: [],
    ownerId: '6809371f0c4d1230d7294b99',
    createdAt: '2023-04-23T20:31:10.673+00:00',
    updatedAt: '2023-05-07T08:17:58.133+00:00',
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: 'prop-3',
    _id: '6809340ea030eb703c203698',
    title: 'Cozy 1-Bedroom Apartment',
    location: {
      city: 'Ramallah',
      country: 'Palestine',
    },
    address: 'Al-Tireh, Ramallah',
    image: '/placeholder.svg?height=80&width=120',
    images: ['/placeholder.svg?height=300&width=400&text=Property+Image+1'],
    rent: 400,
    price: 400,
    availability: {
      availableFrom: '2023-09-01',
      availableTo: '2024-08-31',
    },
    status: 'Unpublished',
    type: 'apartment',
    description:
      'A cozy 1-bedroom apartment in Al-Tireh, perfect for students or young professionals.',
    amenities: ['wifi', 'ac', 'furnished'],
    blockedDates: [],
    ownerId: '6809371f0c4d1230d7294b99',
    createdAt: '2023-04-23T20:31:10.673+00:00',
    updatedAt: '2023-05-07T08:17:58.133+00:00',
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: 'prop-4',
    _id: '6809340ea030eb703c203699',
    title: 'Luxury 3-Bedroom Condo',
    location: {
      city: 'Ramallah',
      country: 'Palestine',
    },
    address: 'Al-Masyoun, Ramallah',
    image: '/placeholder.svg?height=80&width=120',
    images: [
      '/placeholder.svg?height=300&width=400&text=Property+Image+1',
      '/placeholder.svg?height=300&width=400&text=Property+Image+2',
    ],
    rent: 800,
    price: 800,
    availability: {
      availableFrom: '2023-10-01',
      availableTo: '2024-09-30',
    },
    status: 'Published',
    type: 'condo',
    description:
      'A luxury 3-bedroom condominium in Al-Masyoun, perfect for families or groups of students.',
    amenities: [
      'wifi',
      'ac',
      'heating',
      'washer',
      'dryer',
      'parking',
      'gym',
      'pool',
      'security',
    ],
    blockedDates: [],
    ownerId: '6809371f0c4d1230d7294b99',
    createdAt: '2023-04-23T20:31:10.673+00:00',
    updatedAt: '2023-05-07T08:17:58.133+00:00',
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 'prop-5',
    _id: '6809340ea030eb703c20369a',
    title: 'Student-Friendly Studio',
    location: {
      city: 'Bethlehem',
      country: 'Palestine',
    },
    address: 'Near Bethlehem University',
    image: '/placeholder.svg?height=80&width=120',
    images: ['/placeholder.svg?height=300&width=400&text=Property+Image+1'],
    rent: 300,
    price: 300,
    availability: {
      availableFrom: '2023-09-15',
      availableTo: '2024-06-15',
    },
    status: 'Unpublished',
    type: 'studio',
    description:
      'A student-friendly studio near Bethlehem University, perfect for students.',
    amenities: ['wifi', 'furnished'],
    blockedDates: [],
    ownerId: '6809371f0c4d1230d7294b99',
    createdAt: '2023-04-23T20:31:10.673+00:00',
    updatedAt: '2023-05-07T08:17:58.133+00:00',
    bedrooms: 0,
    bathrooms: 1,
  },
];

export default function MyPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const itemsPerPage = 5;

  // Filter properties based on search term and status
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      property.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sort properties if sortConfig is set
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;

    if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
      return direction === 'ascending' ? -1 : 1;
    }
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
      return direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Paginate properties
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = sortedProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);

  const handleDeleteClick = (id: string) => {
    setPropertyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, you would delete the property here
    console.log(`Deleting property ${propertyToDelete}`);
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setFormDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setFormDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (data: any) => {
    if (data.id || data._id) {
      // Editing existing property
      console.log('Updating property:', data);
      // Here you would update the property in your database
    } else {
      // Adding new property
      console.log('Adding new property:', data);
      // Here you would add the property to your database
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
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="my-properties"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="p-6 w-full"
      >
        {/* Page Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Properties</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your student housing properties
            </p>
          </div>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleAddProperty}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search properties..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Properties Table */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <button
                        className="flex items-center"
                        onClick={() => handleSort('title')}
                      >
                        Property
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Location
                    </TableHead>
                    <TableHead>
                      <button
                        className="flex items-center"
                        onClick={() => handleSort('price')}
                      >
                        Rent/month
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Available Period
                    </TableHead>
                    <TableHead>
                      <button
                        className="flex items-center"
                        onClick={() => handleSort('status')}
                      >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {currentProperties.length > 0 ? (
                      currentProperties.map((property) => (
                        <motion.tr
                          key={property.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                <Image
                                  src={property.image || '/placeholder.svg'}
                                  alt={property.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {property.title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {property.type} • {property.bedrooms} bed •{' '}
                                  {property.bathrooms} bath
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div
                              className="max-w-[200px] truncate"
                              title={property.address}
                            >
                              {property.address}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${property.price}</div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="text-sm">
                              {formatDate(property.availability.availableFrom)}{' '}
                              - {formatDate(property.availability.availableTo)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                property.status === 'Published'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              }
                            >
                              {property.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditProperty(property)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleDeleteClick(property.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>

                              {/* Mobile dropdown for smaller screens */}
                              <div className="sm:hidden">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 lg:hidden"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">More</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleEditProperty(property)
                                      }
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeleteClick(property.id)
                                      }
                                      className="text-red-500"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <Building className="h-12 w-12 mb-2 opacity-30" />
                            <p className="text-lg font-medium">
                              No properties found
                            </p>
                            <p className="text-sm">
                              {searchTerm || statusFilter !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Add your first property to get started'}
                            </p>
                            {!searchTerm && statusFilter === 'all' && (
                              <Button
                                className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                                onClick={handleAddProperty}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Property
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>

        {/* Pagination */}
        {sortedProperties.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstItem + 1} to{' '}
              {Math.min(indexOfLastItem, sortedProperties.length)} of{' '}
              {sortedProperties.length} properties
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Property</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this property? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Property Form Dialog */}
        <PropertyFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          initialData={editingProperty}
          isEditing={!!editingProperty}
          onSubmit={handleFormSubmit}
        />
      </motion.div>
    </AnimatePresence>
  );
}
