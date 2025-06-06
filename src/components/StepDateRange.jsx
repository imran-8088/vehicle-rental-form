import { useState } from 'react';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { submitBooking } from '../utils/api';

const StepDateRange = ({ formData, setFormData, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const [start, end] = formData.dateRange;

    if (!start || !end) {
      setError('Please select both start and end dates.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await submitBooking(formData);
      setLoading(false);

      if (res.success) {
        setSuccess(true);
        onSubmit();
      } else {
        setError(res.message || 'Booking failed. Try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Server error. Please try again.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          📅 Select Booking Date Range
        </Typography>

        <Box mb={2}>
          <DateRangePicker
            value={formData.dateRange}
            onChange={(newValue) =>
              setFormData({ ...formData, dateRange: newValue })
            }
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Booking submitted successfully!
          </Alert>
        )}

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ px: 4, py: 1.2, fontWeight: 500 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Submit Booking'
            )}
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default StepDateRange;
