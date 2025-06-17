import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CVData {
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
  largeImg?: string;
  smallImg?: string;
}

const CVPage = () => {
  const [data, setData] = useState<CVData | null>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const toast = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('cvData');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const exportPDF = () => {
    const input = pdfRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('cv.pdf');
      });
    }
  };

  const printCV = () => {
    // Use CSS media query to print only the CV container
    window.print();
  };

  if (!data) return <Text p={10}>Loading CV...</Text>;

  return (
    <Box p={4} bg="gray.100" minH="100vh">
      <Box textAlign="center" mb={4}>
        <Button onClick={exportPDF} colorScheme="blue" mx={2} mb={2}>
          Download PDF
        </Button>
        <Button onClick={printCV} colorScheme="teal" mx={2} mb={2}>
          Print
        </Button>
      </Box>

      {/* Main CV container with print styles */}
      <Box
        ref={pdfRef}
        id="cv-container"
        bg="white"
        maxW="1200px"
        mx="auto"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection="row"
        gap={6}
        className="cv-print"
      >
        {/* Left side: CV details */}
        <Box flex="3" bgGradient="linear(to-br, teal.100, purple.50)" p={4} borderRadius="md" boxShadow="sm">
          {/* Header */}
          <HStack justify="space-between" mb={4} align="center">
            <Image src="/logo.png" alt="Logo" boxSize="60px" />
            <VStack spacing={0} align="center">
              <Text fontWeight="bold" fontSize="xl" color="teal.700">
                APPLICATION FOR EMPLOYMENT
              </Text>
              <Text fontSize="md" dir="rtl" color="purple.700">
                طلب توظيف
              </Text>
            </VStack>
            {data.smallImg ? (
              <Image src={data.smallImg} alt="Photo" boxSize="80px" borderRadius="md" objectFit="cover" />
            ) : (
              <Box w="80px" h="80px" bg="gray.200" borderRadius="md" />
            )}
          </HStack>

          <Divider mb={4} />

          {/* Personal Info */}
          <VStack align="start" spacing={2} mb={4}>
            <Text color="blue.900" fontWeight="bold">
              <b>Full Name /     الاسم الكامل:</b> {data.name}
            </Text>
            <Text color="blue.900" fontWeight="bold">
              <b>Gender /         الجنس:</b> {data.gender}
            </Text>
            <Text color="blue.900" fontWeight="bold">
              <b>Address /       العنوان:</b> {data.address}, Zone {data.zone}, Woreda {data.woreda}
            </Text>
            <Text color="blue.900" fontWeight="bold">
              <b>Phone /     رقم الهاتف:</b> {data.phone}
            </Text>  
            <Text color="blue.900" fontWeight="bold">
              <b>Family ID / رقم العائلة:</b> {data.familyId}
            </Text>
            <Text color="blue.900" fontWeight="bold">
              <b>Marital Status / الحالة الزوجية:</b> {data.maritalStatus}
            </Text>
            
            <VStack align="start" spacing={1} mb={4} border="3px">
            <Text color="blue.900" fontWeight="bold">
              <b>Experience / الخبرة:</b> {data.experience}
            </Text>
            {data.experience === 'Experienced' && (
              <Text color="blue.900" fontWeight="bold">
                <b>Country / البلد:</b> {data.country} — <b>Years / سنوات:</b> {data.years}
              </Text>
            )}
            <Text color="blue.900" fontWeight="bold">
              <b>Skills / المهارات:</b> {data.skills?.join(', ') || 'N/A'}
            </Text>
            <Text color="blue.900" fontWeight="bold">
              <b>Documents / الوثائق:</b> {data.documents?.join(', ') || 'N/A'}
            </Text>
            <Text color="blue.900" fontWeight="bold">
              <b>Code / الرمز:</b> {data.code}
            </Text>
            <Text color="blue.900" fontWeight="bold">
              <b>Date / التاريخ:</b> {data.date}
            </Text>
  
            </VStack>
          </VStack>

          <Divider mb={4} />

          {/* Emergency Contact */}
          <Text fontWeight="bold" fontSize="md" mb={2} color="purple.700">
            Emergency Contact / جهة الاتصال في حالات الطوارئ
          </Text>
          <VStack align="start" spacing={1} mb={4}>
            <Text>
              <b>Name / الاسم:</b> {data.emergencyName}
            </Text>
            <Text>
              <b>Phone / الهاتف:</b> {data.emergencyPhone}
            </Text>
            <Text>
              <b>Address / العنوان:</b> {data.emergencyAddress}
            </Text>
            <Text>
              <b>House No / رقم المنزل:</b> {data.emergencyHouse}
            </Text>
          </VStack>
        </Box>

        {/* Right side: Large Image */}
        <Box flex="2" bgGradient="linear(to-br, blue.100, white)" p={4} borderRadius="md" boxShadow="sm" display="flex" alignItems="center" justifyContent="center">
          {data.largeImg ? (
            <Image src={data.largeImg} alt="Large" maxH="400px" objectFit="contain" borderRadius="md" boxShadow="lg" />
          ) : (
            <Box w="100%" h="400px" bg="gray.200" display="flex" alignItems="center" justifyContent="center" borderRadius="md">
              <Text color="gray.500">No Image</Text>
            </Box>
          )}
        </Box>
      </Box>

      {/* Print styles */}
      <style>
        {`
        @media print {
          body * {
            display: none;
          }
          #cv-container {
            display: block;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
            background: #fff;
          }
        }
        `}
      </style>
    </Box>
  );
};

export default CVPage;