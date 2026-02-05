import { CarouselImage } from '@/types/pulsepoint';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Plus, Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CarouselFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (image: Omit<CarouselImage, 'id' | 'uploadDate'>) => void;
  editingImage?: CarouselImage | null;
}

export function CarouselForm({ isOpen, onClose, onSubmit, editingImage }: CarouselFormProps) {
  const [formData, setFormData] = useState<Omit<CarouselImage, 'id' | 'uploadDate'>>({
    imageUrl: '',
    altText: '',
    eventTitle: '',
    eventDate: new Date(),
    isActive: true,
    createdAt: new Date(),
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Sync form data with editingImage when dialog opens
  useEffect(() => {
    if (isOpen && editingImage) {
      // Ensure eventDate is a Date object even if it comes as a string from the API
      const date = editingImage.eventDate ? new Date(editingImage.eventDate) : new Date();

      setFormData({
        imageUrl: editingImage.imageUrl || '',
        altText: editingImage.altText || '',
        eventTitle: editingImage.eventTitle || '',
        eventDate: isNaN(date.getTime()) ? new Date() : date,
        isActive: editingImage.isActive ?? true,
        createdAt: editingImage.createdAt ? new Date(editingImage.createdAt) : new Date(),
      });
      setPreviewImage(editingImage.imageUrl || null);
    } else if (!isOpen) {
      // Reset form when dialog closes
      setFormData({
        imageUrl: '',
        altText: '',
        eventTitle: '',
        eventDate: new Date(),
        isActive: true,
        createdAt: new Date(),
      });
      setPreviewImage(null);
    }
  }, [isOpen, editingImage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl || !formData.altText) {
      toast({
        title: "Validation Error",
        description: "Please provide both image URL and alt text.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);

    // Reset form
    setFormData({
      imageUrl: '',
      altText: '',
      eventTitle: '',
      eventDate: new Date(),
      isActive: true,
      createdAt: new Date(),
    });
    setPreviewImage(null);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, imageUrl: base64String }));
        setPreviewImage(base64String);
        setIsUploading(false);

        toast({
          title: "Image Uploaded",
          description: "Your image has been processed successfully.",
        });
      };

      reader.onerror = () => {
        setIsUploading(false);
        toast({
          title: "Upload Error",
          description: "Failed to read the image file.",
          variant: "destructive",
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setPreviewImage(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingImage ? 'Edit Image' : 'Add New Image'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary transition-colors">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop an image here</p>
                  <p className="text-xs text-muted-foreground">or</p>
                </div>
              )}
              <Input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={() => document.getElementById('file-input')?.click()}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Choose Image'}
              </Button>
            </div>
          </div>

          {/* Alt Text */}
          <div className="space-y-2">
            <Label htmlFor="altText">Alt Text</Label>
            <Input
              id="altText"
              placeholder="Describe the image for accessibility..."
              value={formData.altText}
              onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
              required
            />
            <p className="text-xs text-muted-foreground">This text helps screen readers and improves SEO</p>
          </div>

          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="eventTitle">Event Title</Label>
            <Input
              id="eventTitle"
              placeholder="e.g., Community Clean-Up Day 2026"
              value={formData.eventTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, eventTitle: e.target.value }))}
              required
            />
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date</Label>
            <Input
              id="eventDate"
              type="date"
              value={formData.eventDate ? formData.eventDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                eventDate: e.target.value ? new Date(e.target.value) : new Date()
              }))}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="pulse" type="submit">
              {editingImage ? 'Update Image' : 'Add Image'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}