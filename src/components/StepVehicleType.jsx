import { useEffect, useState } from 'react';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { getVehicleTypes } from '../utils/api';

const StepVehicleType = ({ formData, setFormData, onNext, onBack }) => {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      if (!formData.wheels) {
        setTypes([]);
        return;
      }
      setLoading(true);
      setFetchError('');
      try {
        const data = await getVehicleTypes(formData.wheels);
        setTypes(data);
      } catch (err) {
        setFetchError('Failed to load vehicle types. Please try again.');
        setTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, [formData.wheels]);

  const handleNext = () => {
    if (!formData.vehicleType) {
      setError(true);
      return;
    }
    setError(false);
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Select Vehicle Type
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : fetchError ? (
        <Typography color="error" mb={2}>
          {fetchError}
        </Typography>
      ) : (
        <RadioGroup
          value={formData.vehicleType}
          onChange={(e) =>
            setFormData({ ...formData, vehicleType: e.target.value })
          }
        >
          {types.map((type) => (
            <FormControlLabel
              key={type.id}
              value={type.name}
              control={<Radio />}
              label={type.name}
            />
          ))}
        </RadioGroup>
      )}

      {error && <Typography color="error">Please select a vehicle type.</Typography>}

      <Box mt={2}>
        <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={loading || !!fetchError}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StepVehicleType;
