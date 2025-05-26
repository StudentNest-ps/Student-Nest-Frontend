import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar'; // Adjust import path as needed
import { cn } from '@/lib/utils';

// Popover Component Props
interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Custom Popover Component
const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  open,
  onOpenChange,
}) => {
  return (
    <div className="relative">
      {children}
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => onOpenChange(false)}
          />
          <div className="absolute top-full left-0 z-20 mt-1 p-0 bg-popover rounded-md border border-border shadow-lg">
            {content}
          </div>
        </>
      )}
    </div>
  );
};

// Date Picker Input Props
interface DatePickerInputProps {
  label: string;
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
}

// Date Picker Input Component
const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  error,
  touched,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const formatDate = (date: string): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDateSelect = (date: Date | undefined): void => {
    if (date) {
      onChange(date.toISOString());
      setOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>

      <Popover
        open={open}
        onOpenChange={setOpen}
        content={
          <CalendarComponent
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={handleDateSelect}
            initialFocus
            className="rounded-md border-0 bg-background text-foreground"
          />
        }
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            `w-full flex items-center justify-between px-3 py-2 
    rounded-md text-left transition-colors duration-200
    border bg-background text-foreground
    hover:border-muted-foreground focus:outline-none`,
            open ? 'border-ring ring-1 ring-ring' : 'border-input',
            error && touched ? 'border-destructive ring-1 ring-destructive' : ''
          )}
        >
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {value ? formatDate(value) : placeholder}
          </span>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </button>
      </Popover>

      {touched && error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

// Form Props Interface
interface FormikValues {
  availableFrom?: string;
  availableTo?: string;
}

interface FormikErrors {
  availableFrom?: string;
  availableTo?: string;
}

interface FormikTouched {
  availableFrom?: boolean;
  availableTo?: boolean;
}

interface FormikInstance {
  values: FormikValues;
  errors: FormikErrors;
  touched: FormikTouched;
  setFieldValue: (field: string, value: string) => void;
}

interface DatePickerFormProps {
  formik: FormikInstance;
}

// Your updated form section
const DatePickerForm: React.FC<DatePickerFormProps> = ({ formik }) => {
  return (
    <div className="space-y-6">
      <DatePickerInput
        label="Available From"
        value={formik.values.availableFrom}
        onChange={(date: string) => formik.setFieldValue('availableFrom', date)}
        placeholder="Start date"
        error={formik.errors.availableFrom}
        touched={formik.touched.availableFrom}
      />

      <DatePickerInput
        label="Available To"
        value={formik.values.availableTo}
        onChange={(date: string) => formik.setFieldValue('availableTo', date)}
        placeholder="End date"
        error={formik.errors.availableTo}
        touched={formik.touched.availableTo}
      />
    </div>
  );
};

export default DatePickerForm;
export { DatePickerInput };
