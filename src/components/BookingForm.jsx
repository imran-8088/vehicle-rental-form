import { useState, useEffect } from 'react';
import StepName from './StepName';
import StepWheels from './StepWheels';
import StepVehicleType from './StepVehicleType';
import StepModel from './StepModel';
import StepDateRange from './StepDateRange';

import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  Fade,
} from '@mui/material';

import { getVehicleTypes, getVehicleModels, submitBooking } from '../utils/api';

const initialData = {
  firstName: '',
  lastName: '',
  wheels: '',
  vehicleType: '',
  vehicleModel: '',
  dateRange: [null, null],
};

const stepLabels = [
  'Your Name',
  'Wheels',
  'Vehicle Type',
  'Model',
  'Booking Dates',
];

const BookingForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [error, setError] = useState('');

  const onNext = () => setStep((prev) => prev + 1);
  const onBack = () => setStep((prev) => prev - 1);


  useEffect(() => {
    if (!formData.wheels) {
      setVehicleTypes([]);
      setFormData((data) => ({ ...data, vehicleType: '', vehicleModel: '' }));
      return;
    }
    setLoadingTypes(true);
    getVehicleTypes(formData.wheels)
      .then((types) => {
        setVehicleTypes(types);

        setFormData((data) => ({ ...data, vehicleType: '', vehicleModel: '' }));
      })
      .catch(() => setError('Failed to load vehicle types'))
      .finally(() => setLoadingTypes(false));
  }, [formData.wheels]);


  useEffect(() => {
    if (!formData.vehicleType) {
      setVehicleModels([]);
      setFormData((data) => ({ ...data, vehicleModel: '' }));
      return;
    }
    setLoadingModels(true);
    getVehicleModels(formData.vehicleType)
      .then((models) => {
        setVehicleModels(models);
        setFormData((data) => ({ ...data, vehicleModel: '' }));
      })
      .catch(() => setError('Failed to load vehicle models'))
      .finally(() => setLoadingModels(false));
  }, [formData.vehicleType]);


  const handleSubmit = async () => {
    setError('');
    try {
      await submitBooking(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Booking submission failed');
    }
  };

  const steps = [
    <StepName formData={formData} setFormData={setFormData} onNext={onNext} />,
    <StepWheels formData={formData} setFormData={setFormData} onNext={onNext} onBack={onBack} />,
    <StepVehicleType
      formData={formData}
      setFormData={setFormData}
      onNext={onNext}
      onBack={onBack}
      vehicleTypes={vehicleTypes}
      loading={loadingTypes}
    />,
    <StepModel
      formData={formData}
      setFormData={setFormData}
      onNext={onNext}
      onBack={onBack}
      vehicleModels={vehicleModels}
      loading={loadingModels}
    />,
    <StepDateRange
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onBack={onBack}
      error={error}
    />,
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Fade in timeout={500}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Vehicle Booking
          </Typography>

          {submitted ? (
            <Typography variant="h5" align="center" mt={5}>
              ✅ Thank you! Your booking has been submitted.
            </Typography>
          ) : (
            <>
              <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
                {stepLabels.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box>{steps[step]}</Box>

              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Paper>
      </Fade>
    </Container>
  );
};

export default BookingForm;
