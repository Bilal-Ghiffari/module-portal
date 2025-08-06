import FidusiaPendaftarService from '@/services/fidusia/FidusiaPendaftarServices';
import { cleanPayloadAdvanced } from '../../helpers/cleanPayload';
import sleep from '@/utils/sleep';

const useFetchForStep = (id_pendaftaran) => {
  const stepApiMap = {
    1: id_pendaftaran
      ? FidusiaPendaftarService.patchFidusiaPendaftaranPemberi
      : FidusiaPendaftarService.postFidusiaPendaftaranPemberi,
    // 2: FidusiaPendaftarService.postFidusiaPendaftaranPenerima,
    3: FidusiaPendaftarService.patchFidusiaPendaftaran,
    6: FidusiaPendaftarService.patchFidusiaPendaftaran,
    // Add more steps as needed
  };

  const fetchStepData = async (activeStep, formik, stepFormConfigs) => {
    const apiMethod = stepApiMap[activeStep];
    const fieldName = stepFormConfigs[activeStep]?.fieldName;

    // If there's no API method or field name, handle the scenario gracefully
    if (!apiMethod || !fieldName) {
      await sleep(1000);
      return {
        data: {
          id_pendaftaran: id_pendaftaran ? JSON.parse(id_pendaftaran) : null, // Default to null if not found
        },
        message: 'Success', // Simulating successful response even without the actual request
      };
    }

    // Clean the payload and prepare the data for the request
    const data = cleanPayloadAdvanced(formik.values[fieldName]);

    // Function to prepare the payload based on the active step
    const preparePayload = (data) => {
      const payload = {
        id_pendaftaran: Number(id_pendaftaran) || '', // Default to empty string if not found
        ...(activeStep === 1 && { step: 1 }),
        ...(activeStep === 3 && { step: 3 }),
        ...(activeStep === 6 && {
          step: 6,
          status_permohonan: 'selesai',
          status_transaksi: 'berhasil',
        }),
        ...data,
      };
      return payload;
    };

    // Call the appropriate API method and handle response
    try {
      const response = await apiMethod(preparePayload(data));
      return response; // Return the API response for further processing
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error to be handled upstream
    }
  };

  return fetchStepData;
};

export default useFetchForStep;

// const useFetchForStep = (id_pendaftaran) => {
//   const stepApiMap = {
//     1: id_pendaftaran
//       ? FidusiaPendaftarService.patchFidusiaPendaftaranPemberi
//       : FidusiaPendaftarService.postFidusiaPendaftaranPemberi,
//     // 2: FidusiaPendaftarService.postFidusiaPendaftaranPenerima,
//     3: FidusiaPendaftarService.patchFidusiaPendaftaran,
//     6: FidusiaPendaftarService.patchFidusiaPendaftaran,
//     // Extend to add more steps as needed
//   };

//   const fetchStepData = async (activeStep, formik, stepFormConfigs) => {
//     const apiMethod = stepApiMap[activeStep];
//     const fieldName = stepFormConfigs[activeStep]?.fieldName; // Get the field name

//     // If there's no API method, check localStorage
//     if (!apiMethod || !fieldName) {
//       // const id_pendaftaran = localStorage.getItem('id_pendaftaran');
//       await sleep(1000);
//       // Return an object containing id_pendaftaran in the format you need
//       return {
//         data: {
//           id_pendaftaran: id_pendaftaran ? JSON.parse(id_pendaftaran) : null,
//         },
//         message: 'Success',
//       };
//     }

//     const data = cleanPayloadAdvanced(formik.values[fieldName]);

//     const preparePayload = (data) => {
//       const payload = {
//         id_pendaftaran: Number(id_pendaftaran) || '',
//         ...(activeStep === 1 && { step: 1 }),
//         ...(activeStep === 3 && { step: 3 }),
//         ...(activeStep === 6 && {
//           step: 6,
//           status_permohonan: 'selesai',
//           status_transaksi: 'berhasil',
//         }),
//         ...data,
//       };
//       return payload;
//     };

//     // Call the appropriate API method
//     try {
//       const response = await apiMethod(preparePayload(data));
//       return response; // Return the API response for further processing
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error; // Rethrow the error to handle it upstream
//     }
//   };

//   return fetchStepData;
// };

// export default useFetchForStep;
