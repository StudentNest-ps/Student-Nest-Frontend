'use client';

import { useEffect, useState } from 'react';
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
import { Search, Home, Building, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import DeletePropertyButton from './delete-property-button';
import EditPropertyDialog from './edit-property-dialog';
import { Property } from '@/module/types/Admin';
import Admin from '@/module/services/Admin';
import { toast } from 'sonner';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const PropertyTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'apartment':
      return <Building className="h-4 w-4" />;
    case 'house':
      return <Home className="h-4 w-4" />;
    case 'studio':
      return <Building2 className="h-4 w-4" />;
    default:
      return <Home className="h-4 w-4" />;
  }
};

export default function PropertiesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await Admin.getProperties();
      console.log(res);
      setProperties(res);
    };

    fetchProperties();
  }, []);

  const handlePropertyDelete = async (propertyId: string) => {
    const res = await Admin.deleteProperty(propertyId);

    if (res) {
      toast.success(`Property deleted successfully!`);
      setProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } else {
      toast.error(`Failed deleting property.`);
    }

    console.log(`Deleting property with ID: ${propertyId}`);
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProperty = (propertyId: string) => {
    const property = properties.find((p) => p._id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setEditDialogOpen(true);
    }
  };

  const handleSaveProperty = (updatedProperty: Property) => {
    console.log('Updated property:', updatedProperty);
    setEditDialogOpen(false);
    // In a real application, you would update the property in your data store here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Properties</CardTitle>
          <CardDescription>
            Showing {filteredProperties.length} of {properties.length}{' '}
            properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2 rounded-md border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="border-0 p-0 shadow-none focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredProperties.map((property, index) => (
                    <motion.tr
                      key={property._id}
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
                      <TableCell>
                        <div className="max-w-[250px]">
                          <div className="font-medium">{property.title}</div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="text-xs text-muted-foreground cursor-help">
                                  {truncateText(property.description, 35)}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent
                                side="bottom"
                                className="max-w-md"
                              >
                                <p>{property.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="outline"
                                className={`flex items-center gap-1 ${
                                  property.type === 'apartment'
                                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-400'
                                    : property.type === 'house'
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                                      : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400'
                                }`}
                              >
                                <PropertyTypeIcon type={property.type} />
                                <span className="capitalize">
                                  {property.type}
                                </span>
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Property type: {property.type}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(property.price)}/month
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="truncate text-sm cursor-help">
                                {property.address}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{property.address}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {property.ownerName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {property.ownerPhoneNumber}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer text-primary hover:text-card-foreground dark:hover:bg-indigo-950/50"
                            onClick={() => handleEditProperty(property._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                            <span className="sr-only">Edit property</span>
                          </Button>
                          <DeletePropertyButton
                            onDelete={() => handlePropertyDelete(property._id)}
                          />
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditPropertyDialog
        property={selectedProperty}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={(updatedProperty) => {
          handleSaveProperty(updatedProperty as unknown as Property);
        }}
      />
    </motion.div>
  );
}
