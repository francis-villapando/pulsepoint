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
import { Edit, ArchiveX } from 'lucide-react';
import { useState } from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface FeedbackContentTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export function FeedbackContentTable({ columns, data, onEdit, onDelete }: FeedbackContentTableProps) {
  const [isArchiveConfirmationOpen, setIsArchiveConfirmationOpen] = useState(false);
  const [archivingItem, setArchivingItem] = useState<any>(null);

  const handleEdit = (item: any, newStatus: string) => {
    if (onEdit) {
      onEdit({ ...item, status: newStatus });
    }
  };

  const handleArchive = (item: any) => {
    setArchivingItem(item);
    setIsArchiveConfirmationOpen(true);
  };

  const confirmArchive = () => {
    if (onDelete) {
      onDelete(archivingItem);
    }
    setIsArchiveConfirmationOpen(false);
    setArchivingItem(null);
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
                  {onEdit && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" type="button">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleEdit(row, 'pending')}>
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(row, 'reviewed')}>
                          Reviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(row, 'addressed')}>
                          Addressed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {onDelete && (
                    <Button variant="ghost" size="icon" type="button" className="text-destructive hover:text-destructive" onClick={() => handleArchive(row)}>
                      <ArchiveX className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Archive Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isArchiveConfirmationOpen}
        onOpenChange={setIsArchiveConfirmationOpen}
        title="Archive Item"
        description={`Are you sure you want to archive this item? This will remove it from the community display.`}
        onConfirm={confirmArchive}
        onCancel={() => {
          setIsArchiveConfirmationOpen(false);
          setArchivingItem(null);
        }}
        confirmText="Archive"
        cancelText="Cancel"
        type="error"
      />
    </div>
  );
}