import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  VStack,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface FormData {
  name: string;
  gender: string;
  address: string;
  zone: string;
  woreda: string;
  phone: string;
  familyId: string;
  maritalStatus: string;
  experience: string;
  country: string;
  years: string;
  skills: string[];
  documents: string[];
  code: string;
  date: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyAddress: string;
  emergencyHouse: string;
}

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [largeImg, setLargeImg] = useState<string | null>(null);
  const [smallImg, setSmallImg] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    const cvData = {
      ...data,
      largeImg,
      smallImg,
    };
    localStorage.setItem('cvData', JSON.stringify(cvData));
    toast({ title: 'Registered successfully!', status: 'success', duration: 3000 });
  };

  const exportToExcel = () => {
    const data = localStorage.getItem('cvData');
    if (!data) return;
    const parsed = JSON.parse(data);
    const ws = XLSX.utils.json_to_sheet([parsed]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CV');
    XLSX.writeFile(wb, 'cv_data.xlsx');
  };

  const exportToPDF = () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cv_preview.pdf');
    });
  };

  return (
    <Center minH="100vh" bg="gray.50" p={4} w="100%">
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        w="100%"
        maxW="900px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading mb={6} textAlign="center" fontSize="2xl">
          Registration Form
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* Use VStack for vertical stacking of form fields */}
          <VStack spacing={4} align="stretch">
            {/* Name */}
            <FormLabel mb={0}>Full Name</FormLabel>
            <Input
              {...register('name')}
              placeholder="Enter your full name"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Gender */}
            <FormLabel mb={0}>Gender</FormLabel>
            <Select
              {...register('gender')}
              placeholder="Select gender"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </Select>

            {/* Address */}
            <FormLabel mb={0}>Address</FormLabel>
            <Input
              {...register('address')}
              placeholder="Enter your address"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Zone */}
            <FormLabel mb={0}>Zone</FormLabel>
            <Input
              {...register('zone')}
              placeholder="Enter zone"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Woreda */}
            <FormLabel mb={0}>Woreda</FormLabel>
            <Input
              {...register('woreda')}
              placeholder="Enter woreda"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Phone */}
            <FormLabel mb={0}>Phone</FormLabel>
            <Input
              {...register('phone')}
              placeholder="Enter phone number"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Family ID */}
            <FormLabel mb={0}>Family ID</FormLabel>
            <Input
              {...register('familyId')}
              placeholder="Enter family ID"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Marital Status */}
            <FormLabel mb={0}>Marital Status</FormLabel>
            <Select
              {...register('maritalStatus')}
              placeholder="Select status"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </Select>

            {/* Experience */}
            <FormLabel mb={0}>Experience</FormLabel>
            <Select
              {...register('experience')}
              placeholder="Select experience"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            >
              <option value="New">New</option>
              <option value="Experienced">Experienced</option>
            </Select>

            {/* Country */}
            <FormLabel mb={0}>Country</FormLabel>
            <Input
              {...register('country')}
              placeholder="Enter country"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Years */}
            <FormLabel mb={0}>Years</FormLabel>
            <Input
              {...register('years')}
              placeholder="Enter years of experience"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Code */}
            <FormLabel mb={0}>Code</FormLabel>
            <Input
              {...register('code')}
              placeholder="Enter code"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Date */}
            <FormLabel mb={0}>Date</FormLabel>
            <Input
              type="date"
              {...register('date')}
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />

            {/* Skills */}
            <FormLabel mb={0}>Skills</FormLabel>
            <HStack spacing={3} wrap="wrap">
              {['Decoration', 'Driving', 'Ironing', 'Baby Sitting', 'Cleaning', 'Cooking', 'Washing'].map(skill => (
                <Checkbox key={skill} value={skill} {...register('skills')}>
                  {skill}
                </Checkbox>
              ))}
            </HStack>

            {/* Customer Documents */}
            <FormLabel mb={0}>Customer Documents</FormLabel>
            <HStack spacing={3} wrap="wrap">
              {['Passport', 'Photo', 'ID', 'Family ID', 'Medical', 'COC', 'Ashara'].map(doc => (
                <Checkbox key={doc} value={doc} {...register('documents')}>
                  {doc}
                </Checkbox>
              ))}
            </HStack>

            {/* Large Image Upload */}
            <FormLabel mb={0}>Large Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setLargeImg)}
              borderRadius="md"
            />
            {largeImg && (
              <Image src={largeImg} alt="Large Preview" maxH="200px" objectFit="contain" borderRadius="md" />
            )}

            {/* Small Image Upload */}
            <FormLabel mb={0}>Small Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSmallImg)}
              borderRadius="md"
            />
            {smallImg && (
              <Image src={smallImg} alt="Small Preview" maxH="100px" objectFit="contain" borderRadius="md" />
            )}

            {/* Emergency Contact */}
            <Box border="5px" borderBottomColor="blue.600">
            <Heading size="sm" mt={4}>
              Emergency Contact
            </Heading>
            <FormLabel mb={0}>Name</FormLabel>
            <Input
              {...register('emergencyName')}
              placeholder="Name"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={1}
            />
            <FormLabel mb={0}>Phone</FormLabel>
            <Input
              {...register('emergencyPhone')}
              placeholder="Phone"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />
            <FormLabel mb={0}>Address</FormLabel>
            <Input
              {...register('emergencyAddress')}
              placeholder="Address"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />
            <FormLabel mb={0}>House No</FormLabel>
            <Input
              {...register('emergencyHouse')}
              placeholder="House No"
              focusBorderColor="teal.500"
              borderRadius="md"
              padding={3}
            />
            </Box>
          </VStack>

          {/* Buttons */}
         <Box mt={8}>
            <Button type="submit" colorScheme="teal" fontSize="lg" rounded="full">Register</Button>
            <Button onClick={() => navigate('/cv')} colorScheme="blue"  fontSize="lg" rounded="full">Prepare CV</Button>
            <Button onClick={exportToExcel} colorScheme="green" fontSize="md">
              Export as Excel
            </Button>
            <Button onClick={exportToPDF} colorScheme="purple" fontSize="md">
              Export as PDF
            </Button>
          </Box>
        
        </form>
      </Box>
    </Center>
  );
};

export default RegisterForm;