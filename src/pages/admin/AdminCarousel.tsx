import { useState } from 'react';
import { mockCarouselImages } from '@/data/mockData';
import { CarouselImage } from '@/types/pulsepoint';
import { ContentTable } from '@/components/admin/ContentTable';
import { Button } from '@/components/ui/button';
import { Plus, Image as ImageIcon, Edit, ArchiveX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CarouselForm } from '@/components/admin/CarouselForm';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';

const columns = [
  { key: 'imageUrl', label: 'Image', render: (value: string, row: CarouselImage) => (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-lg overflow-hidden border">
        <img src={value} alt={row.altText} className="w-full h-full object-cover" />
      </div>
    </div>
  )},
  { key: 'altText', label: 'Title', render: (value: string, row: CarouselImage) => (
    <div>
      <p className="font-medium">{value}</p>
    </div>
  )},
  { key: 'uploadDate', label: 'Date', render: (value: Date) => format(value, 'MMM d, yyyy') },
  { key: 'isActive', label: 'Status', render: (value: boolean) => (
    <Badge className="bg-pulse-success text-white">Active</Badge>
  )},
];

export default function AdminCarousel() {
  const [images, setImages] = useState<CarouselImage[]>(mockCarouselImages);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [deletingImage, setDeletingImage] = useState<CarouselImage | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] = useState(false);
  const [imageData, setImageData] = useState({
    altText: '',
    eventTitle: '',
    eventDate: new Date()
  });
  const [updatingImage, setUpdatingImage] = useState<CarouselImage | null>(null);

  const handleAddImage = (newImage: Omit<CarouselImage, 'id' | 'uploadDate'>) => {
    const image: CarouselImage = {
      ...newImage,
      id: `img_${Date.now()}`,
      uploadDate: new Date(),
      isActive: true, // Always active by default
    };
    setImages(prev => [image, ...prev]);
    setImageData({
      altText: newImage.altText,
      eventTitle: newImage.eventTitle,
      eventDate: newImage.eventDate
    });
    setIsAddFormOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleEditImage = (image: CarouselImage) => {
    setEditingImage(image);
    setIsEditFormOpen(true);
  };

  const handleUpdateImage = (updatedImage: CarouselImage) => {
    setImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
    setIsEditFormOpen(false);
    setEditingImage(null);
    
    // Store the updated image for the success dialog
    setUpdatingImage(updatedImage);
    setIsUpdateConfirmationOpen(true);
  };

  const handleDeleteImage = (image: CarouselImage) => {
    setDeletingImage(image);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (deletingImage) {
      setImages(prev => prev.filter(img => img.id !== deletingImage.id));
    }
    setIsDeleteConfirmationOpen(false);
    setDeletingImage(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Carousel Management</h1>
          <p className="text-muted-foreground">Manage images displayed in the community display</p>
        </div>
        <Button 
          onClick={() => setIsAddFormOpen(true)}
          variant="pulse"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Carousel Images</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Content Table */}
          <ContentTable 
            columns={columns}
            data={images}
            onEdit={handleEditImage}
            onDelete={handleDeleteImage}
            editTitle="Update Image"
            editDescription="Are you sure you want to update this image? This will update the content displayed to the community."
          />
        </CardContent>
      </Card>

      {/* Add Image Popup */}
      <CarouselForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddImage}
        editingImage={null}
      />

      {/* Edit Image Popup */}
      <CarouselForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setEditingImage(null);
        }}
        onSubmit={handleUpdateImage}
        editingImage={editingImage}
      />

      {/* Creation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Image Added Successfully!"
        description={`Your image "${imageData.altText}" has been added to the carousel.`}
        onConfirm={() => setIsConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />

      {/* Update Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isUpdateConfirmationOpen}
        onOpenChange={setIsUpdateConfirmationOpen}
        title="Image Updated Successfully!"
        description={`Your image "${updatingImage?.altText}" has been updated in the carousel.`}
        onConfirm={() => setIsUpdateConfirmationOpen(false)}
        confirmText="Close"
        type="success"
      />
    </div>
  );
}
