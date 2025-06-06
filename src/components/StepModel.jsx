import {
  Button,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Stack,
  Fade,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getVehicleModels } from '../utils/api';  // import API helper

const StepModel = ({ formData, setFormData, onNext, onBack }) => {
  const [models, setModels] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      if (!formData.vehicleType) {
        setModels([]);
        return;
      }

      setLoading(true);
      try {
        // CALL API HERE to fetch vehicle models for selected vehicleType
        const data = await getVehicleModels(formData.vehicleType);
        setModels(data);
      } catch (err) {
        setModels([]);
        setError('Failed to load models. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [formData.vehicleType]);

  const handleNext = () => {
    if (!formData.vehicleModel) {
      setError('Please select a model.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Card sx={{ maxWidth: 500, width: '100%', p: 2, boxShadow: 6, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom color="primary">
              Choose your model
            </Typography>

            <Typography variant="subtitle1" align="center" color="text.secondary" mb={3}>
              Select a model for your {formData.vehicleType}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Available Models
              </FormLabel>

              {loading ? (
                <Typography align="center" color="text.secondary" mb={2}>
                  Loading models...
                </Typography>
              ) : (
                <RadioGroup
                  value={formData.vehicleModel}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleModel: e.target.value })
                  }
                >
                  <Stack spacing={1}>
                    {models.map((model) => (
                      <FormControlLabel
                        key={model.id}
                        value={model.model || model.name} // Adjust based on your API response
                        control={<Radio />}
                        label={model.model || model.name}
                      />
                    ))}
                  </Stack>
                </RadioGroup>
              )}

              {error && (
                <Typography color="error" mt={1}>
                  {error}
                </Typography>
              )}
            </FormControl>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={onBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext} disabled={loading}>
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default StepModel;
