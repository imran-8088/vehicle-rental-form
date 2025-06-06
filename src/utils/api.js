
export const getVehicleTypes = async (wheels) => {
  try {
    const url = wheels ? `/api/vehicle-types?wheels=${wheels}` : `/api/vehicle-types`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch vehicle types: ${res.statusText}`);
    }

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error('Failed to fetch vehicle types', error);
    return [];
  }
};

export const getVehicleModels = async (vehicleType) => {
  try {
    const res = await fetch(`/api/vehicle-models?type=${vehicleType}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch vehicle models: ${res.statusText}`);
    }

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error('Failed to fetch vehicle models', error);
    return [];
  }
};

export const submitBooking = async (data) => {
  try {
    const res = await fetch('/api/bookings', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Booking submission failed');
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error('Booking submission failed', error);
    throw error;
  }
};
