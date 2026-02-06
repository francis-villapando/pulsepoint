import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CarouselImage } from '@/types/pulsepoint';
import { ContentTable } from '@/components/admin/ContentTable';
import { Button } from '@/components/ui/button';
import { Plus, Image as ImageIcon, Edit, ArchiveX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CarouselForm } from '@/components/admin/CarouselForm';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';
import { useToast } from "@/hooks/use-toast";

const columns = [
  {
    key: 'imageUrl', label: 'Image', render: (value: string, row: CarouselImage) => (
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg overflow-hidden border">
          <img src={value} alt={row.altText} className="w-full h-full object-cover" />
        </div>
      </div>
    )
  },
  {
    key: 'altText', label: 'Title', render: (value: string, row: CarouselImage) => (
      <div>
        <p className="font-medium">{value}</p>
        {row.eventTitle && (
          <p className="text-sm text-muted-foreground">{row.eventTitle}</p>
        )}
      </div>
    )
  },
  {
    key: 'createdAt', label: 'Date', render: (value: Date) => {
      try {
        return format(new Date(value), 'MMM d, yyyy');
      } catch (e) {
        return 'Invalid Date';
      }
    }
  },
  {
    key: 'isActive', label: 'Status', render: (value: boolean) => (
      <Badge className="bg-pulse-success text-white">Active</Badge>
    )
  },
];

export default function AdminCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);

  // Confirmation states
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] = useState(false);

  // Data states for success dialogs
  const [imageData, setImageData] = useState({
    altText: '',
    eventTitle: '',
    eventDate: new Date()
  });
  const [updatingImage, setUpdatingImage] = useState<CarouselImage | null>(null);

  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      const data = await api.carousel.getAll();
      setImages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch carousel images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAddImage = async (newImage: Omit<CarouselImage, 'id' | 'uploadDate' | 'createdAt'>) => {
    try {
      await api.carousel.create(newImage);
      // Update local state for success dialog
      setImageData({
        altText: newImage.altText,
        eventTitle: newImage.eventTitle || '',
        eventDate: newImage.eventDate || new Date()
      });
      fetchImages();
      setIsAddFormOpen(false);
      setIsConfirmationOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add image",
        variant: "destructive",
      });
    }
  };

  const handleEditImage = (image: CarouselImage) => {
    setEditingImage(image);
    setIsEditFormOpen(true);
  };

  const handleUpdateImage = async (updatedImage: CarouselImage) => {
    try {
      await api.carousel.update(updatedImage.id, updatedImage);
      setUpdatingImage(updatedImage);
      fetchImages();
      setIsEditFormOpen(false);
      setEditingImage(null);
      setIsUpdateConfirmationOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (image: CarouselImage) => {
    try {
      await api.carousel.delete(image.id);
      toast({
        title: "Image Archived",
        description: `${image.altText} has been moved to the archives.`,
      });
      fetchImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive image",
        variant: "destructive",
      });
    }
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
                        new Date(img.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
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
