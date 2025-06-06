import { Button, TextField, Box, Typography, Card, CardContent, Stack, Fade } from '@mui/material';
import { useState } from 'react';

const StepName = ({ formData, setFormData, onNext }) => {
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName) {
      setError(true);
      return;
    }
    onNext();
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Card sx={{ maxWidth: 500, width: '100%', p: 2, boxShadow: 6, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom color="primary">
              Let's get to know you!
            </Typography>

            <Typography variant="subtitle1" align="center" color="text.secondary" mb={3}>
              What is your name?
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                error={error && !formData.firstName}
                helperText={error && !formData.firstName ? 'First name is required' : ''}
              />

              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                error={error && !formData.lastName}
                helperText={error && !formData.lastName ? 'Last name is required' : ''}
              />

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, py: 1.2 }}
                fullWidth
              >
                Next
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default StepName;
