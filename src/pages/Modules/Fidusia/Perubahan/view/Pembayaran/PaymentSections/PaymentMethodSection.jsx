import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Bank Logos
import BCALogo from '@/assets/bank/BCA.png';
import MandiriLogo from '@/assets/bank/Mandiri.png';
import BRILogo from '@/assets/bank/BRI.png';
import BNILogo from '@/assets/bank/BNI.png';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(2),
  backgroundColor: 'white',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

const paymentMethods = [
  {
    id: 'bca',
    name: 'Bank BCA',
    logo: BCALogo,
    type: 'Virtual Account',
  },
  {
    id: 'mandiri',
    name: 'Bank Mandiri',
    logo: MandiriLogo,
    type: 'Virtual Account',
  },
  {
    id: 'bri',
    name: 'Bank BRI',
    logo: BRILogo,
    type: 'Virtual Account',
  },
  {
    id: 'bni',
    name: 'Bank BNI',
    logo: BNILogo,
    type: 'Virtual Account',
  },
];

const PaymentMethodSection = ({
  formik,
  selectedMethod,
  setSelectedMethod,
}) => {
  // Handler for selecting a payment method
  const handleMethodSelect = (methodId) => {
    console.log('Selecting Payment Method:', methodId);
    // Update state in parent component
    setSelectedMethod(methodId);
    // // Update Formik values
    formik.setFieldValue('payment.method', methodId);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 'bold', mb: 2, color: '#1A237E' }}
      >
        Metode Pembayaran
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Silakan pilih metode pembayaran yang Anda inginkan
      </Typography>

      {paymentMethods.map((method) => (
        <div className="form-check" key={method.id}>
          <StyledPaper
            onClick={() => handleMethodSelect(method.id)}
            sx={{
              mb: 2,
              border:
                selectedMethod === method.id
                  ? '1px solid #1A237E'
                  : '1px solid #E0E0E0',
            }}
          >
            <div className="d-flex">
              <img
                src={method.logo}
                alt={method.name}
                style={{ height: 40, marginRight: 16 }}
              />
              <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {method.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {method.type}
                </Typography>
              </div>
            </div>
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id={`paymentMethod-${method.id}`}
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handleMethodSelect(method.id)}
            />
            <label
              className="form-check-label"
              htmlFor={`paymentMethod-${method.id}`}
            ></label>
          </StyledPaper>
        </div>
      ))}
    </Box>
  );
};

export default PaymentMethodSection;

// import React from 'react';
// import {
//   Box,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Paper,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';

// // Bank Logos
// import BCALogo from '@/assets/bank/BCA.png';
// import MandiriLogo from '@/assets/bank/Mandiri.png';
// import BRILogo from '@/assets/bank/BRI.png';
// import BNILogo from '@/assets/bank/BNI.png';

// // Styled Components
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   borderRadius: 12,
//   padding: theme.spacing(2),
//   backgroundColor: 'white',
//   boxShadow: 'none',
//   border: `1px solid ${theme.palette.divider}`,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   cursor: 'pointer', // Tambahkan cursor pointer
// }));

// const paymentMethods = [
//   {
//     id: 'bca',
//     name: 'Bank BCA',
//     logo: BCALogo,
//     type: 'Virtual Account',
//   },
//   {
//     id: 'mandiri',
//     name: 'Bank Mandiri',
//     logo: MandiriLogo,
//     type: 'Virtual Account',
//   },
//   {
//     id: 'bri',
//     name: 'Bank BRI',
//     logo: BRILogo,
//     type: 'Virtual Account',
//   },
//   {
//     id: 'bni',
//     name: 'Bank BNI',
//     logo: BNILogo,
//     type: 'Virtual Account',
//   },
// ];

// const PaymentMethodSection = ({
//   formik,
//   selectedMethod,
//   setSelectedMethod,
// }) => {
//   console.log('sueekk method');
//   // const handleMethodSelect = (methodId) => {
//   //   setSelectedMethod(methodId);
//   // };
//   const handleMethodSelect = (methodId) => {
//     // Log untuk debugging
//     console.log('Selecting PaymentMethodSection:', methodId);

//     // Update state di parent component
//     setSelectedMethod(methodId);

//     // Opsional: Update formik values jika diperlukan
//     formik.setFieldValue('payment.method', methodId);
//   };

//   return (
//     <Box>
//       <Typography
//         variant="h5"
//         align="center"
//         sx={{ fontWeight: 'bold', mb: 2, color: '#1A237E' }}
//       >
//         Metode Pembayaran
//       </Typography>
//       <Typography
//         variant="body2"
//         align="center"
//         color="text.secondary"
//         sx={{ mb: 3 }}
//       >
//         Silakan pilih metode pembayaran yang Anda inginkan
//       </Typography>

//       <RadioGroup
//         value={selectedMethod}
//         onChange={(e) => {
//           console.log('Radio change:', e.target.value);
//           setSelectedMethod(e.target.value);
//         }}
//         // onChange={(e) => setSelectedMethod(e.target.value)}
//       >
//         {paymentMethods.map((method) => (
//           <StyledPaper
//             key={method.id}
//             elevation={0}
//             onClick={() => handleMethodSelect(method.id)}
//             sx={{
//               mb: 2,
//               border:
//                 selectedMethod === method.id
//                   ? '1px solid #1A237E'
//                   : '1px solid #E0E0E0',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <img
//                 src={method.logo}
//                 alt={method.name}
//                 style={{ height: 40, width: 'auto', marginRight: 16 }}
//               />
//               <Box>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                   {method.name}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {method.type}
//                 </Typography>
//               </Box>
//             </Box>
//             <FormControlLabel
//               value={method.id}
//               control={<Radio />}
//               label=""
//               labelPlacement="start"
//             />
//           </StyledPaper>
//         ))}
//       </RadioGroup>
//     </Box>
//   );
// };

// export default PaymentMethodSection;
