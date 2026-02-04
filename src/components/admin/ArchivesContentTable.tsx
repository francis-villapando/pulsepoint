import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Archive, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';
import { format } from 'date-fns';

interface ArchiveItem {
  id: string;
  type: 'carousel' | 'announcement' | 'event' | 'poll' | 'feedback';
  title: string;
  content: string;
  archiveDate: Date;
}

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: ArchiveItem) => React.ReactNode;
}

interface ArchivesContentTableProps {
  columns: Column[];
  data: ArchiveItem[];
  onRestore?: (item: ArchiveItem) => void;
}

export function ArchivesContentTable({ columns, data, onRestore }: ArchivesContentTableProps) {
  const [isRestoreConfirmationOpen, setIsRestoreConfirmationOpen] = useState(false);
  const [restoringItem, setRestoringItem] = useState<ArchiveItem | null>(null);

  const handleRestore = (item: ArchiveItem) => {
    setRestoringItem(item);
    setIsRestoreConfirmationOpen(true);
  };

  const confirmRestore = () => {
    if (onRestore && restoringItem) {
      onRestore(restoringItem);
    }
    setIsRestoreConfirmationOpen(false);
    setRestoringItem(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'carousel': return '🖼️';
      case 'announcement': return '📢';
      case 'event': return '📅';
      case 'poll': return '📊';
      case 'feedback': return '💬';
      default: return '📄';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'carousel': return 'Carousel Image';
      case 'announcement': return 'Announcement';
      case 'event': return 'Event';
      case 'poll': return 'Poll';
      case 'feedback': return 'Feedback';
      default: return type;
    }
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((column) => (
              <TableHead key={column.key} className="font-semibold">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id || index} className="hover:bg-muted/30">
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {onRestore && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      type="button" 
                      className="text-pulse-success hover:text-pulse-success"
                      onClick={() => handleRestore(row)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Restore Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isRestoreConfirmationOpen}
        onOpenChange={setIsRestoreConfirmationOpen}
        title="Restore Item"
        description={`Are you sure you want to restore this ${restoringItem?.type} item? It will be moved back to the active content area.`}
        onConfirm={confirmRestore}
        onCancel={() => {
          setIsRestoreConfirmationOpen(false);
          setRestoringItem(null);
        }}
        confirmText="Restore"
        cancelText="Cancel"
        type="success"
      />
    </div>
  );
}