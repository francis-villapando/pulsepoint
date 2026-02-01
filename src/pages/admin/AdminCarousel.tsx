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
import { toast } from '@/hooks/use-toast';

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
      {row.eventTitle && (
        <p className="text-sm text-muted-foreground">{row.eventTitle}</p>
      )}
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

  const handleAddImage = (newImage: Omit<CarouselImage, 'id' | 'uploadDate'>) => {
    const image: CarouselImage = {
      ...newImage,
      id: `img_${Date.now()}`,
      uploadDate: new Date(),
      isActive: true, // Always active by default
    };
    setImages(prev => [image, ...prev]);
    setIsAddFormOpen(false);
  };

  const handleEditImage = (image: CarouselImage) => {
    setEditingImage(image);
    setIsEditFormOpen(true);
  };

  const handleUpdateImage = (updatedImage: CarouselImage) => {
    setImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
    setIsEditFormOpen(false);
    setEditingImage(null);
  };

  const handleDeleteImage = (image: CarouselImage) => {
    setDeletingImage(image);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (deletingImage) {
      setImages(prev => prev.filter(img => img.id !== deletingImage.id));
      toast({
        title: "Image Deleted",
        description: `${deletingImage.altText} has been removed from the carousel.`,
      });
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
          className="gradient-primary text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Carousel Images</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Images</p>
                    <p className="text-2xl font-bold">{images.length}</p>
                  </div>
                  <ImageIcon className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="gradient-info text-info-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Active Images</p>
                    <p className="text-2xl font-bold">{images.filter(img => img.isActive).length}</p>
                  </div>
                  <ImageIcon className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="gradient-success text-success-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Recent Uploads</p>
                    <p className="text-2xl font-bold">
                      {images.filter(img => 
                        img.uploadDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                      ).length}
                    </p>
                  </div>
                  <ImageIcon className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

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
    </div>
  );
}
